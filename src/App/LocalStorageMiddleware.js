import LocalStorageWrapper from './LocalStorageWrapper';
import immutable from 'immutable';

export default function ({ getState }) {
	return (next) => (action) => {

		let prevState = getState();
		let returnValue = next(action);
		let nextState = getState();

		switch (action.type) {
			case 'NEW_USER':
				if (prevState.get('currentUser') !== nextState.get('currentUser')) {
					LocalStorageWrapper.setItem('currentUser', action.user);
				}
				if (!immutable.is(prevState.get('users'), nextState.get('users'))) {
					LocalStorageWrapper.setItem('users', JSON.stringify(nextState.get('users')));
				}
				break;

			case 'SET_CURRENT_USER':
				if (prevState.get('currentUser') !== nextState.get('currentUser')) {
					LocalStorageWrapper.setItem('currentUser', action.user);
				}
				break;
		}

		return returnValue
	}
}

