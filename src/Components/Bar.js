import React from 'react'

import 'firebase/database'
import * as firebase from 'firebase/app'

import './styles/bar.css'

class Bar extends React.Component {
	state = {
		value: 0,
	}

	constructor(props) {
		super(props)

		this.app = {}

		this.handleAdd = this.handleAdd.bind(this)
		this.handleDecrease = this.handleDecrease.bind(this)
		this.handleReset = this.handleReset.bind(this)
	}

	componentDidMount() {
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
		database.ref(this.props.value + '/' + this.props.value).on('value', (snapshot) => {
			this.setState({ value: snapshot.val() })
		})
	}

	handleReset() {
		let obj = {}
		obj[this.props.value] = 50
		var database = firebase.database()
		database.ref(this.props.value).set(obj)
	}

	handleAdd() {
		let obj = {}
		obj[this.props.value] = this.state.value + 10
		var database = firebase.database()
		database.ref(this.props.value).set(obj)
	}

	handleDecrease() {
		let obj = {}
		obj[this.props.value] = this.state.value - 10
		var database = firebase.database()
		database.ref(this.props.value).set(obj)
	}

	render() {
		return (
			<div className='baritem'>
				<span>{this.props.value}:</span>
				{/* <button onClick={this.handleReset}>reset db</button>
				<button onClick={this.handleAdd}>add</button>
				<button onClick={this.handleDecrease}>decrease</button> */}
				<div>
					<h3>{this.state.value}</h3>
				</div>
			</div>
		)
	}
}

export default Bar
