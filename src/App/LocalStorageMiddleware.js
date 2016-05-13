import LocalStorageWrapper from './LocalStorageWrapper';
import immutable from 'immutable';

export default function ({ getState }) {
	return (next) => (action) => {

		let prevState = getState();
		let returnValue = next(action);
		let nextState = getState();
		const usersCheckList = ['currentUser', 'users'];
		const checkList = ['challengeStars', 'stats', 'prevStars'];
		const doSave = [...checkList,...usersCheckList].some(prop => !immutable.is(prevState.get(prop), nextState.get(prop)));
		if (doSave) {
			let saveData = checkList.reduce((obj, prop) => {
				const imProp = nextState.get(prop);
				obj[prop] = (typeof imProp == 'string') || (typeof imProp == 'number') ? imProp : imProp.toJS();
				return obj;
			}, {});
			LocalStorageWrapper.setItem(nextState.get('currentUser'), JSON.stringify(saveData));

			saveData = usersCheckList.reduce((obj, prop) => {
				const imProp = nextState.get(prop);
				obj[prop] = (typeof imProp == 'string') || (typeof imProp == 'number') ? imProp : imProp.toJS();
				return obj;
			}, {});
			LocalStorageWrapper.setItem('prefs', JSON.stringify(saveData));
		}

		return returnValue
	}
}

