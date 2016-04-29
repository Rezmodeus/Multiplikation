import React from 'react';
import Start from './App/components/Start.react';
import Game from './App/components/Game.react';
import { connect } from 'react-redux';
require('./less/main.less');
const App = React.createClass({
	render() {
		console.log(this.props)
		return (
			<div>
				<h1>Hello, world.</h1>
				{this.props.gameState == 'start' ?
					<Start tiers={this.props.tiers}/>
					:
					<Game a={this.props.a}/>
				}
			</div>

		);
	}
});

const mapStateToProps = (state) => {
	return {
		a: state.get('a'),
		gameState: state.get('gameState'),
		tiers: state.get('tiers')
	}
};

const mapDispatchToProps = (dispatch) => {
	return {}
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)

