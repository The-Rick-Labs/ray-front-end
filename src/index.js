import React from 'react'
import ReactDOM from 'react-dom'

const App = () => (
	<h1>
		Hello,{' '}
		<span role='img' aria-label='wave'>
			👋
		</span>
	</h1>
)

ReactDOM.render(<App />, document.getElementById('root'))
