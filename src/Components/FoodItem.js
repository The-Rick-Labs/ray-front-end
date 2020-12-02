import React from 'react' 

class FoodItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div 
                className='food_item' 
                draggable='true'
                onDragStart={this.props.handleDragStart} 
                onTouchStart={this.props.handleTouchStart} 
                onDrag={this.props.handleDrag} 
                onTouchMove={this.props.handleTouchMove}
                onDragEnd={this.props.handleDragEnd}
                onTouchEnd={this.props.handleTouchEnd}
                style={ {
                    display: 'inline-block',
                    cursor: 'pointer',
                    position: 'absolute',
                    left: this.props.currentX,
                    top: this.props.currentY-250, //sorry for sus
                    zindex: 999
                } }
            >
            <img alt='Food Item' src={this.props.currentImageSrc}></img>
        </div>
    }
}
export default FoodItem;