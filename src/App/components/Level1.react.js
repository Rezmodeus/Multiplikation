import React from 'react';
import immutable from 'immutable';
import {Button} from 'react-bootstrap';
import Grid100 from './Grid100.react';

export default React.createClass({

	checkAnswer(answer){
		this.props.checkAnswer(this.props.level.getIn(['problems',this.props.level.get('currentProblem')]), answer);
	},

	render() {
		const currentProblem = this.props.level.get('currentProblem');
		const problems = this.props.level.get('problems');
		const problem = problems.get(currentProblem);
		return (
			<div>
				<h1>{problem}={this.props.level.get('currentAnswer')}</h1>
				<Grid100 level={this.props.level} checkAnswer={this.checkAnswer} />
			</div>
		)
	}
});

//<Grid100 gridToggles={this.props.gridToggles} gridValues={this.props.gridValues}/>
