import React from 'react';
import immutable from 'immutable';
import {Button, Table} from 'react-bootstrap';

export default React.createClass({

	render() {
		let nr = 0;
		const cells = this.props.gridValues.map((val, index) => <td><Button
			disabled={!this.props.gridToggles.get(index)} key={nr++} bsStyle="info" bsSize="large"
			onClick={()=>console.log(val)}>{val}</Button></td>)
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
})
;

