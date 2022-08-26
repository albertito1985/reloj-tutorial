import {Component} from 'react';

export class ScoreBoard extends Component {
    constructor(props){
        super();
        //Falta terminar
    }
  
    render(){
      return(
        <div className = "scoreBoard">
            <div className="lifes">Vidas:</div>
            <div className="score">Puntos:</div>
        </div>)
    }
  }