import React from 'react'
import 'firebase/database'
import * as firebase from 'firebase/app'

import './styles/BackButton.css'

class BackButton extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            currentColour: '',
        };
        this.handleMoodChange = this.handleMoodChange.bind(this);
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
        database.ref('state/stress').on('value', (snapshot) => {
            this.handleMoodChange(snapshot.val());
        })
    }

    handleMoodChange(stress) {
        if (stress <= 50) {
            this.setState({ currentColour: '#1DA02B' });
        } else if (stress > 50 && stress <= 75) {
            this.setState({ currentColour: '#AB9000' });
        } else {
            this.setState({ currentColour: '#757575' });
        }
    }

    render() {
        return <span id="backButton">
            <button className = 'bigbutton'
                style={{'color': this.state.currentColour}}
            >
                🡠 BACK
            </button> 
        </span>;
    }
    
}

export default BackButton;