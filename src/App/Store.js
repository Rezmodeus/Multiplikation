import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import immutable from 'immutable';
import INITIAL_STATE from './INITIAL_STATE';
import Reducer from './Reducer';
import LocalStorageFilter from './LocalStorageFilter';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

let state = INITIAL_STATE;
const localData = LocalStorageFilter.getAllDataNeeded();

Object.keys(localData).forEach( key =>  state = state.set(key, immutable.fromJS(localData[key])));
if (!state.get('currentUser')){


}

export const Store = createStoreWithMiddleware(Reducer, state);

