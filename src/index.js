import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import Assignment from './Pages/Assignment'
import Food from './Pages/Food'
import Settings from './Pages/Settings'
import Idle from './Pages/Idle'

class App extends React.Component {
	render() {
		return (
			<>
				<Router>
					<ul>
						<li>
							<Link to='/'>Idle</Link>
						</li>
						<li>
							<Link to='/food'>Food</Link>
						</li>
						<li>
							<Link to='/assignments'>Assignments</Link>
						</li>
						<li>
							<Link to='/settings'>Settings</Link>
						</li>
					</ul>
					<Switch>
						{/* / path is the idle screen */}
						<Route exact path='/'>
							<Idle />
						</Route>
						<Route path='/assignments'>
							<Assignment />
						</Route>
						<Route path='/settings'>
							<Settings />
						</Route>
						<Route path='/idle'></Route>
						<Route path='/food'>
							<Food />
						</Route>
					</Switch>
				</Router>
			</>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('root'))
