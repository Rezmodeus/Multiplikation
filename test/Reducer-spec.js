import immutable from 'immutable';
import expect from 'expect';
import INITIAL_STATE from '../src/App/INITIAL_STATE'
import Reducer from '../src/App/Reducer'

describe('START_CHALLENGE', ()=> {

	let state, action;

	beforeEach(()=> {
		state = INITIAL_STATE;
		action = {type: 'START_CHALLENGE', challenge: '1_1'}
	});

	it('should set level data', ()=> {
		expect(state.get('level').size).toBe(0);
		state = Reducer(state, action);
		expect(state.get('level').size > 0).toBe(true);
		expect(state.getIn(['level', 'grid', 0, 'enabled'])).toBe(true);
		expect(state.getIn(['level', 'grid', 99, 'enabled'])).toBe(false);
		expect(state.getIn(['currentChallenge', 'id'])).toBe(action.challenge);
		expect(state.get('gameState')).toBe('game');
	});

});

describe('CHECK_ANSWER', ()=> {

	let state, action;

	beforeEach(()=> {
		state = INITIAL_STATE;
		action = {type: 'START_CHALLENGE', challenge: '1_1'};
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
		action = {type: 'CHECK_ANSWER', problem: '1*1', answer: '2'};
		state = Reducer(state, action);
		expect(state.getIn(['level', 'ok'])).toBe('remove');
	});

	it('should step problems if correct', ()=> {
		expect(state.getIn(['level', 'currentStep'])).toBe(0);
		state = Reducer(state, action);
		expect(state.getIn(['level', 'currentStep'])).toBe(1);
	});

	it('should not step problems if incorrect', ()=> {
		action = {type: 'CHECK_ANSWER', problem: '1*1', answer: '2'};
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
		action = {type: 'CHECK_ANSWER', problem: '1*1', answer: '2'};
		state = Reducer(state, action);
		expect(state.getIn(['level', 'grid', 0, 'enabled'])).toBe(true);
	});

	it('should add items to history', ()=> {
		action = {type: 'CHECK_ANSWER', problem: '1*1', answer: '1'};
		state = Reducer(state, action);
		expect(state.getIn(['level', 'history']).last().get('value')).toBe('1×1 = 1');
	});

	it('should activate modal when level is done', ()=> {
		state = state.setIn(['level', 'currentStep'],9);
		action = {type: 'CHECK_ANSWER', problem: '1*10', answer: '10'};
		expect(state.getIn(['modal', 'visible'])).toBe(false);
		state = Reducer(state, action);
		expect(state.getIn(['modal', 'visible'])).toBe(true);
	});

	it('should not step currentstep beyond end of problems', ()=> {
		state = state.setIn(['level', 'currentStep'],9);
		action = {type: 'CHECK_ANSWER', problem: '1*10', answer: '10'};

		expect(state.getIn(['level', 'currentStep'])).toBe(9);
		state = Reducer(state, action);
		expect(state.getIn(['level', 'currentStep'])).toBe(9);
	});

});

describe('ADD_STARS', ()=> {

	let state, action;

	beforeEach(()=> {
		state = INITIAL_STATE;
		action = {type: 'ADD_STARS', nr: 1}
	});

	it('should add star', ()=> {
		expect(state.get('stars')).toBe(0);
		expect(state.get('prevStars')).toBe(0);
		state = Reducer(state, action);

		expect(state.get('prevStars')).toBe(0);
		expect(state.get('stars')).toBe(1);

		state = Reducer(state, action);
		expect(state.get('prevStars')).toBe(1);
	});

	it('should add stars', ()=> {
		expect(state.get('stars')).toBe(0);
		expect(state.get('prevStars')).toBe(0);
		action.nr = 2;
		state = Reducer(state, action);

		expect(state.get('prevStars')).toBe(0);
		expect(state.get('stars')).toBe(2);

		state = Reducer(state, action);
		expect(state.get('prevStars')).toBe(2);
	});
});

describe('ADD_STARS', ()=> {

	let state, action;

	beforeEach(()=> {
		state = INITIAL_STATE;
		action = {type: 'CLOSE_MODAL'}
	});

	it('should close modal', ()=> {
		expect(state.getIn(['modal', 'visible'])).toBe(false);
		state = Reducer(state, action);
		expect(state.getIn(['modal', 'visible'])).toBe(false);

		state = state.setIn(['modal','visible'],true);
		expect(state.getIn(['modal', 'visible'])).toBe(true);
		state = Reducer(state, action);
		expect(state.getIn(['modal', 'visible'])).toBe(false);
	});
});

