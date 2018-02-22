import React from 'react';
import axios from 'axios';
import Drinks from './Drinks.jsx'


class Dropdown extends React.Component {
	constructor (props) {
		super(props)
	}

	render () {
		return (
			<div>
				<select value={this.props.category} onChange={(e) => (this.props.selectHandler(e))}>
					<option value="party">Party</option>
					<option value="chill">Relax</option>
					<option value="classical">Classical</option>
					<option value="rock">Trashed</option>
					<option value="romance">Romance</option>
				</select>
			</div>
		)
	}
}

export default Dropdown
