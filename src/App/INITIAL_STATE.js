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
function getChallenges() {
	const tableStars = [0, 2, 4, 6, 7];
	let obj = {}
	for(let i=0;i<60;i++){
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
				challenges: Array(5).fill('').map( (challenge, challengeIndex) => {
					return (boxIndex + 1)+'_'+(challengeIndex + 1);
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
	challenges: getChallenges(),
	challengeContainers: getChallengeContainers(),
	level: {},
	debug: false
});