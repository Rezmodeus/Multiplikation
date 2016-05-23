import React from 'react';
import immutable from 'immutable';
import {Glyphicon} from 'react-bootstrap';
import Star from './Star.react';

const REQUIRED_STARS = 7;
export default React.createClass({

	getChallengeBoxes(){
		// create container content
		let prevStars = 10;
		const cc = this.props.challengeContainers.map(container => {
			const name = container.get('name');
			let starSum = 0;
			const challenges = container.get('challenges').map(challenge => {
				let ch = this.props.challenges.get(challenge);
				const stars = this.props.challengeStars.get(challenge) || 0;
				starSum += stars;
				ch = ch.set('stars', stars);
				//ch = ch.set('id', challenge);
				return ch;
			});
			const visible = prevStars >= REQUIRED_STARS;
			prevStars = starSum;
			return immutable.Map({
				visible,
				starSum,
				name,
				challenges
			})
		});
		let nr = 0;
		const content = cc.takeWhile(container => container.get('visible')).map(container => {
			let starSum = 0;
			const challenges = container.get('challenges').map(challenge => {
				const stars = challenge.get('stars');
				const disabled = starSum < challenge.get('requiredStars');
				const newFlag = !disabled && stars==0;
				const cls = newFlag ? 'standard-btn pulsating' : disabled ? 'standard-btn disabled' : 'standard-btn';
				starSum += stars;
				return (<button className={cls} disabled={disabled} key={nr++}
								onClick={()=>this.props.startChallenge(challenge.get('id'))}>
						Nivå {challenge.get('level')} <Star filled={stars > 0}/><Star filled={(stars - 1) > 0}
					/>
					</button>
				);
			});
			return (
				<div className="table-container" key={nr++}>
					<h2>{container.get('name')}</h2>
					{challenges}
				</div>
			)

		});
		return content;

	},

	render() {
		return (
			<div className="challenge-container">
				{this.getChallengeBoxes()}

			</div>
		)
	}
});

