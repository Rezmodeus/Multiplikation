import React from 'react';
import immutable from 'immutable';
import {Button} from 'react-bootstrap';
import Navigation from './Navigation.react';

export default React.createClass({

	render() {
		return (
			<div className="header">
				{ this.props.gameState=='game' ?
				<Navigation {...this.props}/>
				:
				null }
			</div>
		)
	}
});
//<Button bsStyle="success" bsSize="small" onClick={()=> this.props.addStar()}>add star {this.props.stars}</Button>

