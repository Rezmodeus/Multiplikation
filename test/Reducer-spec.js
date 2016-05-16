import immutable from 'immutable';
import expect from 'expect';
import INITIAL_STATE from '../src/App/INITIAL_STATE'
import Reducer from '../src/App/Reducer'
import saveLists from '../src/App/saveLists';

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

	function runAnswers(answers) {
		const problems = ['1*1', '1*2', '1*3', '1*4', '1*5', '1*6', '1*7', '1*8', '1*9', '1*10'];
		let nr = 0;
		answers.forEach( answer => {
			action = {type: 'CHECK_ANSWER', problem: problems[nr], answer: answer};
			state = Reducer(state, action);
			const a = problems[nr].split('*');
			nr += (parseInt(a[0]) * parseInt(a[1]) == answer) ? 1 : 0;
		});
	}

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

	it('should activate Win1Star modal when level is completed without errors', ()=> {
		expect(state.get('modalType')).toBe('');
		runAnswers([1,2,3,4,5,6,7,8,9,9,10]);
		expect(state.get('modalType')).toBe('Win1Star');
	});

	it('should activate Win2Star modal when level is completed without errors', ()=> {
		expect(state.get('modalType')).toBe('');
		runAnswers([1,2,3,4,5,6,7,8,9,10]);
		expect(state.get('modalType')).toBe('Win2Star');
	});

	it('should add 1 stars for ok score to challengeStars', ()=> {
		runAnswers([1,2,3,4,5,6,7,8,9,9,10]);
		const stars = state.getIn(['challengeStars','1_1']);
		expect(stars).toBe(1);
	});

	it('should add 2 stars for perfect score to challengeStars', ()=> {
		runAnswers([1,2,3,4,5,6,7,8,9,10]);
		const stars = state.getIn(['challengeStars','1_1']);
		expect(stars).toBe(2);
	});

	it('should add stars when challenge is ok', ()=> {
		runAnswers([1,2,3,4,5,6,7,8,9,9,10]);
		const stars = state.get('stars');
		expect(stars).toBe(1);
	});

	it('should add stars when challenge is perfect', ()=> {
		runAnswers([1,2,3,4,5,6,7,8,9,10]);
		const stars = state.get('stars');
		expect(stars).toBe(2);
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

describe('CLOSE_MODAL', ()=> {

	let state, action;

	beforeEach(()=> {
		state = INITIAL_STATE;
		action = {type: 'CLOSE_MODAL'}
	});

	it('should close modal', ()=> {
		expect(state.get('modalType')).toBe('');
		state = Reducer(state, action);
		expect(state.get('modalType')).toBe('');

		state = state.set('modalType', 'test');
		expect(state.get('modalType')).toBe('test');
		state = Reducer(state, action);
		expect(state.get('modalType')).toBe('');
	});
});
describe('RESTART_CHALLENGE', ()=> {

	let state, action;

	beforeEach(()=> {
		state = INITIAL_STATE;
		action = {type: 'START_CHALLENGE', challenge: '1_1'}
		state = Reducer(state, action);
		action = {type: 'RESTART_CHALLENGE'}
	});

	it('should restart challenge with same level', ()=> {
		const prevState = state;
		state = Reducer(state, action);
		//expect(immutable.is(state,prevState)).toBe(true);
	});
});

describe('SET_CURRENT_USER', ()=> {

	let state, action;

	beforeEach(()=> {
		state = INITIAL_STATE;
		state = state.set('users', immutable.fromJS([
			'Leia', 'Amidala'
		]));
		action = {type: 'SET_CURRENT_USER', user: '', userData:saveLists.emptyUserData}
	});

	it('should set user if it exists in users', ()=> {
		// non existing user
		action.user = 'John'
		state = Reducer(state, action);
		expect(state.get('currentUser')).toBe('');

		action.user = 'Amidala'
		state = Reducer(state, action);
		expect(state.get('currentUser')).toBe('Amidala');
	});
});

describe('NEW_USER', ()=> {
	let state, action;

	beforeEach(()=> {
		state = INITIAL_STATE;
		state = state.set('users', immutable.fromJS([
			'Leia', 'Amidala'
		]));
		action = {type: 'NEW_USER', user: ''}
	});

	it('should add user and set current user', ()=> {
		action.user = 'John'
		state = Reducer(state, action);
		expect(state.get('currentUser')).toBe('John');
		expect(state.get('users').size).toBe(3);

	});
});

describe('SET_MODAL', ()=> {
	let state, action;

	beforeEach(()=> {
		state = INITIAL_STATE;
		action = {type: 'SET_MODAL', modalType: ''}
	});

	it('should set NameSelection modal', ()=> {
		action.modalType = 'NameSelection';
		expect(state.get('modalType')).toBe('');
		state = Reducer(state, action);
		expect(state.get('modalType')).toBe('NameSelection')
	});
});
