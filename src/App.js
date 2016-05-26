import React from 'react';
import Start from './App/components/Start.react';
import Game from './App/components/Game.react';
import Header from './App/components/Header.react';
import ModalHandler from './App/components/ModalHandler.react.js';
import Actions from './App/Actions';
import { connect } from 'react-redux';
require('./less/main.less');

const App = React.createClass({
	render() {
		const headerPayload = {
			currentUser: this.props.currentUser,
			backToStart: this.props.backToStart,
			restartChallenge: this.props.restartChallenge,
			stars: this.props.stars,
			gameState: this.props.gameState,
			setModal: this.props.setModal,
			stepForward: this.props.stepForward,
			resetChallenges: this.props.resetChallenges,
			checkAnswer: this.props.checkAnswer,
			level:this.props.level,
			debug:this.props.debug
		};

		return (
			<div>
				<Header {...headerPayload}/>
				<div className="app-container">
					{this.props.gameState == 'start' ?
						<Start {...this.props}/>
						:
						<Game {...this.props}/>
					}
				</div>
				<ModalHandler modalType={this.props.modalType} closeModal={this.props.closeModal} />
			</div>

		);
	}
});

const mapStateToProps = (state) => {
	return {
		nr: state.get('nr'),
		currentUser: state.get('currentUser'),
		gameState: state.get('gameState'),
		currentChallenge: state.get('currentChallenge'),
		challenges: state.get('challenges'),
		challengeStars: state.get('challengeStars'),
		level: state.get('level'),
		stars: state.get('stars'),
		prevStars: state.get('prevStars'),
		modalType: state.get('modalType'),
		challengeContainers: state.get('challengeContainers'),
		debug: state.get('debug')
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		startChallenge: (challenge)=>dispatch(Actions.startChallenge(challenge)),
		restartChallenge: ()=>dispatch(Actions.restartChallenge()),
		backToStart: (challenge)=>dispatch(Actions.backToStart(challenge)),
		checkAnswer: (problem, answer, btnNr) => dispatch(Actions.checkAnswer(problem, answer, btnNr)),
		closeModal: () => dispatch(Actions.closeModal()),
		setModal: (modalType)=> dispatch(Actions.setModal(modalType)),
		stepForward: () => dispatch(Actions.stepForward()),
		resetChallenges: () => dispatch(Actions.resetChallenges())
	}
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)

