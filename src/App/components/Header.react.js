import React from 'react';
import immutable from 'immutable';
import {Button} from 'react-bootstrap';
import GameHeader from './GameHeader.react.js';
import StartHeader from './StartHeader.react';

export default React.createClass({

	addStars(nr){
		this.props.addStars(nr);
	},
	render() {
		return (
			<div className="header">
				{ this.props.gameState == 'game' ?
					<GameHeader {...this.props}/>
					:
				<StartHeader {...this.props}/>
				}
			</div>
		)
	}
});

