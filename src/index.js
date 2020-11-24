import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import ReactDOM from 'react-dom'

import Home from './Pages/Home'
import Assignment from './Pages/Assignment'
import Food from './Pages/Food'
import Settings from './Pages/Settings'

class App extends React.Component {
	render() {
		return (
			<div><Home/></div>

			// <>
			// 	<BackButton></BackButton>
			// 	<h1>
			// 		Hello,{' '}
			// 		<span role='img' aria-label='wave'>
			// 			👋
			// 		</span>
			// 	</h1>
			// 	<button onClick={this.handleReset}>reset db</button>
			// 	<button onClick={this.handleAddStress}>add stress</button>
			// 	<button onClick={this.handleDecreaseStress}>decrease stress</button>
			// 	<h3>{this.state.stress}</h3>
			// 	<h1> -- FOR THE 8X8 LED GRID -- </h1>
			// 	<button onClick={() => this.handleFaceClick(':]')}>:]</button>
			// 	<button onClick={() => this.handleFaceClick(':[')}>:[</button>
			// 	<button onClick={() => this.handleFaceClick('uwu')}>uwu</button>
			// 	<h3>button clicked: {this.state.faceClicked}</h3>

			// 	<Assignment />
			// 	<Ray></Ray>
			// 	<Calendar />
			// </>
		)
	}
}

export default App

ReactDOM.render(<App />, document.getElementById('root'))
