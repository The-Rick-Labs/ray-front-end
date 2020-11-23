import React from 'react' 

class FoodItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className='food_item' draggable onDragStart={this.props.handleDrag}>
            <img alt='Food Item' src={this.props.currentImageSrc}></img>
        </div>
    }
}
export default FoodItem;