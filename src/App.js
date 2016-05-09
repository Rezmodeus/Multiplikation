import React from 'react';
import Start from './App/components/Start.react';
import Game from './App/components/Game.react';
import Header from './App/components/Header.react';
import Modal from './App/components/Modal.react';
import Actions from './App/Actions';
import { connect } from 'react-redux';
require('./less/main.less');

const App = React.createClass({
	render() {
		const headerPayload = {
			addStars: this.props.addStars,
			backToStart: this.props.backToStart,
			restartChallenge: this.props.restartChallenge,
			stars: this.props.stars,
			gameState: this.props.gameState
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
				<Modal modal={this.props.modal} closeModal={this.props.closeModal} />
			</div>

		);
	}
});

const mapStateToProps = (state) => {
	return {
		nr: state.get('nr'),
		gameState: state.get('gameState'),
		currentChallenge: state.get('currentChallenge'),
		challenges: state.get('challenges'),
		level: state.get('level'),
		stars: state.get('stars'),
		prevStars: state.get('prevStars'),
		modal: state.get('modal')
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		startChallenge: (challenge)=>dispatch(Actions.startChallenge(challenge)),
		restartChallenge: ()=>dispatch(Actions.restartChallenge()),
		backToStart: (challenge)=>dispatch(Actions.backToStart(challenge)),
		checkAnswer: (problem, answer) => dispatch(Actions.checkAnswer(problem, answer)),
		addStars: (nr) => dispatch(Actions.addStars(nr)),
		closeModal: () => dispatch(Actions.closeModal())
	}
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)

