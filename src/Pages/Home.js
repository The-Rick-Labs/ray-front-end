import React from 'react'
import '../components/styles/Home.css'
import Ray from '../components/Ray'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import Assignment from './Assignment'
import Food from './Food'
import Settings from './Settings'
import BackButton from '../components/BackButton'
import Bar from '../components/Bar'

class Home extends React.Component {
	constructor(props) {
		super(props)
		
	}

	componentDidMount() {
		fetch('http://192.168.86.28:8080/uwu').then((res) => {})
	}
	componentWillUnmount() {
		window.clearInterval()
	}

	render() {
		window.setInterval(()=>{
			fetch('http://192.168.86.28:8080/blink').then((res) => {})
		},5000);
		return (
			<div>
				<Router>
					<div className='page'>
						<div className='centerVertical'>
							<div className='progbars'>
								<Bar value='food' />
								<Bar value='stress' />
							</div>
							<div>
								<Link to='/'>
									<BackButton />
								</Link>
							</div>
						</div>
						<div className='centerVertical'>
							<Ray />
						</div>
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
					</div>

					<div id='homeNavBar'>
						<Link to='/'>
							<span role='img'>🤖</span>
						</Link>
						<Link to='/food'>
							<span role='img'>🍔</span>
						</Link>
						<Link to='/assignments'>
							<span role='img'>📓</span>
						</Link>
						<Link to='/settings'>
							<span role='img'>⚙️</span>
						</Link>
					</div>
				</Router>
			</div>
		)
	}
}

export default Home
