import immutable from 'immutable';
import expect from 'expect';
import INITIAL_STATE from '../src/App/INITIAL_STATE';
import saveList from '../src/App/saveLists';
import LocalStorageFilter  from '../src/App/LocalStorageFilter';

describe('LocalStorageFilter: retrieve data', ()=> {
	let getItems;

	beforeEach(()=> {
		getItems = {};
		LocalStorageFilter.__Rewire__('LocalStorageWrapper', {
			setItem: (key, value) => {
			},
			removeItem: (key)=> {
			},
			getItem(key){
				return JSON.stringify(getItems[key]);
			}
		});

	});

	afterEach(function () {
		LocalStorageFilter.__ResetDependency__('LocalStorageWrapper');
	});

	it('should get prefs if data is valid', ()=> {
		getItems = {prefs:{currentUser:'Arnold',users:['Jesper','Arnold','Mira']}};
		const prefs = LocalStorageFilter.getPrefs();
		expect(prefs.currentUser).toBe('Arnold');
	});


	it('should get empty prefs if data is not valid', ()=> {
		getItems = {prefs:{currentUser:'Arnold',users:['Jesper','Mira']}};
		let prefs = LocalStorageFilter.getPrefs();
		expect(prefs.currentUser).toBe('');
		expect(prefs.users.length).toBe(0);

		getItems = {prefs:{users:['Jesper','Mira']}};
		prefs = LocalStorageFilter.getPrefs();
		expect(prefs.currentUser).toBe('');
		expect(prefs.users.length).toBe(0);

		getItems = {prefs:{currentUser:'Arnold'}};
		prefs = LocalStorageFilter.getPrefs();
		expect(prefs.currentUser).toBe('');
		expect(prefs.users.length).toBe(0);

		getItems = {prefs:{currentUser:'Arnold',users:['Jesper','Arnold','Mira'], bogusData:{}}};
		prefs = LocalStorageFilter.getPrefs();
		expect(prefs.currentUser).toBe('');
		expect(prefs.users.length).toBe(0);

	});

	it('should get userData if data is valid', ()=> {
		getItems = {Jonas:{challengeStars: {a:0}, stats: {b:0}, prevStars:4}};
		const userData = LocalStorageFilter.getUserData('Jonas');
		expect(userData.challengeStars.a).toBe(0);
		expect(userData.stats.b).toBe(0);
		expect(userData.prevStars).toBe(4);
	});

	it('should get empty userData if wrong data is accessed', ()=> {
		getItems = {Jonas:{challengeStars: {a:0}, stats: {b:0}, prevStars:4}};
		const userData = LocalStorageFilter.getUserData('bob');
		expect(Object.keys(userData.challengeStars).length).toBe(0);
		expect(Object.keys(userData.stats).length).toBe(0);
		expect(userData.prevStars).toBe(0);
	});

	it('should get empty userData when data is not valid', ()=> {
		let userData;

		getItems = {Jonas:{stats: {b:0}, prevStars:4}};
		userData = LocalStorageFilter.getUserData('Jonas');
		expect(Object.keys(userData.challengeStars).length).toBe(0);
		expect(Object.keys(userData.stats).length).toBe(0);
		expect(userData.prevStars).toBe(0);
		expect(Object.keys(userData).length).toBe(saveList.userData.length);

		getItems = {Jonas:{challengeStars: {a:0}, prevStars:4}};
		userData = LocalStorageFilter.getUserData('Jonas');
		expect(Object.keys(userData.challengeStars).length).toBe(0);
		expect(Object.keys(userData.stats).length).toBe(0);
		expect(userData.prevStars).toBe(0);
		expect(Object.keys(userData).length).toBe(saveList.userData.length);

		getItems = {Jonas:{challengeStars: {a:0}, stats: {b:0}}};
		userData = LocalStorageFilter.getUserData('Jonas');
		expect(Object.keys(userData.challengeStars).length).toBe(0);
		expect(Object.keys(userData.stats).length).toBe(0);
		expect(userData.prevStars).toBe(0);
		expect(Object.keys(userData).length).toBe(saveList.userData.length);

		getItems = {Jonas:{}};
		userData = LocalStorageFilter.getUserData('Jonas');
		expect(Object.keys(userData.challengeStars).length).toBe(0);
		expect(Object.keys(userData.stats).length).toBe(0);
		expect(userData.prevStars).toBe(0);
		expect(Object.keys(userData).length).toBe(saveList.userData.length);

		// check for injected data
		getItems = {Jonas:{challengeStars: {a:0}, stats: {b:0}, prevStars:4, someBogusData:[]}};
		userData = LocalStorageFilter.getUserData('Jonas');
		expect(Object.keys(userData).length).toBe(saveList.userData.length);

	});

});

