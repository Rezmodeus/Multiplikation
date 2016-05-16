import React from 'react';
import {Glyphicon} from 'react-bootstrap';

export default React.createClass({

	render() {
		return (
			<span>
				{this.props.filled ? <Glyphicon glyph="star"/> : <Glyphicon glyph="star-empty"/>}
			</span>
		)
	}
});


