import React from 'react'

import TaskList from '../Components/TaskList'
import QuoteBubble from '../Components/QuoteBubble'
import Calendar from '../Components/Calendar'
import Ray from '../Components/Ray'

import '../Components/styles/assignment.css'

let data = [
	{
		id: 0,
		name: 'Task 1',
		dueDate: 'Nov 14, 2020',
		complete: false,
	},
	{
		id: 1,
		name: 'Task 2',
		dueDate: 'Nov 15, 2020',
		complete: false,
	},
	{
		id: 2,
		name: 'Task 3',
		dueDate: 'Nov 16, 2020',
		complete: false,
	},
]
class Assignment extends React.Component {
	state = {
		message: null,
	}

	render() {
		return (
			<>
				<Calendar handleClick={this.handleClick} />
				{this.state.message ? <QuoteBubble message={this.state.message} /> : ''}
			</>
		)
	}
}

export default Assignment
