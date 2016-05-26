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
				const newFlag = !disabled && stars == 0;
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

	getBonusBox(){
		const container = this.props.bonusContainer;
		const chName = container.getIn(['challenges', 0]);
		if (this.props.stars < this.props.challenges.getIn([chName, 'requiredStars'])) {
			return null;
		}
		const challengeNames = ['Lätt', 'Medel', 'Svår', 'Maraton', 'Maraton 2'];
		const name = container.get('name');
		let nr = 0;
		let nameIndex = 0;
		const challenges = container.get('challenges').map(ch => {
			const challenge = this.props.challenges.get(ch);
			const stars = this.props.challengeStars.get(ch) || 0;
			const disabled = this.props.stars < challenge.get('requiredStars');
			const newFlag = !disabled && stars == 0;
			let cls = newFlag ? 'standard-btn pulsating' : disabled ? 'standard-btn disabled' : 'standard-btn';
			cls += ' fixed-width';
			return (<button className={cls} disabled={disabled} key={nr++}
							onClick={()=>this.props.startChallenge(challenge.get('id'))}>{challengeNames[nameIndex++]}{'  '}
					<Star filled={stars > 0}/><Star filled={(stars - 1) > 0}
					/>
				</button>
			);
		});

		return (
			<div className="table-container" key={nr++}>
				<h2>{name}</h2>
				{challenges}
			</div>
		)
	},

	render() {
		return (
			<div className="challenge-container">
				{this.getChallengeBoxes()}
				{this.getBonusBox()}
			</div>
		)
	}
});

