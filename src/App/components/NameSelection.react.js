import React from 'react';
import immutable from 'immutable';
import Actions from '../Actions';
import UserNameInput from'./UserNameInput.react.js';
import {Modal, Button} from 'react-bootstrap';
import { connect } from 'react-redux';

const NameSelection = React.createClass({

	render() {

		let nr = 0;
		const users = this.props.users.map(user =>
			<Button key={nr++} bsStyle="success" bsSize="small" onClick={()=>console.log(user)}>{user}</Button>
		);

		return (
			<div className="static-modal">
				<Modal show={this.props.visible} onClick={this.props.closeModal}>
					<Modal.Header>
						<Modal.Title>Hej, vad heter du?</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						{users}
						<UserNameInput />
						<Button bsStyle="success" bsSize="small" onClick={()=>this.props.newUser('Albert')}>Skapa ny användare</Button>
					</Modal.Body>

					<Modal.Footer>
						<Button bsStyle="primary" onClick={this.props.closeModal}>OK</Button>
					</Modal.Footer>
				</Modal>
			</div>
		)
	}
});


const mapStateToProps = (state) => {
	return {
		users: state.get('users'),
		visible: state.getIn(['modal','visible']),
		currentUser: state.get('currentUser')
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		closeModal: () => dispatch(Actions.closeModal()),
		newUser: (user) => dispatch(Actions.newUser(user))
	}
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NameSelection)
