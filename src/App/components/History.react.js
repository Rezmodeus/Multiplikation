import React from 'react';
import immutable from 'immutable';

export default React.createClass({

	render() {
		const history = this.props.history.valueSeq().map(item => {
			const cls = item.get('ok') ? 'history-item ok' : 'history-item wrong';
			return (
				<div key={item.get('key')} className={cls}>
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

