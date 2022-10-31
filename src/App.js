import {setDefaultNamespace} from 'i18next';
import {Component} from 'react';
import { Routes, Route} from "react-router-dom";
import { withTranslation} from 'react-i18next';

import './App.css';
import Home from './components/home/home';
import {Header} from './components/header/header';
import {Footer} from './components/footer/footer';
import Config from './components/elReloj/config';
import Tutorial from './components/elReloj/tutorial/inicio';
import {LoadingMarkup} from './components/loadingMarkup/loading';

import './controller/useful';
import {general} from './components/elReloj/relojes/relojGeneral';

class App extends Component {
  constructor(){
    super();
    this.state = {
      hours: 0,
      minutes: 0,
      config:{
        analogInteraction: true,
        analogAnswer:false,
        digitalInteraction:true,
        digitalAnswer:false,
        digital:24,
        writtenType:0,
        writtenAnswer:true,
        writtenInteraction:false
      },
      feedback:"",
      answer:null
    }
    setDefaultNamespace('general')
    this.changeTime = this.changeTime.bind(this);
    this.updateFeedback = this.updateFeedback.bind(this);
    this.updateResponse = this.updateResponse.bind(this);
  }
  
  componentDidMount(){
  }

  changeTime({hours,minutes}){
    this.setState({
      hours:hours,
      minutes:minutes,
    })
  }

  updateFeedback(timeObject){
    this.setState({feedback: timeObject.feedback})
  }

  updateResponse(response){
    console.log({response,state:this.state})
    let stateTime = {
      hours:this.state.hours,
      minutes: this.state.minutes
    }
    if(general.compareTime(stateTime,response.results)){
      let correctspelling = general.compareSpelling(response);
      if( correctspelling === true){
        this.setState({answer:response,feedback:[<span className="greetings" key={response.analysis.phrase}>{general.randomGreeting()}</span>, ...response.feedback]})
      }else{
        this.setState({answer:response,feedback:[<span className="greetings" key={response.analysis.phrase}>{`${general.randomGreeting()} observa en detalle la escritura correcta; ${correctspelling}`}</span>, ...response.feedback]})
      }
    }else{
      this.setState({feedback:"La hora escrita NO es correcta."})
    }
  }
  render(){
    return (
      <div className="App">
        <div className="container">
        <Header/>
          <div className="contentBody">
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/elreloj/*" element={<Config/>}/>
              <Route path="/elreloj/tutorial/*" element={<Tutorial/>}/>
            </Routes>
          </div>
        <Footer/>
        </div>
      </div>
    );
  }
}

export default withTranslation()(App);
