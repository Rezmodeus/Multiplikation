import immutable from 'immutable';
import ReducerLib from './ReducerLib';
export default function(state,action){
	switch(action.type){
		case 'START_CHALLENGE':
			const {challenge} = action;
			const ch = state.getIn(['challenges',challenge]);
			const tables = ch.get('tables').toJS();
			const data = ReducerLib.getLevelData(ch.get('leveType'),tables);
			state = state.set('currentChallenge',challenge);
			state = state.set('gameState','game');
			state = state.set('level',immutable.fromJS(data));
			return state;
		case 'BACK_TO_START':
			state = state.set('gameState','start');
			return state;
		default:
			return state;

	}
}