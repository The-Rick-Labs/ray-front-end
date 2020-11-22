import React from 'react' 

import food_item1 from '../components/ray_images/food_item1.png'

class FoodItem extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = { 
            currentImageSrc: this.props.currentImageSrc
        };
    }

    render() {
        return <div className='food_item' draggable onDragStart={this.props.handleDrag}>
            <img alt='Food Item' src={food_item1}></img>
        </div>
    }
}
export default FoodItem;