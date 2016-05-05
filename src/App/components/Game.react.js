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
			<div>
				<div className="navigation-container">
					<Button className="back-btn" bsStyle="info" bsSize="large" onClick={()=>this.props.backToStart()}>Tillbaks</Button>
					<Button className="restart-btn" bsStyle="danger" bsSize="large" onClick={()=>this.props.startChallenge(this.props.currentChallenge.get('id'))}>Starta om</Button>
				</div>
				<LevelNormal {...payload }/>

			</div>
		)
	}
});
