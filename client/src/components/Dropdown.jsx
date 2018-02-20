import React from 'react';

class Dropdown extends React.Component {
	constructor (props) {
		super(props)
	}

	render () {
		return (
			<div>
				<select>
					<option value="party">Party</option>
					<option value="relax">Relax</option>
					<option value="classical">Classy</option>
					<option value="trashed">Trashed</option>
					<option value="romance">Romance</option>
				</select>
			</div>
		)
	}
}

export default Dropdown