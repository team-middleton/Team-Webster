import React from 'react';
import Slider from 'react-slick';
import Description from './Description.jsx'

// This component renders the drink slideshow
class Drinks extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			drink: {}
		}
		this.clickHandler = this.clickHandler.bind(this);
	}

	
 
	clickHandler(target) {
		if (this.state.drink) {
			this.setState({
				drink: null
			})
		} else {
			this.setState({
				drink: target
			})
		}
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
		
		// This conditionally renders the desciption of each drink.
		

		console.log('drinks ', this.props.drinks);
		return (
			<div>
				<h1>Mix a cocktail...</h1>
				<div  className="drinkSlider" >
					<Slider {...settings} >
						{this.props.drinks.map((drink, i) =>
							<div key={i} className='slide'  >
								<img id={drink.drinkName} src={drink.drinkImageUrl}
									onClick={() => this.clickHandler(drink)} className="drinkImage"/>
									<Description drink={this.props.drinks[i]} className="drinkDescription" />
							</div>
						)}
					</Slider>
					
					
				</div>
			</div>
		)
	}
}

export default Drinks

// style={{ height: `400px` }} 
// const overlay = this.state.drink ? <Description drink={this.state.drink} /> : null
// {overlay}
// {this.state.show ? <Description drink={this.state.drink} show={this.state.show}/> : <div></div>}