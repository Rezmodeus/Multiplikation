import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import immutable from 'immutable';
import INITIAL_STATE from './INITIAL_STATE';
import Reducer from './Reducer';
import LocalStorageFilter from './LocalStorageFilter';
import LocalStorageMiddleware from './LocalStorageMiddleware';
import ReducerLib from './ReducerLib';
import createLogger from 'redux-logger';


let state = INITIAL_STATE;
const localData = LocalStorageFilter.getAllDataNeeded();

Object.keys(localData).forEach(key => state = state.set(key, immutable.fromJS(localData[key])));
if (!state.get('currentUser')) {
	state = state.setIn(['modal', 'visible'], true);
	state = state.setIn(['modal', 'type'], 'NameSelection');
}
state = state.set('stars', ReducerLib.calcStars(state));
if (state.get('users').size == 0) {
	state = state.set('modalType','NameSelection');
}

const logger = createLogger({
	timestamp: true,
	duration: true,
	collapsed: true,
	predicate: (getState, action) => true,
	stateTransformer: (state) => state.toJS && state.toJS() || state
});

const createStoreWithMiddleware = applyMiddleware(thunk, logger, LocalStorageMiddleware)(createStore);

export const Store = createStoreWithMiddleware(Reducer, state);

