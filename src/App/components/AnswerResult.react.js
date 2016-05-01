import React from 'react';
import {Glyphicon} from 'react-bootstrap';

export default React.createClass({
	componentWillUpdate(nextProps){
		console.log(nextProps,this.props.ok)
	},

	render() {
		const cls = `answer-result ${this.props.ok}`;
		return (
			<div className={cls}>
				<Glyphicon glyph={this.props.ok} />
			</div>
		)
	}
});


