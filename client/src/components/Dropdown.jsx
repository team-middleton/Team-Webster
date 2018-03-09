import React from 'react';
import axios from 'axios';
import Drinks from './Drinks.jsx'
import { Dropdown } from 'semantic-ui-react';

const options = [
	{ text: 'Party', value: "party" },
	{ text: "Relax", value: "chill" },
	{ text: "Feelin' Classy", value: "classical" },
	{ text: "Lets Get Trashed", value: "country" },
	{ text: "Latin", value: "latin" }
]

// This component is the "Category" dropdown list which is the main bread and butter of our app.
//This "Moods" selected from this category correlate with the calls to Spotify and to the Drink APIs

class Drop extends React.Component {
	constructor(props) {
		super(props)
		this.handleChange = this.handleChange.bind(this);
	}
	
	handleChange(value) {
		this.props.selectHandler(value);
		if(this.props.handleClose) {
			var handleClose = this.props.handleClose;
		} else {
			var handleClose = function() {
				return;
			}
		}
		handleClose()
	}
 

	render() {
		if(this.props.handleClose) {
			var handleClose = this.props.handleClose;
			var placeholderStyle = {
				color: '#016936',
				fontSize: '30px',
				fontWeight: 'bold'
			}
		} else {
			var placeholderStyle = {
				color: '#016936'
			}
			var handleClose = function() {
				return 1+1;
			}
		}

		var placeholder = <div style={placeholderStyle}> choose mood</div>

		return (
			<Dropdown placeholder={placeholder} options={options} value={this.props.category} 
			onChange={(e, { value }) => (this.handleChange(value))} 
			className="dropDownText" />
		)
	}
}

export default Drop
