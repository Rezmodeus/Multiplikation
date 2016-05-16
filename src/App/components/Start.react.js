import React from 'react';
import immutable from 'immutable';
import {Glyphicon, Button, Well} from 'react-bootstrap';
import Star from './Star.react';

export default React.createClass({

	getChallengesWell(tableNr){
		const testCh = this.props.challenges.find( ch => ch.get('id') == tableNr+'_1');
		if (this.props.stars < testCh.get('requiredStars')){
			return null;
		}
		let nr = 0;
		const challenges = this.props.challenges.entrySeq()
			.filter( ([key,challenge]) => challenge.get('id').split('_')[0] == tableNr)
			.map( ([k,ch]) => {
				const disabled = this.props.stars < ch.get('requiredStars');
				const newFlag = this.props.stars >= ch.get('requiredStars') && this.props.prevStars < ch.get('requiredStars');
				const cls = newFlag ? 'pulsating' : disabled ? 'disabled-btn':'';
				let stars = this.props.challengeStars.get(ch.get('id')) || 0;
				return (<Button className={cls} disabled={disabled} key={nr++} bsStyle="info" bsSize="large"
								onClick={()=>this.props.startChallenge(ch.get('id'))}>Nivå {ch.get('level')}
						<Star filled={stars > 0}/>
						<Star filled={(stars - 1) > 0}/>
					</Button>
				);
			});
		return (
			<div className="table-container">
				<h2>Tabell {tableNr}</h2>
				{challenges}
			</div>
		)
	},

	render() {
		let nr = 0;
		const challenges = this.props.challenges.map(challenge => {
			const unlocked = challenge.get('unlocked');
			return <Button disabled={!unlocked} key={nr++} bsStyle="info" bsSize="small"
						   onClick={()=>console.log()}>{challenge.get('name')}</Button>
		});

		return (
			<div className="challenge-container">
				{this.getChallengesWell(1)}
				{this.getChallengesWell(2)}
				{this.getChallengesWell(3)}
				{this.getChallengesWell(4)}
				{this.getChallengesWell(5)}
				{this.getChallengesWell(6)}
				{this.getChallengesWell(7)}
				{this.getChallengesWell(8)}
				{this.getChallengesWell(9)}
				{this.getChallengesWell(10)}
			</div>
		)
	}
});