import React from 'react';
import immutable from 'immutable';
import {Button} from 'react-bootstrap';
import Grid100 from './Grid100.react';

export default React.createClass({

	render() {
		return (
			<Grid100 gridToggles={this.props.gridToggles} gridValues={this.props.gridValues} />
		)
	}
});

