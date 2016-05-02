import immutable from 'immutable';
import ReducerLib from './ReducerLib';
export default function (state, action) {
	switch (action.type) {
		case 'START_CHALLENGE':
			const {challenge} = action;
			const ch = state.getIn(['challenges', challenge]);
			const tables = ch.get('tables').toJS();
			const data = ReducerLib.getLevelData(ch.get('levelType'), tables);
			state = state.set('currentChallenge', challenge);
			state = state.set('gameState', 'game');
			state = state.set('level', immutable.fromJS(data));
			return state;

		case 'BACK_TO_START':
			state = state.set('gameState', 'start');
			return state;

		case 'CHECK_ANSWER':
			state = state.update('nr', nr => nr + 1);
			const answerOk = ReducerLib.checkAnswer(action.problem, action.answer);
			state = state.setIn(['level', 'ok'], answerOk ? 'ok' : 'remove');
			const currentChallenge = state.get('currentChallenge')
			const currentLevelType = state.getIn(['challenges', currentChallenge, 'levelType']);
			switch (currentLevelType) {
				case 'level1':
					break;
				case 'level2':
					break;
			}
			if (answerOk) {
				state = state.updateIn(['level', 'currentStep'], n => n + 1);
				state = state.setIn(['level', 'grid', action.answer-1, 'enabled'], false);
			} else {
				state = state.setIn(['level', 'currentAnswer'], action.answer);
			}
			return state;

		default:
			return state;

	}
}