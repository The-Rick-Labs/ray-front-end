import React from 'react'
import ReactDOM from 'react-dom'

import * as firebase from 'firebase/app'
import 'firebase/database'

class App extends React.Component {
	state = {
		stress: 0,
		faceClicked: '',
	}

	constructor(props) {
		super(props)

		this.handleAddStress = this.handleAddStress.bind(this)
		this.handleDecreaseStress = this.handleDecreaseStress.bind(this)
		this.handleFaceClick = this.handleFaceClick.bind(this)
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

		// Initialize Firebase
		firebase.initializeApp(firebaseConfig)

		var database = firebase.database()
		database.ref('state/stress').on('value', (snapshot) => {
			this.setState({ stress: snapshot.val() })
		})
	}

	handleReset() {
		var database = firebase.database()
		database.ref('state').set({
			stress: 50,
		})
	}

	handleAddStress() {
		var database = firebase.database()
		database.ref('state').set({
			stress: this.state.stress + 10,
		})
	}

	handleDecreaseStress() {
		var database = firebase.database()
		database.ref('state').set({
			stress: this.state.stress - 10,
		})
	}

	handleFaceClick(face) {
		let uri = ''
		if (face === ':]') {
			uri = 'smiley'
		} else if (face === ':[') {
			uri = 'sad'
		} else {
			uri = 'uwu'
		}

		fetch('http://localhost:8080/' + uri).then((res) => {
			this.setState({ faceClicked: face })
		})
	}

	render() {
		return (
			<>
				<h1>
					Hello,{' '}
					<span role='img' aria-label='wave'>
						👋
					</span>
				</h1>
				<button onClick={this.handleReset}>reset db</button>
				<button onClick={this.handleAddStress}>add stress</button>
				<button onClick={this.handleDecreaseStress}>decrease stress</button>
				<h3>{this.state.stress}</h3>
				<h1> -- FOR THE 8X8 LED GRID -- </h1>
				<button onClick={() => this.handleFaceClick(':]')}>:]</button>
				<button onClick={() => this.handleFaceClick(':[')}>:[</button>
				<button onClick={() => this.handleFaceClick('uwu')}>uwu</button>
				<h3>button clicked: {this.state.faceClicked}</h3>
			</>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('root'))
