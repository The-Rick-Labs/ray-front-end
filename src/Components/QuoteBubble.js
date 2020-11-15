import React from 'react'

class QuoteBubble extends React.Component {
    render() {
        return (
            <div>
                <p onClick={this.props.handleClick}>{this.props.message}</p>
            </div>
        )
    }
}

export default QuoteBubble