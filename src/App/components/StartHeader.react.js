import React from 'react';
import immutable from 'immutable';
import Star from './Star.react';

export default React.createClass({

	render() {
		return (
			<div className="start-header">
				<h2>{this.props.stars} <Star filled={true}/></h2>
				<h2>{this.props.currentUser}</h2>
				<button className="standard-btn" onClick={()=>this.props.setModal('NameSelection')}>Byt användare</button>
				<button className="standard-btn" onClick={this.props.stepForward}>step</button>
				<button className="standard-btn" onClick={this.props.resetChallenges}>reset</button>
			</div>
		)
	}
});

