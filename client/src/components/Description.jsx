import React from 'react';


class Description extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			show: true
		}
	}

	
	render() {
		return (
			<div className='description' style={{ borderRadius: '5%' }} > 
				<p className='description_content'>{this.props.drink.drinkName}</p>
				<br />
				<p className='description_content'>{this.props.drink.ingredient}</p>
				<br />
				<p className='description_content'>{this.props.drink.drinkInstruction}</p>
			</div>
		)
	}
}


export default Description