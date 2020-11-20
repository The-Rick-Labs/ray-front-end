import React from 'react'

import Task from "./Task"

import './styles/TaskList.css'


class TaskList extends React.Component {
    render() {
        return (
            <div className='taskList' >

                <div className='dateTitle' >
                    <p className='date' >Novemeber 20, 2020</p>
                </div>

                <div className='taskDiv' >
                    {this.props.data.map((task, i) => {
                        return <Task className='task' key={i} data = {task} handleClick={this.props.handleClick}/>
                    })}
                </div>



            </div>

        )
    }
}

export default TaskList