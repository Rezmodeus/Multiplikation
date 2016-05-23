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
				<h2>{this.props.currentUser}</h2>
				<button className="standard-btn" onClick={()=>this.props.restartChallenge()}>Starta om</button>
				{debugButtons}
			</div>
		)
	}
});

