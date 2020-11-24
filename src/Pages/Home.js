import React from 'react'
import '../components/styles/Home.css'
import Ray from '../components/Ray'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
  } from "react-router-dom";

import Assignment from './Assignment'
import Food from './Food'
import Settings from './Settings'

class Home extends React.Component {
	constructor(props) {
		super(props)
    }

	render() {
		return (
			<div>
				<Router>
					<Ray/>
					<div id="homeNavBar">
						<div id="inHomeBar">
							<Link to='/food'><div>🍔</div></Link>
							<Link to='/assignments'><div>📓</div></Link>
							<Link to='/settings'><div>⚙️</div></Link>
						</div>
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
				</Router>
			</div>
		)
	}
}

export default Home