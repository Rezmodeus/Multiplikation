import immutable from 'immutable';
import expect from 'expect';
import INITIAL_STATE from '../src/App/INITIAL_STATE'
import Reducer from '../src/App/Reducer'

describe('Reducer:START_CHALLENGE', ()=> {

	let state, action;

	beforeEach(()=> {
		state = INITIAL_STATE;
		action = {type: 'START_CHALLENGE', challenge: 'c1_1'}
	});

	it('should set level data', ()=> {
		expect(state.get('level').size).toBe(0);
		state = Reducer(state, action);
		expect(state.get('level').size > 0).toBe(true);
		expect(state.getIn(['level', 'grid', 0, 'enabled'])).toBe(true);
		expect(state.getIn(['level', 'grid', 99, 'enabled'])).toBe(false);
		expect(state.get('currentChallenge')).toBe(action.challenge);
		expect(state.get('gameState')).toBe('game');
	});

});

describe('Reducer:CHECK_ANSWER', ()=> {

	let state, action;

	beforeEach(()=> {
		state = INITIAL_STATE;
		action = {type: 'START_CHALLENGE', challenge: 'c1_1'}
		state = Reducer(state, action);
		action = {type: 'CHECK_ANSWER', problem: '1*1', answer: '1'}
	});

	it('should set ok', ()=> {
		expect(state.getIn(['level', 'ok'])).toBe('');
		state = Reducer(state, action);
		expect(state.getIn(['level', 'ok'])).toBe('ok');
	});

	it('should set remove', ()=> {
		expect(state.getIn(['level', 'ok'])).toBe('');
		action = {type: 'CHECK_ANSWER', problem: '1*1', answer: '2'}
		state = Reducer(state, action);
		expect(state.getIn(['level', 'ok'])).toBe('remove');
	});

	it('should step problems if correct', ()=> {
		expect(state.getIn(['level', 'currentStep'])).toBe(0);
		state = Reducer(state, action);
		expect(state.getIn(['level', 'currentStep'])).toBe(1);
	});

	it('should not step problems if incorrect', ()=> {
		action = {type: 'CHECK_ANSWER', problem: '1*1', answer: '2'}
		expect(state.getIn(['level', 'currentStep'])).toBe(0);
		state = Reducer(state, action);
		expect(state.getIn(['level', 'currentStep'])).toBe(0);
	});

	it('should reset the answer if correct', ()=> {
		expect(state.getIn(['level', 'currentAnswer'])).toBe('');
		state = Reducer(state, action);
		expect(state.getIn(['level', 'currentAnswer'])).toBe('');
	});

	it('should disable selected answer if correct', ()=> {
		expect(state.getIn(['level', 'grid', 0, 'enabled'])).toBe(true);
		state = Reducer(state, action);
		expect(state.getIn(['level', 'grid', 0, 'enabled'])).toBe(false);
	});

	it('should not disable selected answer if incorrect', ()=> {
		expect(state.getIn(['level', 'grid', 0, 'enabled'])).toBe(true);
		action = {type: 'CHECK_ANSWER', problem: '1*1', answer: '2'}
		state = Reducer(state, action);
		expect(state.getIn(['level', 'grid', 0, 'enabled'])).toBe(true);
	});


});
