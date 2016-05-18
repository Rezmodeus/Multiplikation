import immutable from 'immutable';

function getStandardChallenges() {
	const challengesPerTable = 5;
	const tableStars = [0, 2, 4, 6, 7];
	const starsAdd = 6;
	return Array(100).fill({})
		.map((challenge, index) => {
			const chNr = index % tableStars.length;
			const tableNr = Math.floor(index / challengesPerTable);
			const id = (tableNr + 1) + '_' + (chNr + 1);
			const requiredStars = tableStars[chNr] + (starsAdd * tableNr);
			return {
				level: chNr + 1,
				id,
				requiredStars,
				tables: [tableNr + 1]
			}

		});
}

export default immutable.fromJS({
	stars: 0,
	prevStars: 0,
	nr: 0,
	gameState: 'start',
	currentChallenge: null,
	stats:{},
	challengeStars:{},
	users:[],
	currentUser:'',
	modalType:'',
	challenges: getStandardChallenges(),
	level: {}
});