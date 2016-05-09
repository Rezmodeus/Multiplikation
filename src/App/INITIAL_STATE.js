import immutable from 'immutable';

function getStandardChallenges() {
	const challengesPerTable = 5;
	const tableStars = [0, 2, 4, 6, 7];
	const starsAdd = 4;
	const challenges = Array(100).fill({})
		.map((challenge, index) => {
			const chNr = index % tableStars.length;
			const tableNr = Math.floor(index / challengesPerTable);
			const id = (tableNr + 1) + '_' + (chNr + 1);
			const requiredStars = tableStars[chNr] + (starsAdd * tableNr);
			return {
				level: chNr + 1,
				id,
				requiredStars,
				stars: 0,
				tables: [tableNr + 1]
			}

		});
	return challenges;
}

export default immutable.fromJS({
	stars: 0,
	prevStars: 0,
	nr: 0,
	gameState: 'start',
	currentChallenge: null,
	modal: {
		visible: false,
		type:'',
		text:''
	},
	challenges: getStandardChallenges(),
	challenges_old: {
		c1_1: {
			name: 'Nivå 1',
			levelType: 'level1',
			tables: [1],
			unlocked: true,
			unlocks: ['c1_2']
		},

		c1_2: {
			name: 'Nivå 2',
			levelType: 'level2',
			tables: [1],
			unlocked: true,
			unlocks: []
		},

		c1_3: {
			name: 'Nivå 3',
			levelType: 'level3',
			tables: [1],
			unlocked: true,
			unlocks: []
		},

		c1_4: {
			name: 'Nivå 4',
			levelType: 'level4',
			tables: [1],
			unlocked: true,
			unlocks: []
		},

		c1_5: {
			name: 'Nivå 5',
			levelType: 'level5',
			tables: [1],
			unlocked: true,
			unlocks: []
		},

		c2_1: {
			name: 'Nivå 1',
			levelType: 'level1',
			tables: [2],
			unlocked: false,
			unlocks: ['c2_2']
		},

		c2_2: {
			name: 'Nivå 2',
			levelType: 'level2',
			tables: [2],
			unlocked: false,
			unlocks: []
		}
	},
	level: {}
});