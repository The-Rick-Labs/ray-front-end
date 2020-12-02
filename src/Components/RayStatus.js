import Bar from '../Components/Bar'
import React from 'react'
import './styles/RayStatus.css'
import {faLaughBeam, faHamburger} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'

class RayStatus extends React.Component {
    render() {
      return (
        <div className="rayStatus">
            <div className="barIcon">
                <div>
                  <FontAwesomeIcon icon={faLaughBeam} />
                </div>
                <div>
                  <FontAwesomeIcon icon={faHamburger} />
                </div>
            </div>
            <div className="statusBars"> 
              <Bar value='stress' />
              <Bar value='food' />
            </div>
      </div>
      )
    }
  }

export default RayStatus