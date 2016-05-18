import React from 'react';
import immutable from 'immutable';
import Actions from '../Actions';
import {Modal, Button} from 'react-bootstrap';
import Star from './Star.react'
import { connect } from 'react-redux';

const NameSelection = React.createClass({

	closeModal(){
		this.props.backToStart();
		this.props.closeModal();
	},

	render() {
		return (
			<div className="static-modal">
				<Modal show={true} onClick={this.closeModal}>
					<Modal.Header>
						<h2>Bra!</h2>
					</Modal.Header>

					<Modal.Body>
					<Star filled={true}/>
					</Modal.Body>

					<Modal.Footer>
						Om du får alla rätt får du 2 stjärnor
						<button className="standard-btn" onClick={this.closeModal}>Fortsätt</button>
					</Modal.Footer>
				</Modal>
			</div>
		)
	}
});

const mapStateToProps = (state) => {
	return {
		users: state.get('users'),
		visible: state.getIn(['modal', 'visible']),
		currentUser: state.get('currentUser')
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		backToStart: () => dispatch(Actions.backToStart()),
		closeModal: () => dispatch(Actions.closeModal())
	}
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NameSelection)

