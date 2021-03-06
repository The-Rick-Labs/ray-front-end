import React from 'react'

import Task from "./Task"

class TaskList extends React.Component {
    render() {
        return (
            <div>
                {this.props.data.map((task, i) => {
                    return <Task key={i} data = {task} handleClick={this.props.handleClick}/>
                })}
            </div>

        )
    }
}

export default TaskList