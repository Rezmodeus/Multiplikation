import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import immutable from 'immutable';
import INITIAL_STATE from './INITIAL_STATE';
import Reducer from './Reducer';
import LocalStorageFilter from './LocalStorageFilter';
import LocalStorageMiddleware from './LocalStorageMiddleware';


let state = INITIAL_STATE;
const localData = LocalStorageFilter.getAllDataNeeded();

Object.keys(localData).forEach( key =>  state = state.set(key, immutable.fromJS(localData[key])));
if (!state.get('currentUser')){
	state = state.setIn(['modal','visible'], true);
	state = state.setIn(['modal','type'], 'NameSelection');
}
const createStoreWithMiddleware = applyMiddleware(thunk, LocalStorageMiddleware)(createStore);

export const Store = createStoreWithMiddleware(Reducer, state);

