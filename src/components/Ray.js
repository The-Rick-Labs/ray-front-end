import React from 'react'

import 'firebase/database'
import * as firebase from 'firebase/app'

import QuoteBubble from '../Components/QuoteBubble'
import ray_happy from './ray_images/ray_happy.png'
import ray_happyNeutral from './ray_images/ray_happyNeutral.png'
import ray_mad from './ray_images/ray_mad.png'
import ray_sad from './ray_images/ray_sad.png'
import './styles/Ray.css'

var ip = 'http://192.168.86.28:8080/'
class Ray extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			possibleMoods: ['happyNeutral', 'happy'],
			currentMood: 'happyNeutral', 
			currentImageSrc: ray_happyNeutral,
			isQuoting: false,
			cycleCounter: 0,
			faceClicked: '',
		}

		this.handleClick = this.handleClick.bind(this)
		this.handleFaceClick = this.handleFaceClick.bind(this)
		
		this.readFB = this.readFB.bind(this)
	}

	componentDidMount() {
		this.readFB()
	}

	handleFaceClick(face) {
		let uri = ''
		if (face === ':]') {
			uri = 'smiley'
			console.log(':)')
		} else if (face === ':[') {
			uri = 'sad'
		} else if(face === '4'){
			uri = '4'
		} else if(face === '3'){
			uri = '3'
		} else if(face === '2'){
			uri = '2'
		} else {
			uri = 'uwu'
		}

		fetch(ip + uri).then((res) => {
			this.setState({ faceClicked: face })
		})
	}

	handleClick(e) {
		e.preventDefault()
		this.readFB()
		if(this.state.currentMood.includes("happy")) {
			this.setState((state) => ({
				isQuoting: !state.isQuoting,
				currentMood: state.possibleMoods[this.state.cycleCounter],
			}))

			if (this.state.cycleCounter === this.state.possibleMoods.length - 1) {
				this.setState((state) => ({
					cycleCounter: 0,
				}))
			} else {
				this.setState((state) => ({
					cycleCounter: state.cycleCounter + 1,
				}))
			}
		}
		this.setMood()
	}

	readFB() {
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
		database.ref('stress/stress').on('value', (snapshot) => {
			if(snapshot.val() < 25) {
				this.setState((state) => ({
					currentMood: 'sad',
					currentImageSrc: ray_sad,
				}));
				this.handleFaceClick(':[')
				console.log('sad1')
			} else if(snapshot.val() < 50) {
				this.setState((state) => ({
					currentMood: 'mad',
					currentImageSrc: ray_mad,
				}));
				this.handleFaceClick(':|')
				console.log('mad1')
			} else {
				this.setState((state) => ({
					currentMood: 'happyNeutral',
					currentImageSrc: ray_happyNeutral,
				}));
				this.handleFaceClick(':]')
				console.log('happy1')
			}
			//this.setMood();
		})

		database.ref('food/food').on('value', (snapshot) => {
			if(snapshot.val() < 25) {
				this.handleFaceClick('4')
				console.log('4')
			} else if(snapshot.val() < 50) {
				this.handleFaceClick('3')
				console.log('3')
			} else {
				this.handleFaceClick('2')
				console.log('2')
			}
			//this.setMood();
		})
	}

	setMood() {
		switch (this.state.currentMood) {
			case 'happyNeutral':
				this.setState((state) => ({
					currentImageSrc: ray_happyNeutral,
				}))
				break
			case 'mad':
				this.setState((state) => ({
					currentImageSrc: ray_mad,
				}))
				break
			case 'sad':
				this.setState((state) => ({
					currentImageSrc: ray_sad,
				}))
				break
			default:
				this.setState((state) => ({
					currentImageSrc: ray_happy,
				}))
				break
		}
	}

	render() {
		let quote = '';
		if(this.state.isQuoting) {
			quote = <QuoteBubble></QuoteBubble>
		}

		return (
			<div className="rayDiv">
				{quote}
				<img
					className='ray'
					alt='ray'
					width='150px'
					onClick={this.handleClick}
					src={this.state.currentImageSrc}
				></img>
			</div>
		)
	}
}

export default Ray
