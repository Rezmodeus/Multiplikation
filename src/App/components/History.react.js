import React from 'react';
import immutable from 'immutable';

export default React.createClass({

	render() {
		const history = this.props.history.valueSeq().map(item => {
			return (
				<div
					className={item.get('ok') ? 'history-item ok' : 'history-item wrong'}>
					{item.get('value')}
				</div>
			)
		});
		return (
			<div className="history-container">
				{history}
			</div>
		)
	}
});

//{item.get('ok') ? <Tick/> : <span className="cross"/> }

