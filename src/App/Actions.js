export default {

	startChallenge(challenge){
		return {
			type: 'START_CHALLENGE',
			challenge
		}
	},

	restartChallenge(){
		return {
			type: 'RESTART_CHALLENGE'
		}
	},

	backToStart(){
		return {
			type: 'BACK_TO_START'
		}
	},

	checkAnswer(problem, answer, btnNr = 0){
		return {
			type: 'CHECK_ANSWER',
			problem,
			answer,
			btnNr
		}
	},

	addStars(nr){
		return {
			type: 'ADD_STARS',
			nr
		}
	},

	closeModal(){
		return {
			type: 'CLOSE_MODAL'
		}
	},

	setModal(modalType){
		return {
			type: 'SET_MODAL',
			modalType
		}
	},

	setCurrentUser(user, userData){
		return {
			type: 'SET_CURRENT_USER',
			user,
			userData
		}
	},

	newUser(user, userData){
		return {
			type: 'NEW_USER',
			user,
			userData
		}
	}

}
