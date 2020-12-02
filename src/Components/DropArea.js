import React from 'react'
import Ray from './Ray'

class DropArea extends React.Component {
    constructor(props) {
        super(props);
    }

    //sorry this is a bit sus
    render() {
        return (
            <div id="drop_area" 
                    onDragOver={this.props.onDragOver} 
                    onDrop={this.props.onDrop} 
            >
                <Ray />
            </div>)
    }
}
export default DropArea