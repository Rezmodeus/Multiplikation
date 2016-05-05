import React from 'react';
import immutable from 'immutable';
import {Button, Table} from 'react-bootstrap';

export default React.createClass({

	render() {
		let nr = 0;
		const cells = this.props.level.get('grid').valueSeq().map(cell => {
			return (
				<Button
					className="grid-button"
					key={nr++}
					disabled={!cell.get('enabled')} bsStyle="success" bsSize="large"
					onClick={()=>this.props.checkAnswer(cell.get('value'))}>
					{(cell.get('value') + '').replace('*', '×')}
				</Button>);
		});
		let grid = cells;//[];
		//for (let i = 0; i < 10; i++) {
		//	grid.push(<div key={nr++}>{cells.slice(i * 10, (i + 1) * 10)}</div>)
		//}

		return (
			<div className="grid-container">
				{grid}
			</div>
		)
	}
});

