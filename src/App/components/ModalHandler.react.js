import React from 'react';
import immutable from 'immutable';
import {Modal, Button} from 'react-bootstrap';
import NameSelection from './NameSelection.react';

export default React.createClass({

	getContent(type){
		switch (type) {
			case 'NameSelection':
				return (<NameSelection />)
				break;
			default:
				return (<div>error</div>)
		}
	},

	render() {
		const modal = this.props.modal;
		const visible = modal.get('visible');
		let modalInstance = null;
		if (visible) {
			modalInstance = this.getContent(modal.get('type'));
		}
		return (
			<div>
				{modalInstance}
			</div>
		)
	}
});

