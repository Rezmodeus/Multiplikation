import React from 'react';
import immutable from 'immutable';
import {Button} from 'react-bootstrap';
import Level1 from './Level1.react';

export default React.createClass({

	render() {
		return (
			<div>
				<Level1 {...this.props}/>
				<Button bsStyle="info" bsSize="large" onClick={()=>this.props.backToStart()}>Tillbaks</Button>
			</div>
		)
	}
});
