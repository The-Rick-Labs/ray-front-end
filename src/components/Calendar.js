import React from 'react'

import ApiCalendar from 'react-google-calendar-api'
import './styles/calendar.css'

import Task from './Task'

import 'firebase/database'
import * as firebase from 'firebase/app'

class Calendar extends React.Component {
	state = {
		events: [
			{ summary: 'temp', end: { datetime: 10 } },
			{ summary: 'temp', end: { datetime: 10 } },
		],
		complete: [],
		stress: 0,
	}

	constructor(props) {
		super(props)
		this.handleItemClick = this.handleItemClick.bind(this)

		this.handleClick = this.handleClick.bind(this)
		this.handleYes = this.handleYes.bind(this)
		this.handleNo = this.handleNo.bind(this)

		this.database = {}
	}

	Load() {
		fetch('http://192.168.86.28:8080/calendar')
			.then((res) => {
				return res.json()
			})
			.then((result) => {
				console.log(result)
				return result['items']
			})
			.then((items) => {
				console.log(items)
				this.setState({ events: items })

				var temp = []
				for (var i = 0; i < this.state.events.length; ++i) {
					temp[i] = false
				}

				this.setState({ complete: temp })
			})
	}

	handleItemClick(event, name) {
		if (name === 'sign-in') {
			ApiCalendar.handleAuthClick()
			this.Load()
		} else if (name === 'reload') {
			this.Load()
		}
	}

	handleClick(i) {
		console.log('task click ' + i)
		if (window.confirm('Did you finish this task?')) {
			this.handleYes(i)
		} else {
			this.handleNo()
		}
	}

	handleYes(i) {
		console.log('Complete')

		var database = firebase.database()
		database.ref('stress/stress').set(this.state.stress + 10)

		var temp = []
		for (var j = 0; j < this.state.events.length; ++j) {
			if (j === i || this.state.complete[j]) {
				temp[j] = true
			} else {
				temp[j] = false
			}
		}

		this.setState({ complete: temp })
	}

	handleNo() {
		console.log('Not Complete')
	}

	componentDidMount() {
		var database = firebase.database()
		database.ref('stress/stress').on('value', (snapshot) => {
			this.setState({ stress: snapshot.val() })
		})
	}

	render() {
		console.log(this.state.events)

		return (
			<div className='calendar'>
				<div className='calendarButtons'>
					<button
						className='bigbutton'
						onClick={(e) => this.handleItemClick(e, 'reload')}
					>
						reload
					</button>
				</div>

				<div className='scrollable'>
					<>
						{this.state.events.length > 0 && (
							<>
								{this.state.events.map((item, i) => {
									let end = new Date(item['end']['dateTime'])
									let now = new Date()

									var delta = Math.abs(end - now) / 1000
									var hours = Math.floor(delta / 3600) % 24

									const data = {
										id: i,
										name: item['summary'],
										dueDate: hours,
										complete: this.state.complete[i],
									}

									return (
										<Task key={i} data={data} handleClick={this.handleClick} />
									)
								})}
							</>
						)}
					</>
				</div>
			</div>
		)
	}
}

export default Calendar
