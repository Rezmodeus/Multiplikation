import React from 'react';
import immutable from 'immutable';
import {Button, Glyphicon} from 'react-bootstrap';
import Grid100 from './Grid100.react';
import AnswerResult from './AnswerResult.react';

export default React.createClass({

	render() {
		const currentStep = this.props.level.get('currentStep');
		const problems = this.props.level.get('problems');
		const problem = problems.get(currentStep);
		const currentAnswer = this.props.level.get('currentAnswer');
		const ok = this.props.level.get('ok');
		const cls = currentAnswer != '' ? 'wrong-answer' : '';
		return (
			<div>
				<h1>
					<span>{problem}= </span>
					<span className={cls}> {this.props.level.get('currentAnswer')}</span>
				</h1>
				<AnswerResult ok={ok} nr={this.props.nr}/>
				<Grid100 level={this.props.level} checkAnswer={this.props.checkAnswer}/>
			</div>
		)
	}
});

