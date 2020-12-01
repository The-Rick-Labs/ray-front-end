import React from 'react'
import 'firebase/database'
import * as firebase from 'firebase/app'

class BackButton extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            currentColour: '#1DA02B',
        };
        this.handleMoodChange = this.handleMoodChange.bind(this);
    }

    componentDidMount() {
        var database = firebase.database()
        database.ref('state/stress').on('value', (snapshot) => {
            this.handleMoodChange(snapshot.val());
        })
    }

    handleMoodChange(stress) {
        if (stress <= 50) {
            this.setState({
                currentColor: '#1DA02B'
            });
        } else if (stress > 50 && stress <= 75) {
            this.setState({
                currentColor: '#AB9000'
            });
        } else {
            this.setState({
                currentColor: '#757575'
            });
        }
    }

    render() {
        return <div>
            <button className = 'bigbutton'
                style={{'color': this.state.currentColour}}>🡠 BACK
            </button> 
        </div>;
    }
    
}

export default BackButton;