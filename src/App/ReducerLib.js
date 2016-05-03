export default {

	isEnabled(tables, value){
		return tables.some(t => value % t == 0 && value <= t * 10)
	},

	getProblemsNumeric(tables){
		return tables.reduce((arr, table) => arr.concat(Array(10).fill(0).map((dummy, index) => table + '*' + (index + 1))), []);
	},

	getProblemsRandom(tables){
		return this.getProblemsNumeric(tables).sort(() => 0.5 - Math.random());
	},

	getProblemsRandomRotated(tables){
		return this.getProblemsNumeric(tables).sort(() => 0.5 - Math.random()).map(str => str.split('*').sort(() => 0.5 - Math.random()).join('*'));
	},

	checkAnswer(problem, answer){
		const a = problem.split('*');
		return parseInt(a[0]) * parseInt(a[1]) == answer;
	},

	getLevelData(gameLevel, tables){
		let level = {
			problemNr: 0,
			currentStep: 0,
			currentAnswer: '',
			problems: [],
			score: 0,
			ok: ''
		};
		switch (gameLevel) {
			case 'level1':
				level.grid = Array(100).fill({}).map((obj, index) => {
					return {
						value: index + 1,
						enabled: this.isEnabled(tables, index + 1)
					}
				});
				level.problems = this.getProblemsNumeric(tables);
				break;

			case 'level2':
				level.grid = Array(100).fill({}).map((obj, index) => {
					return {
						value: index + 1,
						enabled: true
					}
				});
				level.problems = this.getProblemsNumeric(tables);
				break;

			case 'level3':
				level.grid = Array(100).fill({}).map((obj, index) => {
					return {
						value: index + 1,
						enabled: this.isEnabled(tables, index + 1)
					}
				});
				level.problems = this.getProblemsRandom(tables);
				break;

			case 'level4':
				level.grid = Array(100).fill({}).map((obj, index) => {
					return {
						value: index + 1,
						enabled: true
					}
				});
				level.problems = this.getProblemsRandomRotated(tables);
				break;

			case 'level5':
				level.grid = this.getProblemsRandomRotated(tables).map((problem, index) => {
					return {
						value: problem,
						enabled: true
					}
				});
				level.problems = tables.reduce((arr, table) => arr.concat(Array(10).fill(0).map((dummy, index) => (index + 1) * table)), []);
				break;
		}
		return level;
	}

}
