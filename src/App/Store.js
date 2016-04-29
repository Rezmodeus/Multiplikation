import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import immutable from 'immutable';
import INITIAL_STATE from './INITIAL_STATE';
import Reducer from './Reducer';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

export const Store = createStoreWithMiddleware(Reducer, INITIAL_STATE);

