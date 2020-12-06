import React from 'react'
import '../Components/styles/Home.css'
import Ray from '../Components/Ray'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import 'firebase/database'
import * as firebase from 'firebase/app'

import Assignment from './Assignment'
import Food from './Food'
import Settings from './Settings'
import RayStatus from '../Components/RayStatus'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRobot, faUtensils, faGraduationCap, faCogs } from '@fortawesome/free-solid-svg-icons'
var ip = 'http://192.168.86.28:3000/'
class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			availableFood: 0,
			seconds: 3600,
			availableStress: 0,
			seconds2: 3600,
			seconds3: 3600,
		}
		//refills food over time
		this.timer = 0
		this.startTimer = this.startTimer.bind(this)
		this.countDown = this.countDown.bind(this)

		this.timer2 = 0
		this.startTimer2 = this.startTimer2.bind(this)
		this.countDown2 = this.countDown2.bind(this)
	}

	componentDidMount() {
		fetch(ip+'uwu').then((res) => {})
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
			this.setState({ availableFood: snapshot.val() })
			if (snapshot.val() < 100) {
				this.startTimer()
			}
		})
		database.ref('stress/stress').on('value', (snapshot) => {
			this.setState({ availableStress: snapshot.val() })
			if (snapshot.val() < 100) {
				this.startTimer2()
			}
		})

		window.setInterval(function () {
			fetch('http://192.168.2.36:8080/blink').then((res) => {})
			console.log('blink')
		}, 10000)
	}

	componentWillUnmount() {
		window.clearInterval()
	}

	startTimer() {
		if (this.timer === 0 && this.state.seconds > 0) {
			this.timer = setInterval(this.countDown, 1000)
		}
	}

	countDown() {
		let current_seconds = this.state.seconds - 1
		this.setState({
			seconds: current_seconds,
		})
		if (current_seconds === 0) {
			clearInterval(this.timer)
			this.timer = 0
			this.setState({
				seconds: 3600,
			})
			var database = firebase.database()
			database.ref('food/food').set(this.state.availableFood + 1)
		}
	}

	startTimer2() {
		if (this.timer2 === 0 && this.state.seconds2 > 0) {
			this.timer2 = setInterval(this.countDown2, 1000)
		}
	}

	countDown2() {
		let current_seconds = this.state.seconds2 - 1
		this.setState({
			seconds2: current_seconds,
		})
		if (current_seconds === 0) {
			clearInterval(this.timer2)
			this.timer2 = 0
			this.setState({
				seconds2: 3600,
			})
			var database = firebase.database()
			database.ref('stress/stress').set(this.state.availableStress + 1)
		}
	}

	render() {
		return (
			<div>
				<Router>
					<Switch>
						<Route path='/assignments'>
							<Assignment />
						</Route>
						<Route path='/settings'>
							<Settings />
						</Route>
						<Route path='/food'>
							<Food />
						</Route>
					</Switch>

					<div className='page'>
						<RayStatus></RayStatus>
						{/* <Link to='/'>
							<BackButton />
						</Link> */}
						<Ray />
					</div>

					<div id='homeNavBar'>
						<div id='inHomeBar'>
							<Link to='/'>
								<div className='navIcon'>
									<FontAwesomeIcon icon={faRobot} />
								</div>
							</Link>
							<Link to='/food'>
								<div className='navIcon'>
									<FontAwesomeIcon icon={faUtensils} />
								</div>
							</Link>
							<Link to='/assignments'>
								<div className='navIcon'>
									<FontAwesomeIcon icon={faGraduationCap} />
								</div>
							</Link>
							<Link to='/settings'>
								<div className='navIcon'>
									<FontAwesomeIcon icon={faCogs} />
								</div>
							</Link>
						</div>
					</div>
				</Router>
			</div>
		)
	}
}

export default Home
