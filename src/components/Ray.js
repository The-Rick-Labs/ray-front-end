import React from 'react'
import ray_happy from './ray_images/ray_happy.png'
import ray_mad from './ray_images/ray_mad.png'
import ray_sad from './ray_images/ray_sad.png'
import './styles/Ray.css'

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
			console.log(':)')
		} else if (face === ':[') {
			uri = 'sad'
		} else if(face == ':|'){
			uri = 'meh'
		} else {
			uri = 'uwu'
		}

		fetch('http://192.168.86.28:8080/' + uri).then((res) => {
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
				this.handleFaceClick(':]')
				break
			case 'mad':
				this.setState((state) => ({
					currentImageSrc: ray_mad,
				}))
				this.handleFaceClick(':|')
				break
			case 'sad':
				this.setState((state) => ({
					currentImageSrc: ray_sad,
				}))
				this.handleFaceClick(':[')
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
			<img
				className='ray'
				alt='ray'
				width='150px'
				onClick={this.handleClick}
				src={this.state.currentImageSrc}
			></img>
		)
	}
}

export default Ray
