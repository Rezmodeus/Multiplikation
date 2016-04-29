import React from 'react';
import immutable from 'immutable';
import {Button, Grid, Col, Row} from 'react-bootstrap';

export default React.createClass({

	render() {
		const tiers = this.props.tiers;
		let nr = 0;
		const tree = tiers.map(tier => {
			return (
				<Row key={nr++} className="show-grid">
					{tier.map(challenge => {
						return <Button bsStyle="info" bsSize="small" onClick={()=>console.log()}>{challenge.get('name')}</Button>
					})}
				</Row> )
		});

		return (
			<div>
				<Grid>
					{tree}
				</Grid>
			</div>
		)
	}
});