import React from 'react';
import immutable from 'immutable';
import {Modal, Button} from 'react-bootstrap';
import NameSelection from './NameSelection.react';

export default React.createClass({

	getContent(){
		switch (this.props.modalType) {
			case 'NameSelection':
				return (<NameSelection />)
				break;
			default:
				return (<div>error</div>)
		}
	},

	render() {
		const modalType = this.props.modalType;
		let modalInstance = null;
		if (modalType) {
			modalInstance = this.getContent();
		}
		return (
			<div>
				{modalInstance}
			</div>
		)
	}
});

