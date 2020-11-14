import React from 'react'

class Task extends React.Component {
    render() {
        return (
            <div>
                <h3 onClick={() => this.props.handleClick(this.props.data.id)}>{this.props.data.complete ? "√ ": ""}{this.props.data.name}</h3>
                {this.props.data.dueDate} <br/>
                {this.props.data.complete}
            </div>
        )
    }
}

export default Task