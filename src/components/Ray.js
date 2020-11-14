import React from 'react'
import ray_happy from './ray_images/ray_happy.png';
import ray_mad from './ray_images/ray_mad.png';
import ray_sad from './ray_images/ray_sad.png';
import './styles//Ray.css';

class Ray extends React.Component{
    constructor(props) {
        super(props);
        this.state = { 
            possibleMoods: ["happy", "mad", "sad"],
            currentMood:  "happy", // CHANGE WITH FIREBASE
            currentImageSrc: ray_happy,
            isQuoting: false,
            cycleCounter: 1
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();

        this.setState(state => ({
          isQuoting: !state.isQuoting,
          currentMood: state.possibleMoods[this.state.cycleCounter],
        }));
        this.setMood();

        this.state.cycleCounter++;
        if(this.state.cycleCounter == 3) this.state.cycleCounter = 0
    }

    setMood() {
        switch(this.state.currentMood) {
            case "happy":
                this.state.currentImageSrc = ray_happy;
                break;
            case "mad":
                this.state.currentImageSrc = ray_mad;
                break;
            case "sad":
                this.state.currentImageSrc = ray_sad;
                break;
        }
    }

    render() {
      return <div>
                <img onClick={this.handleClick} src={this.state.currentImageSrc}></img>
            </div>;
    }
  }
  

export default Ray;
