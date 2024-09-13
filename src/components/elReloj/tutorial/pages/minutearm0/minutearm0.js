import {Component} from 'react';
import {t} from 'i18next';
import {RelojAnalogo} from '../../../relojes/relojAnalogo/relojAnalogo.js';
import {general} from '../../../relojes/relojGeneral.js';
import {es} from '../../../relojes/relojEscrito/written';
import './minutearm0.css';

class Minutearm0 extends Component{
    constructor(){
        super();
        this.state ={
            hours:10,
            minutes:15,
            phrases:[]
        }
        this.changeTime=this.changeTime.bind(this);
    }
    componentDidMount(){
        this.setState({
            phrases:es.phraseFinder(this.state.hours,this.state.minutes,this.props.esType,false,0)
        });
    }

    changeTime({hours,minutes}){
        let phrases = es.phraseFinder(hours,minutes,this.props.esType,false,0);
        this.setState({
            hours:hours,
            minutes:minutes,
            phrases:phrases
        });
    }
    render(){
        return(
            <div className="phraseTemplate">
                <h1>{t("minuteArm.title")}</h1>
                <p>{t("minuteArm.explanation")}</p>
                <div id="minuteArmContainer">
                    <div className="minutearmGrid minutearmGrid1">
                        <RelojAnalogo response={this.changeTime} interaction={true} hours={this.state.hours} minutes={this.state.minutes} showMinutes={false} oneHandle={"minutero"}/>
                    </div>
                    <div className="minutearmGrid minutearmGrid2">
                        {(this.state.phrases[0]) && (this.state.phrases[0].type === 0) && 
                        <span className="writtenTime phrase0">
                            {general.capitalizeAndPoint(this.state.phrases[0].phrase)}
                        </span>}
                    </div>
                    <div className="minutearmGrid minutearmGrid3">
                    {(this.state.phrases[0]) && (this.state.phrases[0].type === 1) &&
                            <span className="writtenTime phrase1">
                                 {general.capitalizeAndPoint(this.state.phrases[0].phrase)}
                            </span>}
                    </div>
                    <div className="minutearmGrid minutearmGrid4">
                        {(this.state.phrases[0]) && (this.state.phrases[0].type === 2) && 
                        <span className="writtenTime phrase2">
                            {general.capitalizeAndPoint(this.state.phrases[0].phrase)}
                        </span>}
                        {(this.state.phrases[1]) && (this.state.phrases[1].type === 2) && 
                        <span className="writtenTime phrase2">
                            {general.capitalizeAndPoint(this.state.phrases[1].phrase)}
                        </span>}
                    </div>
                </div>
            </div>
        )
    }
}

export default Minutearm0;