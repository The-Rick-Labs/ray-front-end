import React from 'react'
import ApiCalendar from 'react-google-calendar-api'
import Ray from '../Components/Ray'
import RayStatus from '../Components/RayStatus'

import 'firebase/database'
import * as firebase from 'firebase/app'

import '../Components/styles/settings.css'

class Settings extends React.Component {
	constructor(props) {
		super(props)

		this.logout = this.logout.bind(this)
		this.reset = this.reset.bind(this)
	}

	logout() {
		ApiCalendar.handleSignoutClick()
	}

	reset() {
		var database = firebase.database()
		database.ref('/food').set({ food: 0 })
		database.ref('/stress').set({ stress: 0 })
	}

	render() {
		return (
			<div className='settings'>
				<div id='centerSettings'>
					<div>
						<button className='bigbutton' onClick={this.logout}>
							Log Out
						</button>
					</div>
					<div>
						<button id='temp' className='bigbutton' onClick={this.reset}>
							Reset Game
						</button>
					</div>
				</div>
			</div>
		)
	}
}

export default Settings
