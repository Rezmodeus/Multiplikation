import React from 'react';
import immutable from 'immutable';
import {Button, Table} from 'react-bootstrap';

export default React.createClass({

	render() {
		let nr = 0;
		const cells = this.props.level.get('grid').map(cell => <td><Button
			disabled={!cell.get('enabled')} key={nr++} bsStyle="info" bsSize="large"
			onClick={()=>this.props.checkAnswer(cell.get('value'))}>{(cell.get('value')+'').replace('*','×')}</Button></td>)
		let grid = [];
		for (let i = 0; i < 10; i++) {
			grid.push(<tr>{cells.slice(i * 10, (i + 1) * 10)}</tr>)
		}

		return (
			<Table>
				<tbody>
				{grid}
				</tbody>
			</Table>
		)
	}
});

