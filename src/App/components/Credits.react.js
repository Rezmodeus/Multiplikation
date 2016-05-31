import React from 'react';

export default React.createClass({
	getInitialState(){
		return ({barnen: ['Hedda', 'Smilla', 'Iris'], positions: [0, 20, 40],xPos:50});
	},
	componentDidMount(){
		setInterval(()=>{
			let positions = this.state.positions;
			positions.sort(() => 0.5 - Math.random());
			this.setState({positions});
		},2000);
	},

	render() {
		const barnen = this.state.barnen.map((barn, index) => {
			const style = {
				transform: `translate3d(${this.state.xPos}px,${this.state.positions[index]}px,0)`
			};
			return <p className="barn" key={index} style={style}>{barn}</p>
		});
		return (
			<div className="credits">
				<p >Made by Anders Corlin</p>
				<p>Tillägnat mina barn</p>
				{barnen}
			</div>
		)
	}
});

