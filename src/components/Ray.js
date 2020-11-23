import React from 'react'
import ray_happy from './ray_images/ray_happy.png'
import ray_mad from './ray_images/ray_mad.png'
import ray_sad from './ray_images/ray_sad.png'
import './styles//Ray.css'

class Ray extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			possibleMoods: ['happy', 'mad', 'sad'],
			currentMood: 'happy', // CHANGE WITH FIREBASE
			currentImageSrc: ray_happy,
			isQuoting: false,
			cycleCounter: 1,
			faceClicked: '',
		}

		this.handleClick = this.handleClick.bind(this)
		this.handleFaceClick = this.handleFaceClick.bind(this)
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

		fetch('http://192.168.2.11:8080/' + uri).then((res) => {
			this.setState({ faceClicked: face })
		})
	}

	handleClick(e) {
		e.preventDefault()

		this.setState((state) => ({
			isQuoting: !state.isQuoting,
			currentMood: state.possibleMoods[this.state.cycleCounter],
		}))
		this.setMood()

		this.setState((state) => ({
			cycleCounter: this.state.cycleCounter + 1,
		}))

		if (this.state.cycleCounter === 3) {
			this.setState((state) => ({
				cycleCounter: 0,
			}))
		}
	}

	setMood() {
		switch (this.state.currentMood) {
			case 'happy':
				this.setState((state) => ({
					currentImageSrc: ray_happy,
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
					currentImageSrc: ray_sad,
				}))
				break
		}
	}

	render() {
		return (
			<div>
				<button onClick={() => this.handleFaceClick(':]')}>:]</button>
				<button onClick={() => this.handleFaceClick(':[')}>:[</button>
				<button onClick={() => this.handleFaceClick('uwu')}>uwu</button>
				<h3>button clicked: {this.state.faceClicked}</h3>
				<img alt='ray' onClick={this.handleClick} src={this.state.currentImageSrc}></img>
			</div>
		)
	}
}

export default Ray
