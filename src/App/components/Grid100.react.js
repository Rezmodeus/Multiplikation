import React from 'react';
import immutable from 'immutable';
import {Button} from 'react-bootstrap';

export default React.createClass({

	render() {
		let nr = 0;
		const cells = this.props.level.get('grid').valueSeq().map(cell => {
			return (
				<Button
					className={`grid-button ${!cell.get('enabled')?'disabled-btn':''}`}
					key={nr++}
					disabled={!cell.get('enabled')} bsStyle="success" bsSize="large"
					onClick={()=>this.props.checkAnswer(cell.get('value'))}>
					{(cell.get('value') + '').replace('*', '×')}
				</Button>);
		});
		let grid = cells;

		return (
			<div className="grid-container">
				{grid}
			</div>
		)
	}
});

