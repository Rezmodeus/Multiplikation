import immutable from 'immutable';
import expect from 'expect';
import INITIAL_STATE from '../src/App/INITIAL_STATE'
import ReducerLib from '../src/App/ReducerLib'

describe('ReducerLib:getGridFilter', ()=> {

	let state;

	beforeEach(()=> {
		state = INITIAL_STATE;
	});

	it('should have default size of 100', ()=> {
		const gridFilter = ReducerLib.getGridFilter([1]);
		expect(gridFilter.length).toBe(100);
	});

	it('should filter out correctly when using 1 table', ()=> {
		let gridFilter = ReducerLib.getGridFilter([1]);
		expect(gridFilter.reduce((sum, current)=>current ? sum + 1 : sum, 0)).toBe(10);

		gridFilter = ReducerLib.getGridFilter([5]);
		expect(gridFilter.reduce((sum, current)=>current ? sum + 1 : sum, 0)).toBe(10);
	});

	it('should filter out correctly when using 1 table', ()=> {
		const gridFilter = ReducerLib.getGridFilter([1, 2]);
		expect(gridFilter.reduce((sum, current)=>current ? sum + 1 : sum, 0)).toBe(10 + 5);
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

	it('should get level data correctly', ()=> {
		const level = ReducerLib.getLevelData('level1',[1]);
		expect(level.gridValues.length).toBe(level.gridToggles.length);
	});

});
