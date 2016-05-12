export default {
	setItem(key, value){
		localStorage.setItem(key,value);
	},

	removeItem(key, value){
		localStorage.removeItem(key);
	},

	getItem(key){
		return localStorage.getItem(key);
	}
}
