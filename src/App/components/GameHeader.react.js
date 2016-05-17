import React from 'react';
import immutable from 'immutable';
import {Button} from 'react-bootstrap';

export default React.createClass({

	render() {
		return (
			<div className="start-header">
				<Button className="challenge-btn" bsSize="small" onClick={()=>this.props.backToStart()}>Tillbaks</Button>
				<h2>{this.props.currentUser}</h2>
				<Button className="challenge-btn" bsSize="small" onClick={()=>this.props.restartChallenge()}>Starta om</Button>
			</div>
		)
	}
});

