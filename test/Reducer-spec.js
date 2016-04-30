import immutable from 'immutable';
import expect from 'expect';
import INITIAL_STATE from '../src/App/INITIAL_STATE'
import Reducer from '../src/App/Reducer'

describe('Reducer', ()=> {

	let state, action;

	beforeEach(()=> {
		state = INITIAL_STATE;
		action = {type:'START_CHALLENGE', challenge:'c1_1'}
	});

	it('shuld set level data', ()=> {
		expect(state.get('level').size).toBe(0);
		state = Reducer(state,action);
		expect(state.get('level').size>0).toBe(true);
		expect(state.get('currentChallenge')).toBe(action.challenge);
		expect(state.get('gameState')).toBe('game');
	});

});
