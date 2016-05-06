import React from 'react';
import immutable from 'immutable';
import {Button} from 'react-bootstrap';
import LevelNormal from './LevelNormal.react.js';

export default React.createClass({

	render() {
		return (
			<div className="navigation-container">
				<Button className="back-btn" bsStyle="info" bsSize="small" onClick={()=>this.props.backToStart()}>Tillbaks</Button>
				<Button className="restart-btn" bsStyle="danger" bsSize="small" onClick={()=>this.props.restartChallenge()}>Starta om</Button>
			</div>
		)
	}
});

