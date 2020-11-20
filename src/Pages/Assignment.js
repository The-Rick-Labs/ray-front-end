import React from 'react'

import TaskList from '../Components/TaskList'
import QuoteBubble from '../Components/QuoteBubble'

import '../Components/styles/Assignment.css'

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

	{
		id: 3,
		name: 'Task 1',
		dueDate: 'Nov 14, 2020',
		complete: false,
	},
	{
		id: 4,
		name: 'Task 2',
		dueDate: 'Nov 15, 2020',
		complete: false,
	},
	{
		id: 5,
		name: 'Task 3',
		dueDate: 'Nov 16, 2020',
		complete: false,
	},

	{
		id: 6,
		name: 'Task 1',
		dueDate: 'Nov 14, 2020',
		complete: false,
	},
	{
		id: 7,
		name: 'Task 2',
		dueDate: 'Nov 15, 2020',
		complete: false,
	},
	{
		id: 8,
		name: 'Task 3',
		dueDate: 'Nov 16, 2020',
		complete: false,
	},
	{
		id: 9,
		name: 'Task 1',
		dueDate: 'Nov 14, 2020',
		complete: false,
	},
	{
		id: 10,
		name: 'Task 2',
		dueDate: 'Nov 15, 2020',
		complete: false,
	},
	{
		id: 11,
		name: 'Task 3',
		dueDate: 'Nov 16, 2020',
		complete: false,
	},
]
class Assignment extends React.Component {
	state = {
		message: null,
		currentTask: null,
		showTasks: true
	}

	constructor(props) {
		super(props)

		this.handleClick = this.handleClick.bind(this)
		this.handleYes = this.handleYes.bind(this)
		this.handleNo = this.handleNo.bind(this)
	}

	handleClick(i) {
		console.log('task click ' + i)
		this.setState({
			message: 'Did you finish ' + data[i]['name'],
			currentTask: i,
		})
	}

	handleYes() {
		data[this.state.currentTask]['complete'] = true
		this.setState({
			message: null,
			currentTask: null,
		})
	}

	handleNo() {
		this.setState({
			message: null,
			currentTask: null,
		})
	}

	render() {
		const yesno = (
			<div>
				<QuoteBubble handleClick={this.handleYes} message='Yes' />
				<br />
				<QuoteBubble handleClick={this.handleNo} message='No' />
			</div>
		)

		return (
			<div className = 'assignmentPage' >
				<button onClick={() => {this.setState({showTasks: !this.state.showTasks})}} >Task List</button>

				
				{this.state.showTasks ? <TaskList data={data} handleClick={this.handleClick} /> : ''}


				{this.state.message ? <QuoteBubble message={this.state.message} /> : ''}

				{this.state.message ? yesno : ''}
			</div>
		)
	}
}

export default Assignment
