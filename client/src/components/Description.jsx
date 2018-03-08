import React from 'react';

// This component renders the descriptions of each drink.

class Description extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			show: true
		}
	}

	render() {
		if(this.props.drink.ingredient[0] === 'N/A') {
			var ingredient = null;
		} else {
			var ingredient = <p className='description_content'>{this.props.drink.ingredient}</p>
		}
		
		return (
			<div className='description'>
				<p className='description_content'>{this.props.drink.drinkName}</p>
				<br />
				{ingredient}
				<br />
				<p className='description_content'>{this.props.drink.drinkInstruction}</p>
			</div>
		)
	}
}


export default Description
