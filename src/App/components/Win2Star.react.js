import React from 'react';
import immutable from 'immutable';
import Actions from '../Actions';
import {Modal, Button} from 'react-bootstrap';
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
						<Modal.Title>Perfekt!</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						yay
					</Modal.Body>

					<Modal.Footer>
						<Button bsStyle="success" bsSize="small" onClick={this.closeModal}>Fortsätt</Button>
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

