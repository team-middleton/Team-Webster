import React from 'react';
import axios from 'axios';
import Drinks from './Drinks.jsx'

class Dropdown extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			selectedCategory: '',
			alcohols: [],
			drinks: []
		}
		this.changeCategory = this.changeCategory.bind(this);
		this.getAlcohols = this.getAlcohols.bind(this);
	}

	//making post request to server
	getAlcohols() {
		axios.post('/drinks', {alcohols: this.state.alcohols})
		.then((response) => {
			this.setState({
				drinks: response.data
			})
			console.log('CLIENT SIDE DATA', response.data);
		})
		.catch((err) => {
			console.log(err);
		})
	}

	//setting alcohols based on selected category
	settingAlcohols(category) {
		if (category === 'party') {
			this.setState({
				alcohols: ['tequila', 'vodka', 'rum', 'beer']
			}, this.getAlcohols)
		} else if (category === 'classical') {
			this.setState({
				alcohols: ['white+wine', 'red+wine', 'whiskey', 'gin']
			}, this.getAlcohols)
		} else if (category === 'romance') {
			this.setState({
				alcohols: ['red+wine', 'white+wine', 'gin']
			}, this.getAlcohols)
		} else if (category === 'relax') {
			this.setState({
				alcohols: ['whiskey', 'red+wine', 'beer']
			}, this.getAlcohols)
		} else if (category === 'trashed') {
			this.setState({
				alcohols: ['whiskey', 'tequila', 'vodka', 'rum', 'gin']
			}, this.getAlcohols)
		};
	}

	changeCategory(event) {
		this.setState({
			selectedCategory: event.target.value
		}, this.settingAlcohols(event.target.value))
	}


	render () {
		return (
			<div>
				<select value={this.state.selectedCategory} onChange={(e) => (this.changeCategory(e))}>
					<option value="party">Party</option>
					<option value="relax">Relax</option>
					<option value="classical">Classical</option>
					<option value="trashed">Trashed</option>
					<option value="romance">Romance</option>
				</select>
				<div style={{float: 'right'}}>
					<Drinks drinks={this.state.drinks}/>
				</div>
			</div>
		)
	}
}

export default Dropdown