import React from 'react';

const Drinks = ({drinks}) => (
	<div style={{float: 'right'}}>
		{drinks.map((drink, i) => (
			<span key={i}>{drink.drinkName}</span>,
			<img key={i} src={drink.drinkImageUrl} style={{height: "100px", width: "100px"}}/>)
		)}
	</div>
)


export default Drinks