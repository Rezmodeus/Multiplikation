import React from 'react';
import immutable from 'immutable';
import {Button} from 'react-bootstrap';
import LevelNormal from './LevelNormal.react.js';

export default React.createClass({
	checkAnswer(answer){
		this.props.checkAnswer(this.props.level.getIn(['problems', this.props.level.get('currentStep')]), answer);
	},

	checkAnswerReverse(answer){
		this.props.checkAnswer(answer, this.props.level.getIn(['problems', this.props.level.get('currentStep')]));
	},

	render() {
		let {checkAnswer, ...rest} = this.props;
		const check = this.props.currentChallenge.get('levelType') == 'level5' ? this.checkAnswerReverse : this.checkAnswer;
		const payload = {
			...rest,
			checkAnswer: check
		};

		return (
			<LevelNormal {...payload }/>
		)
	}
});
