import React from 'react';
import Slider from 'react-slick';
import Description from './Description.jsx'

class Drinks extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			drink : {}
		}
		this.clickHandler = this.clickHandler.bind(this);
	}
	
	clickHandler(target) {
		this.setState({
			drink: target
		})
	}

	render() {
		var settings = {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 3000,
			fade: true,
			arrows: false,
			useCSS: true
		};

		const overlay = this.state.drink? <Description drink={this.state.drink}/> : null

		return (
			
			<Slider {...settings} >
				{this.props.drinks.map((drink, i) =>
					<div key={i} className='slide'>
						<img id={drink.drinkName} src={drink.drinkImageUrl} style={{ height: "850", width: "800", borderRadius: '5%' }}
								 onClick={() => this.clickHandler(drink)}/>
					</div>
				)}
				{overlay}
			</Slider>
		)
	}
}

export default Drinks
