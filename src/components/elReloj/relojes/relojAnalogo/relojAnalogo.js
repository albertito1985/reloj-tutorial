import {Component} from 'react';
import {reloj} from './relojAnalogoController';
import {translate} from '../timeFunctions';
import {CgArrowsHAlt, CgSmileNone} from 'react-icons/cg';
import './relojAnalogo.css'

export class RelojAnalogo extends Component{
    constructor(){
      super();
      this.state = {
        moving: false,
        handle: undefined,
        showMinutes:true,
        oneHandle:undefined,
        clockWork:{
          degrees:{
            hours:0,
            minutes:0
          }  
        }
      };
      this.handle.eventHandlers.mouseUp =this.handle.eventHandlers.mouseUp.bind(this);
      this.handle.eventHandlers.mouseDown =this.handle.eventHandlers.mouseDown.bind(this);
      this.handle.eventHandlers.mouseMove = this.handle.eventHandlers.mouseMove.bind(this);
      this.handle.both.moveView= this.handle.both.moveView.bind(this);
    }
    
    static getDerivedStateFromProps(props,state){
      if(props.answer){
        return {clockWork:{
          degrees:{
            hours:reloj.states.hours,
            minutes:reloj.states.minutes
          }
        }}
      }else{
        let clockWork = {};
      clockWork.degrees = reloj.degreesFromNumber(props.hours, props.minutes);
      reloj.hours = props.hours;
      reloj.minutes = props.minutes;
      reloj.period = translate.time24hto12h({hours: props.hours,minutes:props.minutes}).period;
      reloj.states ={...clockWork.degrees};
      let responseObject = {clockWork};
      if(props.showMinutes !== undefined){
        responseObject.showMinutes = (props.showMinutes === true)?true:false;
      };      
      if(props.oneHandle !== undefined){
        if(props.oneHandle === "minutero" || props.oneHandle === "horario"){
          responseObject.oneHandle = props.oneHandle;
        }
      }
      return {...responseObject};
      }
    }
  
    componentDidMount(){
      this.clockCenter = this.calculateClockCenter();
      if(this.props.interaction === true){
        let manillaContainers = document.getElementsByClassName("manillaContainer");
        manillaContainers.forEach((container)=>{
          if(this.state.oneHandle !== undefined){
            if(this.state.oneHandle === container.id){
              container.classList.add("active");
              container.addEventListener('mousedown',this.handle.eventHandlers.mouseDown);
              container.addEventListener('touchstart',this.handle.eventHandlers.mouseDown);
            }
          }else{
            container.classList.add("active");
            container.addEventListener('mousedown',this.handle.eventHandlers.mouseDown);
            container.addEventListener('touchstart',this.handle.eventHandlers.mouseDown);
          }
        });
        document.addEventListener('mouseup',this.handle.eventHandlers.mouseUp);
        document.addEventListener('mousemove',this.handle.eventHandlers.mouseMove);
        document.addEventListener('touchend',this.handle.eventHandlers.mouseUp);
        document.addEventListener('touchmove',this.handle.eventHandlers.mouseMove);
      }
    }
  
    calculateClockCenter(){
      let reloj = document.getElementById("reloj");
      let relojPosition= reloj.getBoundingClientRect();
      return {
        x: relojPosition.x + (reloj.clientWidth/2),
        y: relojPosition.y + (reloj.clientHeight/2)
      }
    }
  
    componentWillUnmount(){
      let manillaContainers = Array.prototype.slice.call(document.getElementsByClassName("manillaContainer"));
      manillaContainers.forEach((container)=>{
        container.removeEventListener('mousedown',this.handle.eventHandlers.mouseDown);
        container.removeEventListener('touchstart',this.handle.eventHandlers.mouseDown);
      });
      document.removeEventListener('mouseup',this.handle.eventHandlers.mouseUp);
      document.removeEventListener('mousemove',this.handle.eventHandlers.mouseMove);
      document.removeEventListener('touchend',this.handle.eventHandlers.mouseUp);
      document.removeEventListener('touchmove',this.handle.eventHandlers.mouseMove);
    }
  
    handle = {
      both : {
        moveView(timeObject){
          this.setState({clockWork:{
            degrees:{
              hours:timeObject.degrees.hours,
              minutes: timeObject.degrees.minutes
            }
          }})
        },
      },
      eventHandlers:{
        mouseMove:function(e){
          if(this.state.moving === true){
            let coordinates;
            if(e.type ==="touchmove"){
              coordinates = e.touches[0];
            }else{
              coordinates = e;
            }
            let timeObject = reloj.change(coordinates, this.state.handle, this.clockCenter);
            this.handle.both.moveView(timeObject);
            this.props.response({...timeObject.time});
          }
        },
        mouseDown(e){
          e.preventDefault();
          this.clockCenter = this.calculateClockCenter();
          let horario = document.getElementById("horario");
          let minutero = document.getElementById("minutero");
          let handle;
          if (horario.contains(e.target)){
            handle = "horario";
            horario.style.zIndex = 15;
          }else if(minutero.contains(e.target)){
            handle = "minutero";
            minutero.style.zIndex = 15;
          };
          this.setState({moving:true,
                handle:handle
              });
        },
        mouseUp(e){
          if(this.state.moving === true){
            let actualHandle = document.getElementById(this.state.handle);
            actualHandle.style.zIndex = 10; 
            this.setState({moving:false,
            handle: "horario"});
          }
        }
      }
    }
  
    render(){
      return(<div className="reloj" id="reloj">
        <div className="manillaContainer minutero" id="minutero" style={{"--rotation": `${this.state.clockWork.degrees.minutes}`}} ><span className="agarrador" ><CgArrowsHAlt/></span><div className="manilla"></div></div>
        <div className="manillaContainer horario" id="horario" style={{"--rotation": `${this.state.clockWork.degrees.hours}`}} ><span className="agarrador" ><CgArrowsHAlt/></span><div className="manilla"></div></div>
        <div className="numeros">
        <div className="background">
          </div>
          <div className="horasContainer">
            <div className="horas numero1">
              <p className="numero">1</p>
            </div>
            <div className="horas numero2">
              <p className="numero">2</p>
            </div>
            <div className="horas numero3">
              <p className="numero">3</p>
            </div>
            <div className="horas numero4">
              <p className="numero">4</p>
            </div>
            <div className="horas numero5">
              <p className="numero">5</p>
            </div>
            <div className="horas numero6">
              <p className="numero">6</p>
            </div>
            <div className="horas numero7">
              <p className="numero">7</p>
            </div>
            <div className="horas numero8">
              <p className="numero">8</p>
            </div>
            <div className="horas numero9">
              <p className="numero">9</p>
            </div>
            <div className="horas numero10">
              <p className="numero">10</p>
            </div>
            <div className="horas numero11">
              <p className="numero">11</p>
            </div>
            <div className="horas numero12">
              <p className="numero">12</p>
            </div>
          </div>
          {/* <div className={`minutosContainer`} style={{display:(this.state.showMinutes === true && this.state.handle === "minutero")? "flex":"none"}}> */}
          <div className={`minutosContainer${(this.state.showMinutes === true && this.state.handle === "minutero")? " minutosContainerShow":""}`} >
            <div className="minutos numero1">
              <p className="numero">5</p>
            </div>
            <div className="minutos numero2">
              <p className="numero">10</p>
            </div>
            <div className="minutos numero3">
              <p className="numero">15</p>
            </div>
            <div className="minutos numero4">
              <p className="numero">20</p>
            </div>
            <div className="minutos numero5">
              <p className="numero">25</p>
            </div>
            <div className="minutos numero6">
              <p className="numero">30</p>
            </div>
            <div className="minutos numero7">
              <p className="numero">35</p>
            </div>
            <div className="minutos numero8">
              <p className="numero">40</p>
            </div>
            <div className="minutos numero9">
              <p className="numero">45</p>
            </div>
            <div className="minutos numero10">
              <p className="numero">50</p>
            </div>
            <div className="minutos numero11">
              <p className="numero">55</p>
            </div>
          </div>
          
        </div>
        <div className="numero logo">
        </div>
      </div>
      )
    }
  }