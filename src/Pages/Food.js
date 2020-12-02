import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom' //for some reason i have to import all of them for it to work :p
import 'firebase/database'
import * as firebase from 'firebase/app'

import BackButton from '../Components/BackButton'
import FoodItem from '../Components/FoodItem'
import DropArea from '../Components/DropArea'

import food_item1 from '../Components/ray_images/food_item1.png'
import food_item2 from '../Components/ray_images/food_item2.png'
import food_item3 from '../Components/ray_images/food_item3.png'

import '../Components/styles//Food.css'

var fooditems = []
class Food extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			availableFood: 0,
			fullness: 100,
			seconds: 3600
		}
		this.onDragStart = this.onDragStart.bind(this)
		this.onDragOver = this.onDragOver.bind(this)
		this.onDrop = this.onDrop.bind(this)	
	}

	componentDidMount() {
		this.dragImg = new Image(0, 0)
		this.dragImg.src = food_item2
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
		database.ref('food/fullness').on('value', (snapshot) => {
			this.setState({ fullness: snapshot.val() });
		})
	}

	onDragStart(e) {
		e.dataTransfer.setDragImage(this.dragImg, 50, 50)
	}

	onDragOver(e) {
		e.preventDefault()
	}

	onDrop() {
		var database = firebase.database()
		database.ref('food/food').set(this.state.availableFood-1)
		database.ref('food/fullness').set(this.state.fullness+10)
	}

	render() {
		fooditems = []
		if (this.state.availableFood > 0) {
			for (var i = 0; i < this.state.availableFood; i++) {
				fooditems.push(
					<FoodItem
						key={i}
						handleDrag={(e) => this.onDragStart(e)}
						currentImageSrc={food_item1}
					/>
				)
			}
		} else {
			fooditems.push(<FoodItem key={0} currentImageSrc={food_item3} />)
		}

		return (
			<div id='food_page'>
				<div id="foodHeader">
					<Link to='/'>
						<BackButton />
					</Link>
				</div>
				
				
				<div id='foodBody'>
					<DropArea onDragOver={(e) => this.onDragOver(e)} onDrop={this.onDrop} />
				</div>
				<div id='food_container'>{fooditems}</div>
			</div>
		)
	}
}

export default Food
