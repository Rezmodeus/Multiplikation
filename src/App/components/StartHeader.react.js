import React from 'react';
import immutable from 'immutable';
import {Button} from 'react-bootstrap';

export default React.createClass({

	render() {
		return (
			<div className="navigation-container">
				<Button bsStyle="success" bsSize="small" onClick={()=>this.addStars(2)}>add
					star {this.props.stars}</Button>
				<h3>{this.props.currentUser}</h3>
				<Button className="restart-btn" bsStyle="danger" bsSize="small" onClick={()=>console.log('asdf')}>Byta användare</Button>
			</div>
		)
	}
});

