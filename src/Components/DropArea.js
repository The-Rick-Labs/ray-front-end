import React from 'react'
import Ray from '../components/Ray'

class DropArea extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			colour: 'none',
		}
	}

	//sorry this is a bit sus
	render() {
		return (
			<div
				onDragOver={this.props.onDragOver}
				onDrop={this.props.onDrop}
				style={{ color: this.state.colour }}
			>
				<Ray />
			</div>
		)
	}
}
export default DropArea
