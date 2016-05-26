import React from 'react';
import immutable from 'immutable';

export default React.createClass({

	right(){
		this.props.checkAnswer('1*1', 1, 1);
	},

	wrong(){
		this.props.checkAnswer('1*1', 2, 1);
	},

	render() {
		const currentStep =  this.props.level.get('currentStep');
		const nrOfProblems  =  this.props.level.get('problems').size;
		const progress = currentStep+' av ' + nrOfProblems;
		const debugButtons = this.props.debug ?
			(
				<div>
					<button className="standard-btn" onClick={this.right}>right</button>
					<button className="standard-btn" onClick={this.wrong}>wrong</button>
				</div>
			) : null;

		return (
			<div className="start-header">
				<button className="standard-btn" onClick={()=>this.props.backToStart()}>Tillbaks</button>
				<h2>{this.props.currentUser} {progress}</h2>
				<button className="standard-btn" onClick={()=>this.props.restartChallenge()}>Starta om</button>
				{debugButtons}
			</div>
		)
	}
});

