import immutable from 'immutable';
import expect from 'expect';
import INITIAL_STATE from '../src/App/INITIAL_STATE';
import Actions from '../src/App/Actions';
import LocalStorageMiddleware  from '../src/App/LocalStorageMiddleware';
import Reducers from '../src/App/Reducer';
import { createStore, applyMiddleware } from 'redux';
import saveList from '../src/App/saveLists';

describe('LocalStorageMiddleware: save data', ()=> {
	let action = {};
	let createStoreWithMiddleware;
	let Store;
	let setItemKey, setItemValue, removeItemKey, removedItems, getItemKey;
	let setItemArr;

	beforeEach(()=> {
		removedItems = [];
		setItemKey = '';
		setItemValue = '';
		getItemKey  = '';
		setItemArr = [];
		LocalStorageMiddleware.__Rewire__('LocalStorageWrapper', {
			setItem: (key, value) => {
				setItemKey = key;
				setItemValue = JSON.parse(value);
				setItemArr.push([key,setItemValue]);
			},
			removeItem: (key)=> {
				removeItemKey = key;
				removedItems.push(key);
			},
			getItem(key){
				getItemKey = key;
			}
		});

		createStoreWithMiddleware = applyMiddleware(LocalStorageMiddleware)(createStore);
		let state = INITIAL_STATE;
		state = state.set('users', immutable.fromJS([
			'Leia','Amidala'
		]));
		state = state.set('currentUser','Leia');

		Store = createStoreWithMiddleware(Reducers, state);
		//Store.dispatch(Actions.startChallenge('1_1'));
	});

	afterEach(function () {
		LocalStorageMiddleware.__ResetDependency__('LocalStorageWrapper');
	});

	it('should save when currentUser has changed', ()=> {
		expect(setItemValue).toBe('');
		Store.dispatch(Actions.setCurrentUser('Amidala',saveList.emptyUserData));
		expect(setItemArr[0][1].currentUser).toBe('Amidala')
		expect(setItemArr.length).toBe(1)
	});

	it('should not save if currentUser has not changed', ()=> {
		expect(setItemValue).toBe('');
		Store.dispatch(Actions.setCurrentUser('Leia',saveList.emptyUserData));
		expect(setItemKey).toBe('');
		expect(setItemValue).toBe('');
		expect(setItemArr.length).toBe(0)
	});

	it('should change currentUser and set users', ()=> {
		expect(setItemValue).toBe('');
		Store.dispatch(Actions.newUser('John',saveList.emptyUserData));
		let keyValue = setItemArr[0]
		expect(setItemArr[0][1].currentUser).toBe('John')
		expect(setItemArr[0][1].users[2]).toBe('John')
		expect(setItemArr.length).toBe(1)
	});

	it('should save when stats update', ()=> {
		// TODO
	});

	it('should save when challengeStars update', ()=> {
		// TODO
	});

});

