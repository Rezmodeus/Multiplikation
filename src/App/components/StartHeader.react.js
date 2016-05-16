import React from 'react';
import immutable from 'immutable';
import {Button} from 'react-bootstrap';
import Star from './Star.react';

export default React.createClass({

	render() {
		return (
			<div className="navigation-container">
				<h3>{this.props.stars} <Star filled={true}/></h3>
				<h3>{this.props.currentUser}</h3>
				<Button className="restart-btn" bsStyle="danger" bsSize="small" onClick={()=>this.props.setModal('NameSelection')}>Byt användare</Button>
			</div>
		)
	}
});

