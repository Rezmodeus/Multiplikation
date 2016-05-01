export default {

	isEnabled(tables, value){
		return tables.some(t => value % t == 0 && value <= t * 10)
	},

	getProblemsNumeric(tables){
		return tables.reduce((arr, table) => arr.concat(Array(10).fill(0).map((dummy, index) => table + '*' + (index + 1))), []);
	},

	checkAnswer(problem, answer){
		const a = problem.split('*');
		return parseInt(a[0]) * parseInt(a[1]) == answer;
	},

	getLevelData(gameLevel, tables){
		let level = {
			problemNr: 0,
			currentProblem: '',
			currentAnswer: '',
			grid: Array(100).fill({}),
			problems: []
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
		}
		return level;
	}

}
