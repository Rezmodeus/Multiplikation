import React from 'react';
import immutable from 'immutable';
import Actions from '../Actions';
import UserNameInput from'./UserNameInput.react.js';
import {Modal, Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import LocalStorageFilter from '../LocalStorageFilter';

const NameSelection = React.createClass({
	getInitialState() {
		return {
			text: ''
		};
	},

	setText(text){
		this.setState({text})
	},

	newUser(){
		this.props.newUser(this.state.text);
		this.props.closeModal();
	},

	setCurrentUser(user){
		const userData = LocalStorageFilter.getUserData(user);
		this.props.setCurrentUser(user, userData);
		this.props.closeModal();
	},

	render() {
		let nr = 0;
		const users = this.props.users.map(user =>
			<Button key={nr++} bsStyle="success" bsSize="small" onClick={()=>this.setCurrentUser(user)}>{user}</Button>
		);

		return (
			<div className="static-modal">
				<Modal show={true} onClick={this.props.closeModal}>
					<Modal.Header>
						<Modal.Title>Hej, vad heter du?</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						{users}
						<UserNameInput setText={this.setText}/>
						{this.state.text ?
							<Button bsStyle="success" bsSize="small" onClick={this.newUser}>Skapa ny användare</Button>
							:null
						}
					</Modal.Body>

					<Modal.Footer>
						<Button bsStyle="primary" onClick={this.props.closeModal}>Stäng</Button>
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
		newUser: (user) => dispatch(Actions.newUser(user)),
		setCurrentUser: (user, userData) => dispatch(Actions.setCurrentUser(user, userData))
	}
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NameSelection)
