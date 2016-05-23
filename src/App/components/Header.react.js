import React from 'react';
import immutable from 'immutable';
import GameHeader from './GameHeader.react.js';
import StartHeader from './StartHeader.react';

export default React.createClass({

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

