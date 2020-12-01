import React from 'react'

import ApiCalendar from 'react-google-calendar-api'
import './styles/calendar.css'

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
		} else if (name === 'reload') {
			this.Load()
		}
	}

	render() {
		return (
			<div className='calendar'>
				<div className='calendarButtons'>
					<button
						className='bigbutton'
						onClick={(e) => this.handleItemClick(e, 'reload')}
					>
						reload
					</button>
					<button
						className='bigbutton'
						onClick={(e) => this.handleItemClick(e, 'sign-in')}
					>
						sign-in
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

									return (
										<div key={i} className='calendarlistitem'>
											<span className='listitem2'>{item['summary']}</span>
											<span className='listitem2'>{hours} hours</span>
											<br />
										</div>
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
