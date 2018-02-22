import React from 'react';

const Description = (props) => (
	<div className='description' style={{borderRadius: '5%', overflow: 'hidden'}}>
		<p className='description_content'>{props.drink.drinkName}</p>
		<br />
		<p className='description_content'>{props.drink.ingredient}</p>
		<br />
		<p className='description_content'>{props.drink.drinkInstruction}</p>
	</div>
)

export default Description