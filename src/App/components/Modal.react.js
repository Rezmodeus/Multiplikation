import React from 'react';
import immutable from 'immutable';
import {Modal, Button} from 'react-bootstrap';

export default React.createClass({

	render() {
		const visible = this.props.modal.get('visible');
		const modalInstance = (
			<div className="static-modal">
				<Modal show={visible} onClick={this.props.closeModal}>
					<Modal.Header>
						<Modal.Title>Modal title</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						One fine body...
					</Modal.Body>

					<Modal.Footer>
						<Button bsStyle="primary" onClick={this.props.closeModal}>OK</Button>
					</Modal.Footer>
				</Modal>
			</div>
		);
		return (
			<div>
				{visible ? modalInstance : null}
			</div>
		)
	}
});

