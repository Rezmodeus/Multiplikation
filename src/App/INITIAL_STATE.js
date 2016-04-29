import immutable from 'immutable';
export default immutable.fromJS({
	a: 0,
	gameState: 'start',
	tiers: [
		[
			{
				name: '1',
				gameType: 'simple',
				tables: [1],
				unlocked: true
			},
			{
				name: '2',
				gameType: 'simple',
				tables: [2],
				unlocked: true
			},
			{
				name: '3',
				gameType: 'simple',
				tables: [3],
				unlocked: true
			},
			{
				name: '4',
				gameType: 'simple',
				tables: [4],
				unlocked: true
			}

		], [
			{
				name: '5',
				gameType: 'simple',
				tables: [5],
				unlocked: true
			}
		]
	]

});