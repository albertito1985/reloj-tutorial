import {Component} from 'react';
import {translate} from '../timeFunctions';
import {relojDigital} from './relojDigitalController';
import './relojDigital.css';

export class RelojDigital extends Component{
    constructor(){
      super();
      this.state={
        hours:undefined,
        minutes:undefined,
        period:undefined
      }
      this.handleChange = this.handleChange.bind(this);
      this.showInteraction = this.showInteraction.bind(this);
    };
  
  static getDerivedStateFromProps(props,state){
    let timeObject ={};
    if(props.answer){
      if(props.mode === 12){
        timeObject = translate.time24hto12h({hours:relojDigital.hours,minutes:relojDigital.minutes});
      }else{
        timeObject = {
          hours:relojDigital.hours,
          minutes:relojDigital.minutes
        }
      }
      return {...timeObject};
    }else{
      if(props.mode === 12){
        timeObject = translate.time24hto12h({hours:props.hours,minutes:props.minutes});
      }else{
        timeObject = {
          hours:props.hours,
          minutes:props.minutes
        }
      };
      return {...timeObject}
    }
  }
  
  response(timeObject){
    if(this.props.answer){
      relojDigital.hours = timeObject.hours;
      relojDigital.minutes = timeObject.minutes;
      this.setState(timeObject);
    }else{
      this.props.response(timeObject);
      this.setState(timeObject);
    }
  }
  
  handleChange(e){
    if(e.target.id === "period"){
      this.response(relojDigital.togglePeriodIn24h(this.state));
    }else if(e.target.id === "hours"){
      let filteredSiffra;
      if(this.props.mode === 12){
          filteredSiffra = filterminmaxvalue(e.target.value,1,12);
      }else{
          filteredSiffra = filterminmaxvalue(e.target.value,0,23);
      }
      if(!(filteredSiffra=== undefined)){
        this.response({hours:filteredSiffra,minutes:this.state.minutes})
      }
    }else if(e.target.id === "minutes"){
      let filteredSiffra;
      filteredSiffra = filterminmaxvalue(e.target.value,0,59);
      if(!(filteredSiffra=== undefined)){
        this.response({hours:this.state.hours,minutes:filteredSiffra})
      }
    }
    function filterminmaxvalue(value,min,max){
      let filteredSiffra = /\d*?(\d?(\d))$/.exec(value);
      if(filteredSiffra !== null ){
        if(filteredSiffra[1]<=max && filteredSiffra[1]>min){
          return parseInt(filteredSiffra[1]);
        }else if(filteredSiffra[2]>=min){
          return parseInt(filteredSiffra[2]);
        }
      }
    }
  }
  
  showInteraction(e){
    if(this.props.interaction){
      if(e.target.classList.contains("clockContainers")){
        let span = e.target.getElementsByClassName("digitalSpan")[0];
        let show = e.target.getElementsByClassName("digitalShow")[0];
        span.classList.add("show");
        show.classList.remove("show");
        let interaction = span.getElementsByClassName("digitalInteraction")[0];
        interaction.focus();
      }
    }
  }
  
  hideInteraction(e){
    if(e.target.classList.contains("digitalInteraction")){
      let span = e.target.parentElement;
      let show = span.previousSibling;
      span.classList.remove("show");
      show.classList.add("show");
    }
  }
  
  showTime(){
    let timeToShow={
      hours: (this.state.hours<10)?`0${this.state.hours}`: this.state.hours,
      minutes:(this.state.minutes<10)?`0${this.state.minutes}`: this.state.minutes,
    }
    let returnArray=[]
    if(this.props.mode === 12){
      returnArray.push(<span key="-">-</span>,
      <div className="clockContainers" tabIndex="3" onFocus={this.showInteraction} id="hoursContainer" key="period">
        <div className="digitalShow digitalConditionalShow period" >{this.state.period}</div>
        <span className="digitalSpan period" >
          <select className="digitalInteraction" id="period" onChange={this.handleChange} value={this.state.period} onBlur={this.hideInteraction}>
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </span>
      </div>);
    }
  
    returnArray.unshift(<div className="clockContainers" tabIndex="1" onFocus={this.showInteraction} id="hoursContainer" key="Hours">
        <div className="digitalShow digitalConditionalShow hours" >{timeToShow.hours}</div>
        <span className="digitalSpan hours" key="spanHours"><input  className="digitalInteraction" onBlur={this.hideInteraction} type="text" id="hours" value={timeToShow.hours} onChange={this.handleChange}></input></span>  
      </div>,
      <span key=":">:</span>,
      <div className="clockContainers" tabIndex="2" onFocus={this.showInteraction} id="minutesContainer" key="minutes">
        <div className="digitalShow digitalConditionalShow minutes">{timeToShow.minutes}</div>
        <span className="digitalSpan minutes" key="spanMinutes"><input className="digitalInteraction" onBlur={this.hideInteraction} type="text" id="minutes" value={timeToShow.minutes} onChange={this.handleChange}></input></span>
      </div>);
    return returnArray;
  }
  
    render(){
      return(<div className="relojDigital">
          {this.showTime(this.props.interaction)}
      </div>)
    }
  }