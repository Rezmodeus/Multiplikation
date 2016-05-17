import React from 'react';
import immutable from 'immutable';
import {Button} from 'react-bootstrap';
import LevelNormal from './LevelNormal.react.js';

export default React.createClass({
	checkAnswer(answer, btnNr){
		if (typeof answer === 'number') {
			this.props.checkAnswer(this.props.level.getIn(['problems', this.props.level.get('currentStep')]), answer, btnNr);
		} else {
			// reverse
			this.props.checkAnswer(answer, this.props.level.getIn(['problems', this.props.level.get('currentStep')]), btnNr);
		}
	},

	render() {
		let {checkAnswer, ...rest} = this.props;
		const payload = {
			...rest,
			checkAnswer: this.checkAnswer
		};

		return (
			<LevelNormal {...payload }/>
		)
	}
});
