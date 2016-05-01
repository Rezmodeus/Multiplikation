import React from 'react';
import Start from './App/components/Start.react';
import Game from './App/components/Game.react';
import Actions from './App/Actions';
import { connect } from 'react-redux';
require('./less/main.less');

const App = React.createClass({
	render() {
		return (
			<div className="challenge-container">
				{this.props.gameState == 'start' ?
					<Start {...this.props}/>
					:
					<Game {...this.props}/>
				}
			</div>

		);
	}
});

const mapStateToProps = (state) => {
	return {
		a: state.get('a'),
		gameState: state.get('gameState'),
		currentChallenge: state.get('currentChallenge'),
		challenges: state.get('challenges'),
		level: state.get('level')
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		startChallenge: (challenge)=>dispatch(Actions.startChallenge(challenge)),
		backToStart: (challenge)=>dispatch(Actions.backToStart(challenge)),
		checkAnswer: (problem, answer) => dispatch(Actions.checkAnswer(problem, answer))
	}
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)

