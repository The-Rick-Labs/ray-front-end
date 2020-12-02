import React from 'react'

import 'firebase/database'
import * as firebase from 'firebase/app'

import BackButton from '../Components/BackButton'
import FoodItem from '../Components/FoodItem'
import DropArea from '../Components/DropArea'
import RayStatus from '../Components/RayStatus'

import food_item from '../Components/ray_images/food_item.png'
import empty_food_item from '../Components/ray_images/empty_food_item.png'

import '../Components/styles/Food.css'

var fooditems = []
class Food extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			availableFood: 0,
			fullness: 0,
			dragging: false,
			currentX: 10,
			currentY: 0
		}
		this.onDragStart = this.onDragStart.bind(this)
		this.onTouchStart = this.onTouchStart.bind(this)
		this.onDrag = this.onDrag.bind(this)
		this.onTouchMove = this.onTouchMove.bind(this)
		this.onDragOver = this.onDragOver.bind(this);
		this.onDrop = this.onDrop.bind(this)	
		this.onTouchEnd = this.onTouchEnd.bind(this)
	}

	componentDidMount() {
		this.dragImg = new Image(0, 0)
		this.dragImg.src = food_item;
		var firebaseConfig = {
			apiKey: 'AIzaSyAImG5Vk9cS8Yi_UUNX9gwO-4_b1z2KAR0',
			authDomain: 'rayside-94e8d.firebaseapp.com',
			databaseURL: 'https://rayside-94e8d.firebaseio.com',
			projectId: 'rayside-94e8d',
			storageBucket: 'rayside-94e8d.appspot.com',
			messagingSenderId: '819405678971',
			appId: '1:819405678971:web:74554bcb338cafdb07b5de',
			measurementId: 'G-4JECV8ZB79',
		}

		if (!firebase.apps.length) {
			firebase.initializeApp(firebaseConfig)
		}
		var database = firebase.database()
		database.ref('food/amount').on('value', (snapshot) => {
			this.setState({ availableFood: snapshot.val() });
		})
		database.ref('food/food').on('value', (snapshot) => {
			this.setState({ fullness: snapshot.val() });
		})
	}

	onDragStart(e) {
		if (e.type === 'dragstart') {
			e.dataTransfer.setDragImage(this.dragImg, 50, 50)
		}
		this.setState({ dragging: true })
	}

	onTouchStart(e) {
		this.onDragStart(e)
	}

	onDrag(e) {
		if (e.clientX <= 0 || e.clientY <= 0) return false;
		if (!e.type.includes('drag')) {
			let touch = e.targetTouches[0];
			this.setState({
				currentX: touch.clientX,
				currentY: touch.clientY-250
			});
		}
	}

	onTouchMove(e) {
		this.onDrag(e);
	}

	onDragOver(e) {
		e.preventDefault();
	}

	onDrop() {
		var database = firebase.database()
		if (this.state.availableFood > 0) {
			database.ref('food/amount').set(this.state.availableFood-1)
		}
		database.ref('food/food').set(this.state.fullness+10)
		this.setState({
			dragging: false,
			currentX: 10,
			currentY: 0
		})
	}

	onTouchEnd(e) {
		this.onDrop()
	}

	render() {
		fooditems = []
		if (this.state.availableFood > 0) {
			for (var i = 0; i < this.state.availableFood; i++) {
				fooditems.push(
					<FoodItem
						key={i}
						handleDragStart={(e) => this.onDragStart(e)}
						handleTouchStart={(e) => this.onTouchStart(e)}
						handleDrag={(e) => this.onDragOver(e)}
						handleTouchMove={(e) => this.onTouchMove(e)}
						handleDragEnd={(e) => this.onDrop(e)}
						handleTouchEnd={(e) => this.onTouchEnd(e)}
						currentImageSrc={food_item}
						currentX={this.state.currentX}
						currentY={this.state.currentY}
					/>
				)
			}
		} else {
			fooditems.push(
				<FoodItem 
					key={0} 
					currentImageSrc={empty_food_item} 
					currentX={10}
					currentY={0}
				/>)
		}

		return (
			<div id='foodPage' className='page'>
				<RayStatus />
				<BackButton />					
				<DropArea onMouseDragOver={(e) => this.onDragOver(e)} />
				<div id='foodContainer'>{fooditems}</div>
			</div>
		)
	}
}

export default Food
