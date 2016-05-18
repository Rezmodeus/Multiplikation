import React from 'react';
import immutable from 'immutable';

export default React.createClass({

	render() {
		let nr = 0;
		const cells = this.props.level.get('grid').valueSeq().map(cell => {
			return (
				<button
					className={`grid-btn standard-btn ${!cell.get('enabled')?'disabled':''}`}
					key={nr++}
					disabled={!cell.get('enabled')}
					onClick={()=>this.props.checkAnswer(cell.get('value'),cell.get('btnNr'))}>
					{(cell.get('value') + '').replace('*', '×')}
				</button>);
		});

		return (
			<div className="grid-container">
				{cells}
			</div>
		)
	}
});

//className={`grid-button ${!cell.get('enabled')?'disabled-btn':''}`}
