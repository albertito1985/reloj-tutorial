import {Component} from 'react';
import './disco.css';

export class Disco extends Component {
    calculateDegrees(){
        let hours = this.props.hours;
        let minutes = this.props.minutes;
        return {"--rotate": `${(hours*15) + (minutes*0.25)}deg`};
    }
  
    render(){
      return(<div className="discoContainer">
        <div className="disco" style={this.calculateDegrees()}></div>
        <div className="discoArrow"></div>
      </div>)
    }
  }