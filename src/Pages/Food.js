import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom' //for some reason i have to import all of them for it to work :p
import 'firebase/database'
import * as firebase from 'firebase/app'

import BackButton from '../components/BackButton'
import FoodItem from '../components/FoodItem'
import DropArea from '../components/DropArea'

import food_item1 from '../components/ray_images/food_item1.png'
import food_item2 from '../components/ray_images/food_item2.png'
import food_item3 from '../components/ray_images/food_item3.png'

import '../components/styles//Food.css'

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

		//refills food over time
		//guys i am actually so proud of this
		this.timer = 0
		this.startTimer = this.startTimer.bind(this)
		this.countDown = this.countDown.bind(this)
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
		database.ref('food/food').on('value', (snapshot) => {
			this.setState({ availableFood: snapshot.val() });
			if (snapshot.val() < 10) {
				this.startTimer();
			}
		})
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

	startTimer() {
		if (this.timer == 0 && this.state.seconds > 0) {
			this.timer = setInterval(this.countDown, 1000);
		}
	}

	countDown() {
		let current_seconds = this.state.seconds-1;
		this.setState({
			seconds: current_seconds
		});
		if (current_seconds == 0) {
			clearInterval(this.timer);
			this.timer = 0;
			this.setState({
				seconds: 5
			})
			var database = firebase.database()
			database.ref('food/food').set(this.state.availableFood+1)
		}
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
