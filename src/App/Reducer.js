import immutable from 'immutable';
import ReducerLib from './ReducerLib';
import saveLists from './saveLists';
export default function (state, action) {
	switch (action.type) {
		case 'START_CHALLENGE':
			const ch = state.get('challenges').find(challenge => challenge.get('id') == action.challenge);
			const tables = ch.get('tables').toJS();
			const data = ReducerLib.getLevelData('level' + ch.get('level'), tables);
			state = state.set('currentChallenge', ch);
			state = state.set('currentChallengeName', action.challenge);
			state = state.set('gameState', 'game');
			state = state.set('level', immutable.fromJS(data));
			return state;

		case 'RESTART_CHALLENGE':
			const challengeName = state.get('currentChallengeName');
			const previousCh = state.get('challenges').find(challenge => challenge.get('id') == challengeName);
			const previousTables = previousCh.get('tables').toJS();
			const previousData = ReducerLib.getLevelData('level' + previousCh.get('level'), previousTables);
			state = state.set('level', immutable.fromJS(previousData));
			return state;

		case 'BACK_TO_START':
			state = state.set('gameState', 'start');
			return state;

		case 'CHECK_ANSWER':
			state = state.update('nr', nr => nr + 1);
			const answerOk = ReducerLib.checkAnswer(action.problem, action.answer);
			state = state.setIn(['level', 'ok'], answerOk ? 'ok' : 'remove');
			const currentChallenge = state.get('currentChallenge');
			const currentLevelType = currentChallenge.get('levelType');
			// TODO maybe
			switch (currentLevelType) {
				case 'level1':
					break;
				case 'level2':
					break;
			}
			if (answerOk) {
				if (state.getIn(['level', 'currentStep']) < state.getIn(['level', 'problems']).size) {
					state = state.updateIn(['level', 'currentStep'], n => n + 1);
				}
				state = state.setIn(['level', 'grid', action.btnNr, 'enabled'], false);
				//state = state.setIn(['level', 'grid', action.answer - 1, 'enabled'], false);
			} else {
				state = state.setIn(['level', 'currentAnswer'], action.answer);
				state = state.updateIn(['level', 'errors'], n => n + 1);
			}
			let history = state.getIn(['level', 'history']);
			const equalSign = answerOk ? '=' : '≠';
			history = history.push(immutable.fromJS({
				value: `${action.problem.replace('*', '×')} ${equalSign} ${action.answer}`,
				ok: answerOk,
				key: ReducerLib.getKey()
			}));
			if (history.size >= 5) {
				history = history.shift();
			}
			state = state.setIn(['level', 'history'], history);

			if (state.getIn(['level', 'currentStep']) == state.getIn(['level', 'problems']).size) {
				if (state.getIn(['level', 'errors']) > 0) {
					state = state.set('modalType', 'Win1Star');
					const chStar = state.getIn(['challengeStars', state.get('currentChallengeName')]);
					if (!chStar || chStar != 2) {
						state = state.setIn(['challengeStars', state.get('currentChallengeName')], 1);
					}
					state = ReducerLib.updateStars(state);
				} else {
					state = state.set('modalType', 'Win2Star');
					state = state.setIn(['challengeStars', state.get('currentChallengeName')], 2);
					state = ReducerLib.updateStars(state);
				}
			}
			return state;

		case 'ADD_STARS':
			state = state.set('prevStars', state.get('stars'));
			state = state.update('stars', n => n + action.nr);
			return state;

		case 'CLOSE_MODAL':
			state = state.set('modalType', '');
			return state;

		case 'SET_MODAL':
			state = state.set('modalType', action.modalType);
			switch (action.modalType) {
				case 'NameSelection':
					break;
				default:
					break;
			}
			return state;

		case 'SET_CURRENT_USER':
			if (state.get('users').includes(action.user)) {
				state = state.set('currentUser', action.user);
				saveLists.userData.forEach(name => state = state.set(name, immutable.fromJS(action.userData[name])));
				state = state.set('stars', ReducerLib.calcStars(state));
			} else {
				// TODO: toggle user select
				// no such user
			}
			return state;

		case 'NEW_USER':
			let users = state.get('users');
			users = users.push(action.user);
			state = state.set('users', users);
			state = state.set('currentUser', action.user);
			return state;

		default:
			return state;

	}
}