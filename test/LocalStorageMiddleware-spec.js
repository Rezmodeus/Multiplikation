import immutable from 'immutable';
import expect from 'expect';
import INITIAL_STATE from '../src/App/INITIAL_STATE';
import Actions from '../src/App/Actions';
import LocalStorageMiddleware  from '../src/App/LocalStorageMiddleware';
import Reducers from '../src/App/Reducer';
import { createStore, applyMiddleware } from 'redux';


describe('LocalStorageMiddleware: changing user', ()=> {
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
				setItemValue = value;
				setItemArr.push([key,value]);
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

	it('should set user', ()=> {
		expect(setItemValue).toBe('');
		Store.dispatch(Actions.setCurrentUser('Amidala'));
		expect(setItemKey).toBe('currentUser');
		expect(setItemValue).toBe('Amidala');
	});

	it('should not set user if same', ()=> {
		expect(setItemValue).toBe('');
		Store.dispatch(Actions.setCurrentUser('Leia'));
		expect(setItemKey).toBe('');
		expect(setItemValue).toBe('');
	});

	it('should change currentUser and set users', ()=> {
		expect(setItemValue).toBe('');
		Store.dispatch(Actions.newUser('John'));
		let keyValue = setItemArr[0]
		expect(keyValue[0]).toBe('currentUser');
		expect(keyValue[1]).toBe('John');

		keyValue = setItemArr[1]
		expect(keyValue[0]).toBe('users');
		expect(JSON.parse(keyValue[1])[2]).toBe('John');
	});

});

	//it('should save when stats have changed', ()=> {
	//	Store.dispatch(Actions.checkAnswer('1*1',1));
	//	expect(setItemKey).toBe('');
	//	expect(setItemValue).toBe('{"textSize":"test","displaySystemMessages":false}');
	//});
	//
	//it('should not update when userPrefernces are not changed', ()=> {
	//	Store.dispatch({
	//		type: 'nothing',
	//		textSize: 'test'
	//	});
	//	expect(setItemKey).toBe('');
	//});
	//
	//it('should save currentMessage when conversation is added', ()=> {
	//	action.conversationState = conversationState;
	//	action.type = AC.RECEIVE_AS_STATE;
	//	action.conversationId = 'a';
	//	Store.dispatch(action);
	//	expect(setItemKey).toBe('a.currentMessage');
	//});
	//
	//it('should save currentMessage when message is changed', ()=> {
	//	action.conversationState = conversationState;
	//	action.type = AC.RECEIVE_AS_STATE;
	//	action.conversationId = 'a';
	//	Store.dispatch(action);
	//
	//	action.type = Ui.SET_CURRENT_MESSAGE
	//	action.conversationId = 'a';
	//	action.msg = 'abc';
	//	Store.dispatch(action);
	//	expect(setItemValue).toBe('abc');
	//});
	//
	//it('should remove messages from local store that are no longer with us', ()=> {
	//	action.conversationState = conversationState;
	//	action.type = AC.RECEIVE_AS_STATE;
	//	action.conversationId = 'a';
	//	Store.dispatch(action);
	//	expect(setItemKey).toBe('a.currentMessage');
	//
	//	action.conversationState = conversationState;
	//	action.type = AC.RECEIVE_AS_STATE;
	//	action.conversationId = 'b';
	//	Store.dispatch(action);
	//	expect(setItemKey).toBe('b.currentMessage');
	//
	//	action = {type: AC.PROCESS_CONVERSATIONS, conversationIds: ['a']};
	//	Store.dispatch(action);
	//	expect(removeItemKey).toBe('b.currentMessage');
	//
	//});
	//
	//it('should add and remove messages', ()=> {
	//	action.conversationState = conversationState;
	//	action.type = AC.RECEIVE_AS_STATE;
	//	action.conversationId = 'a';
	//	Store.dispatch(action);
	//	expect(setItemKey).toBe('a.currentMessage');
	//
	//	action.conversationState = conversationState;
	//	action.type = AC.RECEIVE_AS_STATE;
	//	action.conversationId = 'b';
	//	Store.dispatch(action);
	//	expect(setItemKey).toBe('b.currentMessage');
	//
	//	action = {type: AC.PROCESS_CONVERSATIONS, conversationIds: ['d']};
	//	Store.dispatch(action);
	//	expect(removedItems.length).toBe(2);
	//	expect(removedItems[0]).toBe('a.currentMessage');
	//	expect(removedItems[1]).toBe('b.currentMessage');
	//
	//});


