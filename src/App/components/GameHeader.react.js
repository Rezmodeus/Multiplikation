import React from 'react';
import immutable from 'immutable';

export default React.createClass({

	render() {
		return (
			<div className="start-header">
				<button className="standard-btn" onClick={()=>this.props.backToStart()}>Tillbaks</button>
				<h2>{this.props.currentUser}</h2>
				<button className="standard-btn"  onClick={()=>this.props.restartChallenge()}>Starta om</button>
			</div>
		)
	}
});

