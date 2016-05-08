import React from 'react';
import immutable from 'immutable';
import {Button} from 'react-bootstrap';
import Navigation from './Navigation.react';

export default React.createClass({

	addStars(nr){
		this.props.addStars(nr);
	},
	render() {
		return (
			<div className="header">
				{ this.props.gameState == 'game' ?
					<Navigation {...this.props}/>
					:
					<Button bsStyle="success" bsSize="small" onClick={()=>this.addStars(2)}>add
						star {this.props.stars}</Button>
				}
			</div>
		)
	}
});

