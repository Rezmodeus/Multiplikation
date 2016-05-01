import React from 'react';
import immutable from 'immutable';
import {Button} from 'react-bootstrap';
import Grid100 from './Grid100.react';

export default React.createClass({

	render() {
		return (
			<div>
				<h1>{this.props.currentProblem}={this.props.currentAnswer}</h1>
				<Grid100 level={this.props.level} />
			</div>
		)
	}
});

//<Grid100 gridToggles={this.props.gridToggles} gridValues={this.props.gridValues}/>
