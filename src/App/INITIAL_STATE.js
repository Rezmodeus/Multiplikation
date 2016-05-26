import immutable from 'immutable';

function getChallenges() {
	const tableStars = [0, 2, 4, 6, 7];
	let obj = {}
	for (let i = 0; i < 60; i++) {
		const chNr = i % tableStars.length;
		const tableNr = Math.floor(i / tableStars.length);
		const id = (tableNr + 1) + '_' + (chNr + 1);
		const requiredStars = tableStars[chNr];
		obj[id] = {
			level: chNr + 1,
			id,
			requiredStars,
			tables: [tableNr + 1]
		}
	}
	return obj;
}


function getChallengeContainers() {
	return Array(12).fill({name: '', challenges: []})
		.map((box, boxIndex) => {
			return {
				name: 'Tabell ' + (boxIndex + 1),
				challenges: Array(5).fill('').map((challenge, challengeIndex) => {
					return (boxIndex + 1) + '_' + (challengeIndex + 1);
				})
			}

		});
}

export default immutable.fromJS({
	stars: 0,
	prevStars: 0,
	gameState: 'start',
	currentChallenge: null,
	stats: {},
	challengeStars: {},
	users: [],
	currentUser: '',
	modalType: '',
	challenges: {
		...getChallenges(),
		'b_1': {
			level: 6,
			id: 'b_1',
			requiredStars: 25,
			tables: [1, 2, 10]
		},
		'b_2': {
			level: 6,
			id: 'b_2',
			requiredStars: 50,
			tables: [3, 4, 5]
		},
		'b_3': {
			level: 6,
			id: 'b_3',
			requiredStars: 75,
			tables: [6, 7, 8, 9]
		},
		'b_4': {
			level: 7,
			id: 'b_4',
			requiredStars: 100,
			tables: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
		},
		'b_5': {
			level: 8,
			id: 'b_5',
			requiredStars: 120,
			tables: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
		}

	},
	challengeContainers: getChallengeContainers(),
	bonusContainer: {
		name: 'Bonus',
		challenges:['b_1','b_2','b_3','b_4','b_5']
	},
	level: {},
	debug: false
});