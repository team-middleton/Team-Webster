import React from 'react';
import axios from 'axios';
import Drinks from './Drinks.jsx'
import { Dropdown } from 'semantic-ui-react';

const options = [
	{ text: 'Party', value: "party" },
	{ text: "Relax", value: "chill" },
	{ text: "Feelin' Classy", value: "classical" },
	{ text: "Lets Get Trashed", value: "rock" },
	{ text: "Romantic", value: "romance" }
]

// This component is the "Category" dropdown list which is the main bread and butter of our app.
//This "Moods" selected from this category correlate with the calls to Spotify and to the Drink APIs

class Drop extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<Dropdown placeholder="Choose Mood" options={options} value={this.props.category} onChange={(e, { value }) => (this.props.selectHandler(value))} />
		)
	}
}

export default Drop
