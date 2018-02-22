import React from 'react';
import axios from 'axios';
import Drinks from './Drinks.jsx'
import { Dropdown } from 'semantic-ui-react';

	const options =	[
				{text: 'Party', value: "party"},{text: "Relax", value: "relax"},{text: "Classical", value: "classical"}, {text: "Trashed", value: "trashed"},{text: "Romance", value: "romance"}
			]
class Drop extends React.Component {
	constructor (props) {
		super(props)
		this.state = {

	  }
	}

	render () {
		return (
			<div> 
				<Dropdown placeholder = "Choose Mood" options= {options}  value={this.props.category} onChange={(e, {value}) => (this.props.selectHandler(value))}/>
					{/*<option className="item" value="">Choose your Mood</option>
					<option className="item" value="party">Party</option>
					<option className="item" value="relax">Relax</option>
					<option className="item" value="classical">Classical</option>
					<option className="item" value="trashed">Trashed</option>
					<option className="item" value="romance">Romance</option>
				</select>*/}
			</div>
		)
	}
}

export default Drop
