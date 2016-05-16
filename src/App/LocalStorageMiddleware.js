import LocalStorageWrapper from './LocalStorageWrapper';
import saveLists from './saveLists';
import immutable from 'immutable';

export default function ({ getState }) {
	return (next) => (action) => {

		let prevState = getState();
		let returnValue = next(action);
		let nextState = getState();
		let saveData;
		const usersCheckList = saveLists.userData;
		const prefsCheckList = saveLists.prefs;
		let doSave = prefsCheckList.some(prop => !immutable.is(prevState.get(prop), nextState.get(prop)));
		if (doSave) {
			saveData = prefsCheckList.reduce((obj, prop) => {
				const imProp = nextState.get(prop);
				obj[prop] = (typeof imProp == 'string') || (typeof imProp == 'number') ? imProp : imProp.toJS();
				return obj;
			}, {});
			LocalStorageWrapper.setItem('prefs', JSON.stringify(saveData));
		}
		console.log(action,'prefs',doSave);

		doSave = usersCheckList.some(prop => !immutable.is(prevState.get(prop), nextState.get(prop)));
		if (doSave) {
			saveData = usersCheckList.reduce((obj, prop) => {
				const imProp = nextState.get(prop);
				obj[prop] = (typeof imProp == 'string') || (typeof imProp == 'number') ? imProp : imProp.toJS();
				return obj;
			}, {});
			LocalStorageWrapper.setItem(nextState.get('currentUser'), JSON.stringify(saveData));
		}
		console.log(action,'userData',doSave);
		return returnValue
	};
}

