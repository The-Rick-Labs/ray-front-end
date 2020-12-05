import React from 'react'

import 'firebase/database'
import * as firebase from 'firebase/app'
import './styles/Ray.css'
import './styles/QuoteBubble.css'

class QuoteBubble extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            possibleQuotes: [
                'Keep your spirits high!', 
                'Shoot for the stars!', 
                'There is no elevator to success, you have to take the stairs',
                'The way to get started is to quit talking and begin doing',
                '”Strive not to be a success but rather to be of value” - Albert Einstein'],
            currentQuote: 'Keep your spirits high!',
            currentMood: 'happy',
			cycleCounter: 0,
		}
    }

    readFB() {
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
		database.ref('stress/stress').on('value', (snapshot) => {
			if(snapshot.val() < 25) {
				this.setState((state) => ({
					currentMood: 'sad',
				}));
			} else if(snapshot.val() < 50) {
				this.setState((state) => ({
					currentMood: 'mad',
				}));
			} else {
				this.setState((state) => ({
					currentMood: 'happy',
				}));
			}
		})
    }
    
    changeQuote() {
		if(this.state.currentMood === 'happy') {
            console.log("dadsadas");
            this.setState((state) => ({
                currentQuote: state.possibleQuotes[this.state.cycleCounter],
            }))

            if (this.state.cycleCounter === this.state.possibleQuotes.length - 1) {
                this.setState((state) => ({
                    cycleCounter: 0,
                }))
            } else {
                this.setState((state) => ({
                    cycleCounter: state.cycleCounter + 1,
                }))
            }
		}
    }

    render() {
        return (
            <span className="quoteBubble">
                {this.state.currentQuote}
            </span>
        )
    }
}

export default QuoteBubble