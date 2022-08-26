import {Component} from 'react';
import './App.css';

import './controller/useful';//probar
import {general} from './controller/controller';
import {Disco, Escrito, RelojDigital, RelojAnalogo} from './components/Reloj'
import './i18n';
import { withTranslation } from 'react-i18next';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      hours: 1,
      minutes: 40,
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
    this.changeTime = this.changeTime.bind(this);
    this.updateFeedback = this.updateFeedback.bind(this);
    this.updateResponse = this.updateResponse.bind(this);
  }
  
  componentDidMount(){
    //fetch info from URL
    // this.setState(general.getRandomTime());
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

  parseURLParams(url) {
    var queryStart = url.indexOf("?") + 1,
        queryEnd   = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {}, i, n, v, nv;

    if (query === url || query === "") return;

    for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=", 2);
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) parms[n] = [];
        parms[n].push(nv.length === 2 ? v : null);
    }
    return parms;
  }

  updateResponse(response){
    let stateTime = {
      hours:this.state.hours,
      minutes: this.state.minutes
    }
    let feedback =[];
    feedback = response.feedback.map((feed)=>{
      return (Array.isArray(feed))?this.props.t(...feed):this.props.t(feed);
    });
    if(general.compareTime(stateTime,response.results)){
      let correctspelling = general.compareSpelling(response);
      if( correctspelling === true){
        feedback.push(<span className="greetings" key={response.analysis.phrase}>{general.randomGreeting()}</span>)
      }else{
        feedback.push(<span className="greetings" key={response.analysis.phrase}>{`${general.randomGreeting()} observa en detalle la escritura correcta; ${correctspelling}`}</span>);
      }
    }else{
      feedback.push("La hora escrita NO es correcta.")
    }
    this.setState({answer:response,feedback:feedback})
  }
  render(){
    return (
      <div className="App">
        <div className="container">
          <Disco hours={this.state.hours} minutes={this.state.minutes} period={this.state.period}/>
          <div className="relojes">
            <RelojAnalogo hours={this.state.hours} minutes={this.state.minutes} answer={this.state.config.analogAnswer} response={this.changeTime} interaction={this.state.config.analogInteraction} feedback={null}/>
            <RelojDigital hours={this.state.hours} minutes={this.state.minutes} answer={this.state.config.digitalAnswer} response={this.changeTime} interaction={this.state.config.digitalInteraction} mode={this.state.config.digital}/>
          </div>
          <div className="texto">
            <p className="pregunta">¿Qué hora és?</p>
            <Escrito hours={this.state.hours} minutes={this.state.minutes} answer={this.state.config.writtenAnswer} feedback={this.updateFeedback} interaction={this.state.config.writtenInteraction} mode={this.state.config.writtenType} response={this.updateResponse}/>
            <div className="feedback">{this.state.feedback}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation()(App);