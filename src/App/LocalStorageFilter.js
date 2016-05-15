import LocalStorageWrapper from './LocalStorageWrapper';
import saveLists from './saveLists';

export default {
	getAllDataNeeded(){

		let prefs = this.getPrefs();
		const currentUser = prefs.currentUser;
		let userData = this.getUserData(currentUser);
		if (!userData || !this.validateUserData(userData)) {
			return {};
		}

		return {
			...prefs,
			...userData
		};
	},

	getPrefs(){
		let prefs;
		try {
			prefs = JSON.parse(LocalStorageWrapper.getItem('prefs'));
		} catch (e) {
			return {...saveLists.emptyPrefs};
		}
		return this.validatePrefs(prefs) ? prefs : {...saveLists.emptyPrefs};
	},

	validatePrefs(prefs){
		if (!prefs){
			return false
		}
		const checkLength = Object.keys(prefs).length == saveLists.prefs.length;
		return checkLength && prefs.users && prefs.currentUser && prefs.users.indexOf(prefs.currentUser) != -1;
	},

	getUserData(currentUser){
		let userData;
		try {
			userData = JSON.parse(LocalStorageWrapper.getItem(currentUser));
		} catch (e) {
			return {...saveLists.emptyUserData};
		}
		return this.validateUserData(userData) ? userData : {...saveLists.emptyUserData};
	},

	validateUserData(userData){
		if (!userData){
			return false
		}
		const checkLength = Object.keys(userData).length == saveLists.userData.length;
		return checkLength && saveLists.userData.every(prop => userData[prop] != undefined);
	}

}
