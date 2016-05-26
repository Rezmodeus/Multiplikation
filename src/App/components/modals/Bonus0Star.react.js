import React from 'react';
import immutable from 'immutable';
import Actions from '../../Actions';
import {Modal, Button} from 'react-bootstrap';
import { connect } from 'react-redux';

const Win1Star = React.createClass({

	backToStart(){
		this.props.backToStart();
		this.props.closeModal();
	},

	restart(){
		this.props.restartChallenge();
		this.props.closeModal();
	},

	render() {
		return (
			<div className="static-modal">
				<Modal show={true} onClick={this.backToStart}>
					<Modal.Header>
						<h2>Tyvärr!</h2>
					</Modal.Header>

					<Modal.Body className="star-container">
					</Modal.Body>

					<Modal.Footer>
						<h3>Får du hälften rätt får du 1 stjärna</h3>
						<button className="standard-btn" onClick={this.backToStart}>Fortsätt</button>
						<button className="standard-btn" onClick={this.restart}>Prova igen</button>
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

