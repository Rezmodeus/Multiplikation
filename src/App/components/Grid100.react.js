import React from 'react';
import immutable from 'immutable';
import {Button, Table} from 'react-bootstrap';

export default React.createClass({

	render() {
		let nr = 0;
		console.log(this.props)
		const cells = this.props.level.get('grid').map( cell => <td><Button
			disabled={!cell.get('enabled')} key={nr++} bsStyle="info" bsSize="large"
			onClick={()=>console.log(cell.get('value'))}>{cell.get('value')}</Button></td>)
		let grid = [];
		for (let i = 0; i < 10; i++) {
			grid.push(<tr>{cells.slice(i * 10, (i+1) * 10)}</tr>)
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

