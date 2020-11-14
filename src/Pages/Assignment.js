import React from 'react'

import TaskList from "../Components/TaskList"

let data = [{
    id: 0,
    name: "Task 1",
    dueDate: "Nov 14, 2020",
    complete: false
},
{
    id: 1,
    name: "Task 2",
    dueDate: "Nov 15, 2020",
    complete: false
},
{
    id: 2,
    name: "Task 3",
    dueDate: "Nov 16, 2020",
    complete: false
}
]
class Assignment extends React.Component {
    state = {
        message: null,
        currentTask: null
    }

    constructor(props) {
		super(props)

		this.handleClick = this.handleClick.bind(this)
		this.handleYes = this.handleYes.bind(this)
		this.handleNo = this.handleNo.bind(this)
	}

    handleClick(i) {
        console.log("task click " + i)
        this.setState({
            message: "Did you finish " + data[i]['name'],
            currentTask: i
        })
    }

    handleYes() {
        data[this.state.currentTask]["complete"] = true
        this.setState({
            message: null,
            currentTask: null
        })
    }

    handleNo() {
        this.setState({
            message: null,
            currentTask: null
        })
    }

    render() {
        const yesno = (
            <div>            
                <p onClick={this.handleYes}>Yes</p><br/>
                <p onClick={this.handleNo}>No</p>
            </div>
        )

        return (
            <div>
                <TaskList data = {data} handleClick={this.handleClick} />
                {this.state.message}

                {this.state.message ? yesno : ""}
            </div>
        )
    }
}

export default Assignment