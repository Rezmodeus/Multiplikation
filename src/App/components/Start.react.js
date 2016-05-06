import React from 'react';
import immutable from 'immutable';
import {Button,Well } from 'react-bootstrap';

export default React.createClass({

	getChallengesWell(tableNr){
		let nr = 0;
		const challenges = this.props.challenges.entrySeq()
			.filter(([key, value]) => key.charAt(1) == tableNr)
			.map(([name,challenge]) => {
				return (<Button disabled={!challenge.get('unlocked')} key={nr++} bsStyle="info" bsSize="large"
								onClick={()=>this.props.startChallenge(name)}>{challenge.get('name')}</Button>
				);
			});
		return (
			<Well>
				<h2>Tabell {tableNr}</h2>
				{challenges}
			</Well>
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
			</div>
		)
	}
});