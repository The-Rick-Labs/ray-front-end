import React from 'react'

import ApiCalendar from 'react-google-calendar-api'

class Calendar extends React.Component {
	state = {
		events: [],
	}

	constructor(props) {
		super(props)
		this.handleItemClick = this.handleItemClick.bind(this)
	}

	Load() {
		ApiCalendar.listUpcomingEvents(10)
			.then(({ result }) => {
				return result.items
			})
			.then((items) => {
				this.setState({ events: items })
			})
	}

	handleItemClick(event, name) {
		if (name === 'sign-in') {
			ApiCalendar.handleAuthClick()
			this.Load()
		} else if (name === 'sign-out') {
			ApiCalendar.handleSignoutClick()
			this.setState({ events: [] })
		} else if (name === 'reload') {
			this.Load()
		}
	}

	render() {
		return (
			<>
				<button onClick={(e) => this.handleItemClick(e, 'reload')}>reload</button>
				<button onClick={(e) => this.handleItemClick(e, 'sign-in')}>sign-in</button>
				<button onClick={(e) => this.handleItemClick(e, 'sign-out')}>sign-out</button>

				<ul>
					{this.state.events.length > 0 && (
						<>
							{this.state.events.map((item, i) => {
								let start = new Date(item['start']['dateTime']).toLocaleString()
								let end = new Date(item['end']['dateTime']).toLocaleString()

								let time
								if (start === end) {
									time = start
								} else {
									time = start + ' - ' + end
								}

								return (
									<li key={i}>
										{item['summary']} - {time}
									</li>
								)
							})}
						</>
					)}
				</ul>
			</>
		)
	}
}

export default Calendar
