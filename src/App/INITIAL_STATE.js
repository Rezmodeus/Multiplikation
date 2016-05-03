import immutable from 'immutable';
export default immutable.fromJS({
	nr: 0,
	gameState: 'start',
	currentChallenge: '',
	challenges: {
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