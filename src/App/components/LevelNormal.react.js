import React from 'react';
import immutable from 'immutable';
import {Button, Glyphicon} from 'react-bootstrap';
import Grid100 from './Grid100.react';
import History from './History.react';
import Tick from './Tick.react';

export default React.createClass({

	render() {
		const currentStep = this.props.level.get('currentStep');
		const problems = this.props.level.get('problems');
		const problem = problems.get(currentStep).replace('*','×');
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

//{item.get('ok') ? <Tick/> : <span className="cross"/> }
