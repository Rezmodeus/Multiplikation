import React from 'react';
import immutable from 'immutable';
import Actions from '../Actions';
import {Modal, Button} from 'react-bootstrap';
import BigStar from './BigStar.react'
import { connect } from 'react-redux';

const Win2Star = React.createClass({

	closeModal(){
		this.props.backToStart();
		this.props.closeModal();
	},

	render() {
		return (
			<div className="static-modal">
				<Modal show={true} onClick={this.closeModal}>
					<Modal.Header>
						<h2>Utmärkt!</h2>
					</Modal.Header>

					<Modal.Body className="star-container">
						<BigStar/>
						<BigStar/>
					</Modal.Body>

					<Modal.Footer>
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
)(Win2Star)

