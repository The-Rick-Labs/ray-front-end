import React from 'react'
import '../components/styles/Home.css'
import Ray from '../components/Ray'

class Home extends React.Component {
	constructor(props) {
		super(props)
    }

	render() {
		return (
			<div>
                <Ray/>
				<div id="homeNavBar">
					<div>🍔</div>
					<div>📓</div>
					<div>⚙️</div>
				</div>
			</div>
		)
	}
}

export default Home