import React from 'react'

import FoodItem from '../components/FoodItem'
import DropArea from '../components/DropArea'
import food_item2 from '../components/other_images/food_item2.png'

import '../components/styles//FoodItem.css'

var fooditems = []
class Food extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			availableFood: 3, //# of food changes over time?
			//or maybe every time the user finishes a task they get food to feed ray
			//is that too complex lmao
		}
		this.onDragStart = this.onDragStart.bind(this)
		this.onDragOver = this.onDragOver.bind(this)
		this.onDrop = this.onDrop.bind(this)
	}

	componentDidMount() {
		this.dragImg = new Image(0, 0)
		this.dragImg.src = food_item2
	}

	onDragStart(e) {
		e.dataTransfer.setDragImage(this.dragImg, 50, 50)
	}

	onDragOver(e) {
		e.preventDefault()
	}

	onDrop() {
		this.setState((state) => ({
			availableFood: state.availableFood - 1,
		}))
		/*
        update firebase hunger levels
        */
	}

	render() {
		fooditems = []
		for (var i = 0; i < this.state.availableFood; i++) {
			fooditems.push(<FoodItem key={i} handleDrag={(e) => this.onDragStart(e)} />)
		}

		return (
			<div>
				<div>
					<p>Number of food left: {this.state.availableFood}</p>
				</div>
				<DropArea onDragOver={(e) => this.onDragOver(e)} onDrop={this.onDrop} />
				<div className='food_container'>{fooditems}</div>
			</div>
		)
	}
}

export default Food
