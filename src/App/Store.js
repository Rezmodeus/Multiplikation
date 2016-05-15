import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import immutable from 'immutable';
import INITIAL_STATE from './INITIAL_STATE';
import Reducer from './Reducer';
import LocalStorageFilter from './LocalStorageFilter';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

// TODO add localStorage data to INITIAL_STATE

export const Store = createStoreWithMiddleware(Reducer, INITIAL_STATE);

