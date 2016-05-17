import React from 'react';
import {Glyphicon} from 'react-bootstrap';

export default React.createClass({

	render() {
		const cls = this.props.filled ? 'star filled' : 'star';
		return (
			<span className={cls}>
				{this.props.filled ? <Glyphicon glyph="star"/> : <Glyphicon glyph="star-empty"/>}
			</span>
		)
	}
});


