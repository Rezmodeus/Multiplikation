import React from 'react';
import immutable from 'immutable';
import {Button} from 'react-bootstrap';
import Level1 from './Level1.react';

export default React.createClass({

	render() {
		const challenge = this.props.challenges.get(this.props.currentChallenge);
		const payload = {
			gridToggles: this.props.level.get('gridToggles'),
			gridValues: this.props.level.get('gridValues')
		};

		return (
			<div>
				<Level1 {...payload}/>
				<Button bsStyle="info" bsSize="large" onClick={()=>this.props.backToStart()}>Tillbaks</Button>
			</div>
		)
	}
});
