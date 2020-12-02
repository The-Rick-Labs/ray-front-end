import React from 'react'

class Task extends React.Component {
    render() {
        let name

        if (this.props.data.complete) {
            name = (
                <span className='listitem2' >√  {this.props.data.name}</span>
            )
        } else {
            name = (
                <span className='listitem2' onClick={() => this.props.handleClick(this.props.data.id)}>{this.props.data.name}</span>
            )
        }


        return (
            <div className='calendarlistitem' >
                {name}
                <span className='listitem2'>due in {this.props.data.dueDate} hours</span>
            </div>
        )
    }
}

export default Task