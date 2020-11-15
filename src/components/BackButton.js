import React from 'react'
import './styles//BackButton.css';

class BackButton extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            //colour of button text should change with Ray's mood
            //currently changes whenever button is clicked (like Ray)
            //change with firebase later
            currentColour: '#1DA02B',
            possibleColours: ['#1DA02B', '#AB9000', '#757575'],
            cycleCounter: 0
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        /*
            code for going back to main page?
         */
        this.state.cycleCounter++;
        if (this.state.cycleCounter == 3) this.state.cycleCounter = 0;
        this.setState({
            currentColour: this.state.possibleColours[this.state.cycleCounter]
        });
    }

    render() {
        return <div>
                <button class='back' onClick={this.handleClick} style={{'color': this.state.currentColour}}>🡠 BACK</button> 
            </div>;
    }
    
}

export default BackButton;