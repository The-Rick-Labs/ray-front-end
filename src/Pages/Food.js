import React from 'react'

import BackButton from '../components/BackButton'
import FoodItem from '../components/FoodItem'
import DropArea from '../components/DropArea'

import food_item1 from '../components/ray_images/food_item1.png'
import food_item2 from '../components/ray_images/food_item2.png'
import food_item3 from '../components/ray_images/food_item3.png'

import '../components/styles//Food.css'

var fooditems = [];
class Food extends React.Component {

	constructor(props) {
        super(props);
        this.state = {
            availableFood: 3 //# of food changes over time? 
            //or maybe every time the user finishes a task they get food to feed ray
            //is that too complex lmao
        }
        this.onDragStart = this.onDragStart.bind(this);
        this.onDragOver = this.onDragOver.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }

    componentDidMount() {
        this.dragImg = new Image(0, 0);
        this.dragImg.src = food_item2;
    }
    
    onDragStart(e) {
        e.dataTransfer.setDragImage(this.dragImg, 50, 50);
    }

    onDragOver(e) {
        e.preventDefault();
    }

    onDrop() {
        this.setState(state => ({
            availableFood: state.availableFood-1
        }));
        /*
        update firebase hunger levels
        */
    }

	render() {
        fooditems = [];
        if (this.state.availableFood > 0) {
            for (var i = 0; i < this.state.availableFood; i++) {
                fooditems.push(
                   <FoodItem key={i} handleDrag={ (e) => this.onDragStart(e)} currentImageSrc={food_item1} /> 
                );
            }
        } else {
            fooditems.push(
                <FoodItem key={0} currentImageSrc={food_item3} /> 
            )
        }


		return (
			<div>
                <div id="foodHeader">
                    <BackButton />
                </div>
                <div id="foodBody">
                    <DropArea onDragOver={ (e) => this.onDragOver(e) } onDrop={this.onDrop} />
                </div>
                <div id='food_container'>
				    {fooditems}
                </div>
                
			</div>
		)
	}
}

export default Food