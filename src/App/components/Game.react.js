import React from 'react';
import immutable from 'immutable';
import {Button} from 'react-bootstrap';

export default React.createClass({

	render() {

		return (
			<Button bsStyle="info" bsSize="small" onClick={()=>console.log(this.props.a)} >Game</Button>
		)
	}
});
