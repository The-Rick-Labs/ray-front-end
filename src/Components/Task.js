import React from 'react'

class Task extends React.Component {
    render() {
        let name

        if (this.props.data.complete) {
            name = (
                <h3>√  {this.props.data.name}</h3>
            )
        } else {
            name = (
                <h3 onClick={() => this.props.handleClick(this.props.data.id)}>{this.props.data.name}</h3>
            )
        }


        return (
            <div>
                {name}
                {this.props.data.dueDate} <br/>
                {this.props.data.complete}
            </div>
        )
    }
}

export default Task