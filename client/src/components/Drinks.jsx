import React from 'react';
import Slider from 'react-slick';

var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
};

const Drinks = ({drinks}) =>
(
	<Slider {...settings}>
		{drinks.map((drink, i) =>
			<div>
				<img key={i} src={drink.drinkImageUrl} style={{height: "500px", width: "500px"}}/>
			</div>
		)}
	</Slider>
)

export default Drinks
