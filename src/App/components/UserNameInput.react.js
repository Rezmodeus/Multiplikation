import React from 'react';
import ReactDOM from 'react-dom';

const MAX_LENGTH = 20;
const ENTER_KEY_CODE = 13;

export default React.createClass({

	onKeyUp(event){
		let val = event.target.value;
		val = val.replace(/[^a-zA-Z]/, '').substring(0, 12);
		this.refs.textArea.value = val;
		this.props.setText(val);
	},

	onKeyDown (event) {
		if (event.keyCode === ENTER_KEY_CODE) {
			if (!event.shiftKey && !event.ctrlKey) {
				event.preventDefault();
				let text = this.refs.textArea.value;
				if (text.trim()) {
				}
			}
		}
	},

	render() {

		return (
			<textarea
				className="name-input"
				placeholder="Skriv in ett nytt namn här"
				ref="textArea"
				rows="1"
				name="message"
				onKeyUp={(event)=>this.onKeyUp(event)}
				maxLength={MAX_LENGTH}
			/>
		);
	}
});

//onKeyDown={(event)=>this.onKeyDown(event)}
//onChange={(event)=>this.onChange(event)}
