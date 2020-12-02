import React from 'react'
import Ray from './Ray'

class DropArea extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div onDragOver={this.props.onMouseDragOver}>
                <Ray />
            </div>
        )
    }
}
export default DropArea