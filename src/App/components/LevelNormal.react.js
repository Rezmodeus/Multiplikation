import React from 'react';
import immutable from 'immutable';
import {Glyphicon} from 'react-bootstrap';
import Grid100 from './Grid100.react';
import History from './History.react';

export default React.createClass({

	render() {
		const problems = this.props.level.get('problems');
		const currentStep = Math.min(this.props.level.get('currentStep'), problems.size-1);
		const problem = (problems.get(currentStep)+'').replace('*','×');
		const currentAnswer = this.props.level.get('currentAnswer');
		const ok = this.props.level.get('ok');
		const cls = currentAnswer != '' ? 'wrong-answer' : '';
		const history = this.props.level.get('history');
		return (
			<div className="game-container">
				<History history={history}/>
				<h1>
					<span className="problem-text">{problem}</span>
				</h1>
				<Grid100 level={this.props.level} checkAnswer={this.props.checkAnswer}/>
			</div>
		)
	}
});

