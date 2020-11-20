import React from 'react'
import './styles/Task.css'

import Checked from './ray_images/Checked.png'
import Unchecked from './ray_images/Unchecked.png'

class Task extends React.Component {
    render() {
        let check

        if (this.props.data.complete) {
            check = (
                <img className='check' alt="checked" src={Checked}></img>
            )
        } else {
            check = (
                <img className='check' alt="unchecked" src={Unchecked}></img>
            )
        }


        return (
            <div className = 'task' onClick={() => this.props.handleClick(this.props.data.id)} >
                <div className='title' >
                    {check}                 
                    <p className='name' >{this.props.data.name}</p>
                </div>

                <p className= 'dueDate' >Due: {this.props.data.dueDate}</p>
            </div>
        )
    }
}

export default Task