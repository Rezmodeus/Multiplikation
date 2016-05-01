export default {
	startChallenge(challenge){
		return {
			type: 'START_CHALLENGE',
			challenge
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
	}

}
