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

	checkAnswer(problem, answer){
		return {
			type: 'CHECK_ANSWER',
			problem,
			answer
		}
	},

	addStars(nr){
		return {
			type: 'ADD_STARS',
			nr
		}
	}

}
