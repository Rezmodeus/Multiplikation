import React from 'react';
import immutable from 'immutable';
import Actions from '../../Actions';
import {Modal, Button} from 'react-bootstrap';
import BigStar from './../BigStar.react';
import { connect } from 'react-redux';

const Bonus1Star = React.createClass({

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
						<h2>Bra!</h2>
					</Modal.Header>

					<Modal.Body className="star-container">
						<BigStar/>
					</Modal.Body>

					<Modal.Footer>
						<h3>Får du alla rätt får du 2 stjärnor</h3>
						<button className="standard-btn" onClick={this.backToStart}>Testa en annan</button>
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
		closeModal: () => dispatch(Actions.closeModal()),
		restartChallenge: ()=> dispatch(Actions.restartChallenge())
	}
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Bonus1Star)

