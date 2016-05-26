import immutable from 'immutable';
import expect from 'expect';
import INITIAL_STATE from '../src/App/INITIAL_STATE'
import ReducerLib from '../src/App/ReducerLib'

describe('ReducerLib:getisDisabled', ()=> {
	it('should get correct on matches', ()=> {
		expect(ReducerLib.isEnabled([1], 1)).toBe(true);
		expect(ReducerLib.isEnabled([1], 10)).toBe(true);
		expect(ReducerLib.isEnabled([1], 11)).toBe(false);

		expect(ReducerLib.isEnabled([3], 2)).toBe(false);
		expect(ReducerLib.isEnabled([3], 3)).toBe(true);

		expect(ReducerLib.isEnabled([2, 3], 21)).toBe(true);
		expect(ReducerLib.isEnabled([2, 3], 27)).toBe(true);
		expect(ReducerLib.isEnabled([2, 3], 22)).toBe(false);
		expect(ReducerLib.isEnabled([2, 3], 31)).toBe(false);
	});
});

describe('ReducerLib:getProblemsNumeric', ()=> {

	let state;

	beforeEach(()=> {
		state = INITIAL_STATE;
	});

	it('should get problems data correctly', ()=> {
		const problems = ReducerLib.getProblemsNumeric([1]);
		expect(problems[0]).toBe('1*1');
		expect(problems[9]).toBe('1*10');
	});

});

describe('ReducerLib:checkAnswer', ()=> {

	let state;

	beforeEach(()=> {
		state = INITIAL_STATE;
	});

	it('should calc correctly', ()=> {
		expect(ReducerLib.checkAnswer('1*1', 1)).toBe(true);
		expect(ReducerLib.checkAnswer('1*1', 2)).toBe(false);
		expect(ReducerLib.checkAnswer('2*2', 4)).toBe(true);
		expect(ReducerLib.checkAnswer('10*1', 10)).toBe(true);
		expect(ReducerLib.checkAnswer('1*10', 10)).toBe(true);
		expect(ReducerLib.checkAnswer('10*10', 10)).toBe(false);
		expect(ReducerLib.checkAnswer('10*10', 100)).toBe(true);
	});

});

describe('ReducerLib:getGameData', ()=> {

	let state;

	beforeEach(()=> {
		state = INITIAL_STATE;
	});

	it('should get level1 data correctly', ()=> {
		let level = ReducerLib.getLevelData('level1', [1]);
		expect(level.problems.length).toBe(10);
		expect(level.problems[0]).toBe('1*1');
		expect(level.problems[9]).toBe('1*10');
		expect(level.grid.length).toBe(100);
		expect(level.grid[0].enabled).toBe(true);
		expect(level.grid[9].enabled).toBe(true);
		expect(level.grid[10].enabled).toBe(false);

		level = ReducerLib.getLevelData('level1', [1, 2]);
		expect(level.problems.length).toBe(20);
		expect(level.problems[0]).toBe('1*1');
		expect(level.problems[19]).toBe('2*10');
		expect(level.grid[10].enabled).toBe(false);
		expect(level.grid[11].enabled).toBe(true);
	});

	it('should get level5 data correctly', ()=> {
		let level = ReducerLib.getLevelData('level5', [1]);
		expect(level.problems.length).toBe(10);
		expect(level.grid.length).toBe(10);
	});

	it('should get grids bigger than 100', ()=> {
		let level = ReducerLib.getLevelData('level1', [11]);
		expect(level.problems.length).toBe(10);
		expect(level.grid.length).toBe(110);
	});

	it('should handle bonus level6', ()=> {
		let level = ReducerLib.getLevelData('level6', [1, 2, 10]);
		expect(level.problems.length).toBe(20);
		expect(level.grid.length).toBe(100);

		level = ReducerLib.getLevelData('level6', [1, 2, 10, 5]);
		expect(level.problems.length).toBe(20);
		expect(level.grid.length).toBe(100);
	});

	it('should handle bonus level7', ()=> {
		let level = ReducerLib.getLevelData('level7', [1, 2, 3, 4]);
		expect(level.problems.length).toBe(30);
		expect(level.grid.length).toBe(100);

		level = ReducerLib.getLevelData('level7', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
		expect(level.problems.length).toBe(30);
		expect(level.grid.length).toBe(120);
	});

	it('should handle bonus level8', ()=> {
		let level = ReducerLib.getLevelData('level8', [1, 2, 3, 4, 5, 6]);
		expect(level.problems.length).toBe(50);
		expect(level.grid.length).toBe(100);

		level = ReducerLib.getLevelData('level8', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
		expect(level.problems.length).toBe(50);
		expect(level.grid.length).toBe(120);
	});

});

describe('ReducerLib:getGameData', ()=> {
	let state;

	beforeEach(()=> {
		state = INITIAL_STATE;
		state = state.set('challengeStars',immutable.fromJS({
			'1_1':1,
			'1_2':2,
			'2_1':3
		}));
	});

	it('should calculate nr of stars', ()=> {
		let stars = ReducerLib.calcStars(state);
		expect(stars).toBe(6);
	});
});

