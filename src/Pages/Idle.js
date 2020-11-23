import React from 'react'

import Ray from '../components/Ray'
import BackButton from '../components/BackButton'
import Bar from '../components/Bar'

class Idle extends React.Component {
	render() {
		return (
			<>
				<BackButton></BackButton>
				<Bar value='stress' />
				<Bar value='food' />

				<Ray></Ray>
			</>
		)
	}
}

export default Idle
