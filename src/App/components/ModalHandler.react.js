import React from 'react';
import immutable from 'immutable';
import {Modal} from 'react-bootstrap';
import NameSelection from './modals/NameSelection.react.js';
import Win1Star from './modals/Win1Star.react.js';
import Win2Star from './modals/Win2Star.react.js';

import Bonus0Star from './modals/Bonus0Star.react';
import Bonus1Star from './modals/Bonus1Star.react';
import Bonus2Star  from './modals/Bonus2Star.react';

export default React.createClass({

	getContent(){
		switch (this.props.modalType) {
			case 'NameSelection':
				return (<NameSelection />);
			case 'Win1Star':
				return (<Win1Star />);
			case 'Win2Star':
				return (<Win2Star />);
			case 'Bonus0Star':
				return (<Bonus0Star />);
			case 'Bonus1Star':
				return (<Bonus1Star />);
			case 'Bonus2Star':
				return (<Bonus2Star />);
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

