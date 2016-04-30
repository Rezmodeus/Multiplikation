export default {

	getGridValues(){
		let a = [];
		for(let i = 1;i<=100;i++){
			a.push(i);
		}
		return a;
	},
	getGridFilter(tables, gridSize = 101){
		const a = Array(gridSize).fill(false);
		let mapped = a.map((val, index) => tables.some(t => index % t == 0 && index <= t * 10));
		mapped.shift();
		return mapped;
	},

	checkAnswer(calcStr, answer){
		const a = calcStr.split('*');
		return parseInt(a[0]) * parseInt(a[1]) == answer;
	},

	getLevelData(gameLevel,tables){
		let level ={
			currentProblem:'',
			currentAnswer:''
		};
		switch(gameLevel){
			case 'level1':
				level.gridValues = this.getGridValues();
				level.gridToggles = this.getGridFilter(tables);
				break;
		}
		return level;
	}

}
