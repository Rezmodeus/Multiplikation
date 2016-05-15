import immutable from 'immutable';
import expect from 'expect';
import saveList from '../src/App/saveLists';

describe('saveList: integrity', ()=> {

	it('should have same data prefs and userdata as their empty counterparts', ()=> {
		const test1 = saveList.prefs.every(pref => saveList.emptyPrefs[pref] != undefined);
		const test2 = Object.keys(saveList.emptyPrefs).every(pref => saveList.prefs.indexOf(pref) != -1);

		const test3 = saveList.userData.every(pref => saveList.emptyUserData[pref] != undefined);
		const test4 = Object.keys(saveList.emptyUserData).every(pref => saveList.userData.indexOf(pref) != -1);

		expect(test1).toBe(true);
		expect(test2).toBe(true);
		expect(test3).toBe(true);
		expect(test4).toBe(true);
	});

});
