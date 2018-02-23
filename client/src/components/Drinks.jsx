import React from 'react';
import Slider from 'react-slick';
import Description from './Description.jsx'

class Drinks extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			drink: {}
			//show: false
		}
		this.clickHandler = this.clickHandler.bind(this);
	}

	clickHandler(target) {
		if (this.state.drink) {
			this.setState({
				drink:null
			})
		} else {
			this.setState({
				drink: target
			})
		}
	}

	render() {
		console.log("STATEEEEE", this.state.drink)
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

		const overlay = this.state.drink ? <Description drink={this.state.drink} /> : <div></div>

		return (
			<div>
				<Slider {...settings}>
					{this.props.drinks.map((drink, i) =>
						<div key={i} className='slide'>
							<img id={drink.drinkName} src={drink.drinkImageUrl}
								onClick={() => this.clickHandler(drink)} />
							
						</div>
					)}
				</Slider>
				{this.state.show ? <Description drink={this.state.drink} show={this.state.show}/> : <div></div>}
				{overlay}
			</div>
		)
	}
}

export default Drinks
