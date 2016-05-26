import React from 'react';
import immutable from 'immutable';
import Actions from '../../Actions';
import {Modal, Button} from 'react-bootstrap';
import BigStar from './../BigStar.react.js'
import { connect } from 'react-redux';

const Win1Star = React.createClass({

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

					<Modal.Body className="star-container">
						<BigStar/>
					</Modal.Body>

					<Modal.Footer>
						<h3>Om du klarar det utan att göra fel får du 2 stjärnor</h3>
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
)(Win1Star)

