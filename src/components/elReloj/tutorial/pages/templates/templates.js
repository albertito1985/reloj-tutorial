import {Component} from 'react';
import {t} from 'i18next';
import {RelojAnalogo} from '../../../relojes/relojAnalogo/relojAnalogo.js';
import {general} from '../../../relojes/relojGeneral.js';
import {es} from '../../../relojes/relojEscrito/written';
import './templates.css';

import {Button,Dropdown} from '../../../../input/input.js';

import {FaRandom} from 'react-icons/fa';

class AnswerTemplate extends Component{
    constructor(){
        super();
        this.state = {
            hours: 13,
            minutes:0
        }
        this.changeTime = this.changeTime.bind(this);
        this.generatePhrase =this.generatePhrase.bind(this);
    }

    changeTime({hours,minutes}){
        this.setState({
            hours:hours,
            minutes:minutes
        });
    }

    generatePhrase(){
        let phrase = es.phraseFinder(this.state.hours, this.state.minutes, this.props.esType, false, false, this.props.answerType,false)[0].phrase;
        let index = phrase.indexOf(" ");
        let begining= general.capitalize(phrase.slice(0,index));
        let end = general.addPoint(phrase.slice(index+1,phrase.length));

        return ([<h2 className ="answerTemplateHalfRightUnderElement" key="begining">{begining}</h2>,<p className ="answerTemplateHalfRightUnderElement" key="end">{end}</p>]);
    }

    render(){
    return(
        <div className="phraseTemplate">
            <h1>{t(`${this.props.name}.title`)}</h1>
            <p>{t(`${this.props.name}.explanation`)}</p>
            <div className="phraseTemplateContent">
                <h2>{t("examples")}</h2>
                <div className="phraseTemplateHalfsContainer">
                    <span className="phraseTemplateHalf">
                        <RelojAnalogo response={this.changeTime} interaction={true} hours={this.state.hours} minutes={this.state.minutes} oneHandle={"minutero"}/>
                    </span>
                    <span className="phraseTemplateHalf answerTemplateHalfRight">
                        <h2>{this.props.question}</h2>
                        <div id="answerTemplateHalfRightUnder">
                            {this.generatePhrase()}
                        </div>
                    </span>
                </div>
            </div>
        </div>
        )
    }
}

class PhraseTemplate1 extends Component{
    constructor(){
        super();
        this.state={
            hours:10,
            minutes:0,
            dropdown:"inactive",
            pic:undefined,
            phrases:[{type:0,phrase:"Las diez en punto."}]
        }
        
        this.picDivs={};
        this.picChanger = this.picChanger.bind(this);
        this.changeTime=this.changeTime.bind(this);
        this.changeState=this.changeState.bind(this);
        this.recieveValue =this.recieveValue.bind(this);
        this.generatePhraseAndImage = this.generatePhraseAndImage.bind(this);
    }
    componentDidMount(){
        this.changeTime(this.props.startTimeObject);
        this.picDivs=this.createPicDivs(this.props.pics);
    }

    createPicDivs(pics){
        let picDivs= {}
        pics.forEach(pic=>{
            picDivs[pic] = <div className={`phraseTemplatePic ${pic}`}></div>
        })
        return picDivs;
    }

    changeState(values){
        this.setState({...values})
    }

    changeTime(time){
        this.props.changeTime({...time, picChanger:this.picChanger,setState:this.changeState});
    }

    picChanger(hours,minutes){
        switch(hours){
            case 1:
                return "phrase101";
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
                return "phrase102";
            case 8:
                return "phrase108";
            case 9:
                return "phrase109";
            case 10:
                return "phrase1010";
            case 11:
                return "phrase1011";
            case 12:
                return "phrase1012";
            case 13:
                return "phrase1013";
            case 14:
                return "phrase1014";
            case 15:
                return "phrase1015";
            case 16:
                return "phrase1016";
            case 17:
                return "phrase1017";
            case 18:
                return "phrase1018";
            case 19:
                return "phrase1019";
            case 20:
                return "phrase1020"
            case 21:
            case 22:
            case 23:
            case 0:
                return "phrase102";
            default:
            break;
        }
    };

    recieveValue(value){
        if(value===`${this.props.correctValue}`){
            setTimeout(()=>{
                this.props.changeNext(true);
            },300);
        }else{
            this.props.changeNext(false);
        }
    };

    generatePhraseAndImage(){
        if(this.state.phrases[0]){
            if(this.state.phrases[0].type === this.props.phraseType){
                return (<>
                    <span className={`writtenTime phrase${this.props.phraseType}`}>{general.capitalizeAndPoint(this.state.phrases[0].phrase)}</span>
                    {(this.state.pic === undefined)?<div className={`phraseTemplatePic`}></div>: this.picDivs[this.state.pic]}
                </>)
            }else if(this.state.phrases[1]){
                if((this.state.phrases[1].type ) === this.props.phraseType){
                    return (<>
                        <span className={`writtenTime phrase${this.props.phraseType}`}>{general.capitalizeAndPoint(this.state.phrases[1].phrase)}</span>
                        {(this.state.pic === undefined)?<div className={`phraseTemplatePic`}></div>: this.picDivs[this.state.pic]}
                    </>)
                }
            }else{
                return <p>{t(`${this.props.name}.emptyMessage`)}</p>
            }
        }else{
            return <p>{t(`${this.props.name}.emptyMessage`)}</p>
        }
    }

    render(){
        return(
            <div className="phraseTemplate">
                <h1>{t(`${this.props.name}.title`)}</h1>
                <p>{t(`${this.props.name}.explanation`)}</p>
                <div className="phraseTemplateContent">
                    <h2>{t("examples")}</h2>
                    <div className="phraseTemplateHalfsContainer">
                        <span className="phraseTemplateHalf">
                            <RelojAnalogo response={this.changeTime} interaction={true} hours={this.state.hours} minutes={this.state.minutes} oneHandle={"minutero"}/>
                        </span>
                        <span className="phraseTemplateHalf phraseTemplateHalfRight">
                            {this.generatePhraseAndImage()}
                        </span>
                    </div>
                </div>
                <div id="dropdownContainer">
                    <h2>{t(`${this.props.name}.question`)}</h2>
                        <p>{t(`${this.props.name}.instructions`)}</p>
                        <p className="continuePrompt">{t("continuePrompt")}</p>
                    <Dropdown type={this.state.dropdown} options={this.props.options} placeholder={t("phraseTemplate.dropdownPlaceholder")} recieveValue={this.recieveValue}/>
                </div>
            </div>
        )
    }
}

class PhraseTemplate2 extends Component{
    constructor(){
        super();
        this.state ={
            Ahours:10,
            Aminutes:0,
            Qhours:10,
            Qminutes:12,
            next:false
        }
        this.changeTime = this.changeTime.bind(this);
        this.changeQuestion = this.changeQuestion.bind(this);
        this.changeState = this.changeState.bind(this);
        this.randomHour = this.randomHour.bind(this);
        this.randomMinutes = this.randomMinutes.bind(this);
    }

    changeState(values){
        this.setState({...values});
    }

    changeTime(time){
        this.props.changeTime({...this.state,...time,setState:this.changeState});
    }

    randomHour(){
        let returnHour= undefined;
       do{
        returnHour=Math.floor(Math.random() * 12) ;
       }while(this.props.validateNewHour(returnHour,this.state.Ahours))
        return returnHour
    }

    randomMinutes(){
        let returnMinutes= undefined;
        if(this.props.type === 0){
            returnMinutes = 0;
        }else{
            do{
                returnMinutes=Math.floor(Math.random() * 55) ;
                returnMinutes = returnMinutes - (returnMinutes%5);
            }while(this.props.validateNewMinutes(returnMinutes, this.state.Aminutes))
        }
        return returnMinutes;
    }

    changeQuestion(){
        this.setState({
            Qhours:this.randomHour(),
            Qminutes:this.randomMinutes(),
            next:false
        })
        this.props.changeNext(false);
    }

    componentDidMount(){
        this.setState({
            Qhours:this.randomHour(),
            Qminutes:this.randomMinutes()
        })
    }
    
    render(){
        let hours= this.state.Qhours;
        let minutes = this.state.Qminutes;
        return(
            <div id="phraseTemplate2">
                <h1>{t(`${this.props.name}.title`)}</h1>
                <div className="phraseTemplateContent" >
                    <div className="phraseTemplateHalfsContainer">
                        <div className="phraseTemplateHalf">
                            <h2>{t("timeQuestion")}</h2>
                            <div id="timeAndButton">
                                <span className={`writtenTime phrase${this.props.type}`}>
                                    {general.capitalizeAndPoint(es.phraseFinder(hours,minutes,this.props.esType,false,this.props.type,2)[0].phrase)}
                                </span>
                                <Button label={<FaRandom/>} type="1" onClick={this.changeQuestion}/>
                            </div>
                            <p>{t("phrase1.excercisesExplanation")}</p>
                            <p className="continuePrompt">{t("continuePrompt")}</p>
                        </div>
                        <div className="phraseTemplateHalf">
                        <RelojAnalogo response={this.changeTime} interaction={true} hours={this.state.Ahours} minutes={this.state.Aminutes}/>
                        </div>



                        
                        
                    </div>
                    <div id="phraseTemplate2EscritoContainer">
                    </div>
                </div>
            </div>
        )
    }
}

export {AnswerTemplate, PhraseTemplate1, PhraseTemplate2};