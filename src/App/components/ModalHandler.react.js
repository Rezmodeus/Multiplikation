import React from 'react';
import immutable from 'immutable';
import {Modal, Button} from 'react-bootstrap';
import NameSelection from './NameSelection.react';
import Win1Star from './Win1Star.react';
import Win2Star from './Win2Star.react';

export default React.createClass({

	getContent(){
		switch (this.props.modalType) {
			case 'NameSelection':
				return (<NameSelection />);
			case 'Win1Star':
				return (<Win1Star />);
			case 'Win2Star':
				return (<Win2Star />);
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

