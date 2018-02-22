import React from 'react';
import Slider from 'react-slick';

var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 3000,
			fade: true,
			arrows: false
};

const Drinks = ({drinks}) =>
(
	<Slider className = "slider" {...settings}>
		{drinks.map((drink, i) =>
			<div >
				<img className = "ui image container" key={i} src={drink.drinkImageUrl} style={{height: "850", width: "800", borderRadius: '5%'}}/>
			</div>
		)}
	</Slider>
)

export default Drinks
