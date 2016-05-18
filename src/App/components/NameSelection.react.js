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
			<button key={nr++} className="name-btn standard-btn" onClick={()=>this.setCurrentUser(user)}>{user}</button>
		);

		return (
			<div className="static-modal">
				<Modal show={true} onClick={this.props.closeModal}>
					<Modal.Header>
						<h2>Hej, vad heter du?</h2>
					</Modal.Header>

					<Modal.Body className="game-container">
						{users}
						Eller skriv in ett nytt namn
						<UserNameInput setText={this.setText}/>
						{this.state.text ?
							<button className="name-btn standard-btn" onClick={this.newUser}>Skapa ny användare</button>
							:null
						}
					</Modal.Body>

					<Modal.Footer>
						<button className="name-btn standard-btn" onClick={this.props.closeModal}>Tillbaks</button>
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
