import React from 'react';
import immutable from 'immutable';
import {Modal} from 'react-bootstrap';
import NameSelection from './NameSelection.react';
import Win1Star from './modals/Win1Star.react.js';
import Win2Star from './modals/Win2Star.react.js';

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

