import { t, setDefaultNamespace } from 'i18next';
import React, {Component} from 'react';
import { withTranslation } from 'react-i18next';
import '../pages.css';

import {RelojAnalogo} from '../relojes/relojAnalogo/relojAnalogo';
import {RelojDigital} from '../relojes/relojDigital/relojDigital';
import {Button,Dropdown,TextInput} from '../../input/input';
import NextBack from '../tutorial/NextBack';
import {AiFillCheckCircle} from 'react-icons/ai';
import {FaRandom} from 'react-icons/fa';
import { Konfettikanone } from "react-konfettikanone";

import {es} from '../relojes/relojEscrito/written';
import {general} from '../relojes/relojGeneral';


import { isContentEditable } from '@testing-library/user-event/dist/utils';
import { toHaveDisplayValue } from '@testing-library/jest-dom/dist/matchers';


class Tutorial extends Component {
    constructor(){
        super();
        this.state={
            page:0,
            next:undefined,
            back:undefined,
            confetti:false
        };
        setDefaultNamespace('elreloj');
        this.pages=["home"];
        this.config ={};
        this.moments = {
            actual:[],
            duration:{
                parts: 1,
                minutearm:1,
                phrase1:3,
                min15and30:1,
                phrase2:2,
                phrase3:2,
                phrases2and3:2,
                periods:1,
                answer:3,
            },
            navigation:{
                home: [false,true],
                parts0 : [true,true],
                phrase10: [true,false],
                phrase11: [true, false],
                phrase12:[true, false],
                minutearm0:[true, true],
                phrase20:[true, false],
                phrase21:[true, false],
                min15and300:[true, false],
                phrase30:[true,false],
                phrase31:[true, false],
                phrases2and30:[true, true],
                phrases2and31:[true, false],
                periods0:[true, false],
                answer0:[true, true],
                answer1:[true, true],
                answer2:[true, true],
                end:[null,null]
            },
            order:[
                "answer",
                "parts",
                "minutearm",
                "phrase1",
                "min15and30",
                "phrase2",
                "phrase3",
                "phrases2and3",
                "periods"
            ]
        };
        this.generateContent=this.generateContent.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.changeNext = this.changeNext.bind(this);
        this.restart = this.restart.bind(this);
        this.confetti = this.confetti.bind(this);
    }

    nextPage(){
        let pagenumber;
        let back = undefined;
        let next = undefined;
        if(this.state.page === undefined){
            pagenumber = 0
        }else{
            let temp = this.state.page;
            pagenumber =++temp;
        }
        back = this.moments.navigation[this.pages[pagenumber]][0];
        next = this.moments.navigation[this.pages[pagenumber]][1];
        this.setState({
            page:pagenumber,
            back:back,
            next:next
        })
        window.scrollTo(0,0);
    }

    previousPage(){
        let pagenumber;
        let back = undefined;
        let next = undefined;
        if(this.state.page === 0){
            pagenumber = undefined
        }else{
            let temp = this.state.page;
            pagenumber = --temp;
        }
        back = this.moments.navigation[this.pages[pagenumber]][0];
        next = this.moments.navigation[this.pages[pagenumber]][1];
        this.setState({
            page:pagenumber,
            back:back,
            next:next
        })
    }

    restart(){
        this.setState({
            page:0,
            next:true,
            back:false
        })
    }

    componentDidMount(){
        // decoding the URL
        let urlString = window.location.href;
        let queryStart = urlString.indexOf("?")+1;
        let query = urlString.slice(queryStart,urlString.length);
        let pairs = query.replace(/\+/g, " ").split("&");
        let stateUpdate = {}
        pairs.forEach((pair)=>{
            let nv = pair.split("=", 2);
            let n = decodeURIComponent(nv[0]);
            let v = decodeURIComponent(nv[1]);
            if(v==="true"||v==="false"){
                stateUpdate[n] = Boolean(v);
            }else{
                stateUpdate[n] = v;
            }
            
        });
        //splitting the configuration and the moments values
        let data = Object.keys(stateUpdate);
        data.forEach((value)=>{
            if(value ==="lang" ){
                this.config[value]=stateUpdate[value];
            }else if(value ==="esType"){
                if(stateUpdate[value]==="spain"){
                    this.config[value]=1;
                }else{
                    this.config[value]=0;
                }
                
            }else{
                this.moments.actual.push(value);
            }
        });
        //changing the order of the moments to the actual order
        let newOrder=[];
        this.moments.order.forEach((moment)=>{
            if(this.moments.actual.includes(moment)){
                newOrder.push(moment);
            };
 
        })
        this.moments.actual =newOrder;
        //generating the series of pages according to the moments.
        this.moments.actual.forEach((value)=>{
            for(let i=0;i<this.moments.duration[value];i++){
                this.pages.push(`${value+i}`)
            }
        })
        this.pages.push("end");
        //adjusting the next/back buttons to the first "slide"
        let back = this.moments.navigation[this.pages[this.state.page]][0];
        let next = this.moments.navigation[this.pages[this.state.page]][1];
        this.setState({
            back:back,
            next:next
        })
    }

    confetti(value){
        if(value===false){
            if(document.getElementsByClassName("confetti")[0]){
                let confetti= document.getElementsByClassName("confetti")[0]
                confetti.classList.add("invisible");
            }
        }
        this.setState({
            confetti:value
        })
    }

    generateContent(){
        let componentThis=this;
        function createElement(page, props ={}){
            let specialProps={
                phrase10:{
                    ...props,
                    name:"phrase1",
                    pics:[
                        "phrase101",
                        "phrase102",
                        "phrase108",
                        "phrase109",
                        "phrase1010",
                        "phrase1011",
                        "phrase1012",
                        "phrase1013",
                        "phrase1014",
                        "phrase1015",
                        "phrase1016",
                        "phrase1017",
                        "phrase1018",
                        "phrase1019",
                        "phrase1020",
                        "phrase102"
                    ],
                    options:[
                        {label:"A la una en punto.",value:1},
                        {label:"A las dos en punto.",value:2},
                        {label:"A las tres en punto.",value:3},
                        {label:"A las cuatro en punto.",value:4},
                        {label:"A las cinco en punto.",value:5},
                        {label:"A las seis en punto.",value:6},
                        {label:"A las siete en punto.",value:7},
                        {label:"A las ocho en punto.",value:8},
                        {label:"A las nueve en punto.",value:9},
                        {label:"A las diez en punto.",value:10},
                        {label:"A las once en punto.",value:11},
                        {label:"A las doce en punto.",value:12},
                    ],
                    changeTime:({hours,minutes,picChanger,setState})=>{
                        let newState={}
                        if(minutes === 0){
                            if(hours===1 || hours === 13){
                                newState.dropdown = "";
                            }
                            newState.pic = picChanger(hours,minutes);
                            newState.phrases = es.phraseFinder(hours,minutes,props.esType,false,false,0);
                        }else{
                            newState.dropdown = "inactive";
                            newState.pic = undefined;
                            newState.phrases = [];
                        }
                        newState.hours = hours;
                        newState.minutes = minutes;
                        setState({...newState});
                    },
                    correctValue:1,
                    phraseType:0,
                    startTimeObject:{
                        hours:10,
                        minutes:0
                    }
                },
                phrase20:{
                    ...props,
                    name:"phrase2",
                    pics:[
                        "phrase101",
                        "phrase102",
                        "phrase108",
                        "phrase109",
                        "phrase1010",
                        "phrase1011",
                        "phrase1012",
                        "phrase1013",
                        "phrase1014",
                        "phrase1015",
                        "phrase1016",
                        "phrase1017",
                        "phrase1018",
                        "phrase1019",
                        "phrase1020",
                        "phrase102",
                        "phrase1025"
                    ],
                    options:[
                        {label:"A la una y cinco.",value:5},
                        {label:"A la una y diez.",value:10},
                        {label:"A la una y cuarto.",value:15},
                        {label:"A la una y veinte.",value:20},
                        {label:"A la una y veinticinco.",value:25},
                        {label:"A la una y media.",value:30},
                        {label:"A la una y treinta y cinco.",value:35}
                    ],
                    changeTime:({hours,minutes,picChanger,setState})=>{
                        let newState={};
                        newState.phrases = es.phraseFinder(hours,minutes,props.esType,false,0);
                        if(minutes > 0 && minutes < 41){
                            if((hours===1 || hours === 13) && minutes === 15){
                                newState.dropdown = "";
                                newState.pic = "phrase1025";
                            }else{
                                newState.pic = picChanger(hours,minutes);
                                newState.dropdown = "inactive";
                            }
                        }else{
                            newState.pic = undefined;
                        }
                        newState.hours = hours;
                        newState.minutes = minutes;
                        setState({...newState});
                    },
                    correctValue:15,
                    phraseType:1,
                    startTimeObject:{
                        hours:10,
                        minutes:5
                    }
                },
                phrase30:{
                    ...props,
                    name:(props.esType===0)?"phrase3A":"phrase3B",
                    pics:[

                        "phrase101",
                        "phrase102",
                        "phrase108",
                        "phrase109",
                        "phrase1010",
                        "phrase1011",
                        "phrase1012",
                        "phrase1013",
                        "phrase1014",
                        "phrase1015",
                        "phrase1016",
                        "phrase1017",
                        "phrase1018",
                        "phrase1019",
                        "phrase1020",
                        "phrase102",
                        "phrase1026"
                    ],
                    options:[
                        {label:general.capitalizeAndPoint(es.phraseFinder(1,35,props.esType,false,0,1,false)[1].phrase),value:35},
                        {label:general.capitalizeAndPoint(es.phraseFinder(1,40,props.esType,false,0,1,false)[1].phrase),value:40},
                        {label:general.capitalizeAndPoint(es.phraseFinder(1,45,props.esType,false,0,1,false)[0].phrase),value:45},
                        {label:general.capitalizeAndPoint(es.phraseFinder(1,50,props.esType,false,0,1,false)[0].phrase),value:50},
                        {label:general.capitalizeAndPoint(es.phraseFinder(1,55,props.esType,false,0,1,false)[0].phrase),value:55}
                    ],
                    changeTime:({hours,minutes,picChanger,setState})=>{
                        let newState={};
                        newState.phrases = es.phraseFinder(hours,minutes,props.esType,false,0);
                        if(minutes > 34 && minutes < 60){
                            
                            if((hours===1 || hours === 13) && minutes === 50){
                                newState.dropdown = "";
                                newState.pic = "phrase1026";
                            }else{
                                newState.pic = picChanger(hours,minutes);
                                newState.dropdown = "inactive";
                            }
                        }else{
                            newState.pic = undefined;
                        }
                        newState.hours = hours;
                        newState.minutes = minutes;
                        setState({...newState});
                    },
                    correctValue:50,
                    phraseType:2,
                    startTimeObject:{
                        hours:9,
                        minutes:40
                    }
                },
                phrase31:{
                    ...props,
                    name:(props.esType===0)?"phrase3A":"phrase3B",
                    type:2,
                    changeTime: (state)=>{
                        let newState={Aminutes:state.minutes}
                        if(state.hours>12){
                            newState.Ahours = state.hours-12
                        }else{
                            newState.Ahours = state.hours
                        }
                        if(state.minutes >34){
                            if(state.Qhours === 0 || state.Qhours === 12){
                                if(state.hours=== 0 || state.hours === 12){
                                    newState.Ahours=state.Qhours;
                                }
                            }
                            if(state.hours===state.Qhours && state.minutes === state.Qminutes){
                                newState.next = true;
                                props.changeNext(true);
                            }else{
                                newState.next = false;
                                props.changeNext(false);
                            }
                        }else{
                            if(state.next === true){
                                newState.next = false;
                                props.changeNext(false);
                            }
                        }
                        state.setState({...newState});
                    },
                    validateNewHour(hour,actualHour){
                        if(hour === actualHour){
                            return true;
                        }else{
                            return false;
                        }
                    },
                    validateNewMinutes(minutes,actualMinutes){
                        if(minutes === actualMinutes){
                            return true;
                        }else if(minutes === 0 ||minutes<35){
                            return true;
                        }else{
                            return false;
                        }
                    }
                },
                phrase21:{
                    ...props,
                    name:"phrase2",
                    type:1,
                    changeTime: (state)=>{
                        let newState={Aminutes:state.minutes}
                    if(state.hours>12){
                        newState.Ahours = state.hours-12;
                    }else{
                        newState.Ahours = state.hours;
                    }
                    if(state.Aminutes >0 && state.Aminutes<41){
                        if(state.Qhours === 0 || state.Qhours === 12){
                            if(state.Ahours=== 0 || state.Ahours === 12){
                                newState.Ahours=state.Qhours;
                            }
                        }
                        if(newState.Ahours===state.Qhours && newState.Aminutes === state.Qminutes){
                            newState.next = true;
                            props.changeNext(true);
                        }else{
                            newState.next = false;
                            props.changeNext(false);
                        }
                    }else{
                        if(state.next === true){
                            newState.next = false;
                            props.changeNext(false);
                        }
                    }
                    state.setState({...newState});
                    },
                    validateNewHour(hour,actualHour){
                        if(hour === actualHour){
                            return true;
                        }else{
                            return false;
                        }
                    },
                    validateNewMinutes(minutes,actualMinutes){
                        if(minutes === actualMinutes){
                            return true;
                        }else if(minutes === 0 || minutes>40){
                            return true;
                        }else{
                            return false;
                        }
                    }
                },
                phrase12:{
                    ...props,
                    name:"phrase1",
                    type:0,
                    changeTime: (state)=>{
                        let newState={Aminutes: state.minutes}
                    if(state.hours>12){
                        newState.Ahours = state.hours-12;
                    }else{
                        newState.Ahours = state.hours;
                    }
                    if(state.minutes === 0){
                        if(state.Qhours === 0 || state.Qhours === 12){
                            if(state.hours=== 0 || state.hours === 12){
                                newState.Ahours=state.Qhours;
                            }
                        }
                        if(state.hours===state.Qhours){
                            newState.next = true;
                            props.changeNext(true);
                        }else{
                            newState.next = false;
                            props.changeNext(false);
                        }
                    }else{
                        if(state.next === true){
                            newState.next = false;
                            props.changeNext(false);
                        }
                    }
                    state.setState({...newState});
                    },
                    validateNewHour(hour,actualHour){
                        if(hour === actualHour){
                            return true;
                        }else{
                            return false;
                        }
                    }
                },
                answer2:{
                    name:"answer2",
                    answerType:1,
                    question:"¿A qué hora juegas?"
                },
                answer1:{
                    name:"answer1",
                    answerType:2,
                    question:"¿Qué hora es?"
                },
                end:{
                    restart:componentThis.restart,
                    confetti:componentThis.confetti
                }
            };
            let parts ={
                home: <Home {...props}/>,
                parts0 : <Parts0 {...props}/>,
                phrase10: <PhraseTemplate1 {...specialProps["phrase10"]}/>,
                phrase11: <Phrase11 {...props}/>,
                phrase12: <PhraseTemplate2 {...specialProps["phrase12"]}/>,
                minutearm0: <Minutearm0 {...props}/>,
                phrase20: <PhraseTemplate1 {...specialProps["phrase20"]}/>,
                phrase21: <PhraseTemplate2 {...specialProps["phrase21"]}/>,
                min15and300:<Minutes15and30 {...props}/>,
                phrase30:<PhraseTemplate1 {...specialProps["phrase30"]}/>,
                phrase31:<PhraseTemplate2 {...specialProps["phrase31"]}/>,
                phrases2and30: <Phrase2and30 {...props}/>,
                phrases2and31: <Phrase2and31 {...props}/>,
                periods0: <Periods0 {...props}/>,
                answer0: <Answer0 {...props}/>,
                answer1: <AnswerTemplate {...specialProps["answer1"]}/>,
                answer2: <AnswerTemplate {...specialProps["answer2"]}/>,
                end: <End {...specialProps["end"]}/>
            }
            return parts[page];
        }
        const myComponent = createElement(this.pages[this.state.page], {changeNext:this.changeNext,esType:this.config.esType});
        return myComponent;
        
    }

    changeNext(value){
        this.setState({next:value});
    }

    render(){
        return(
            <div className="pages">
                <Konfettikanone className="confetti" particles={200} colors={["#F8CA00","#E97F02", "#BD1550", "#F7F7F7"]} launch={this.state.confetti} onLaunchEnd={this.confetti.bind(this,false)}/>
                <div className="tutorialContent">
                {this.generateContent()}
                {(this.state.page !== this.pages.length-1) && <NextBack 
                    back={(this.state.back)?true:"inactive"}
                    next={(this.state.next)?true:"inactive"}
                    backFunction={this.previousPage}
                    nextFunction={this.nextPage}
                />}
                </div>
            </div>
        )
    }
}

class Home extends Component{
    render(){
        return(
                <div className="phraseTemplate">
                    <h1>{t('titulo')}</h1>
                </div>
        )
    }
}

class Answer0 extends Component{
    render(){
        return(
            <div className="answer0">
                <h1>{t('answer0.title')}</h1>
                <p>{t('answer0.explanation')}</p>
                <h2>¿Que hora es?</h2>
                <h2>{t('answer0.and')}</h2>
                <h2>¿A que hora ...?</h2>
            </div>
            )
    }
}

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

class Parts0 extends Component{
    constructor(){
        super();
        this.state = {
            hours: undefined,
            minutes:undefined,
            part:undefined
        }
        this.highlight=this.highlight.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.unHighlight = this.unHighlight.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
    }

    componentDidMount(){
        let buttons = document.getElementById("partsHalfRight").children;
        buttons.forEach((button)=>{
            button.addEventListener("touchend",  this.clickHandler);
            button.addEventListener("touchmove", (e)=>e.preventDefault());
        })
        const d = new Date();
        this.setState({
            hours:d.getHours(),
            minutes:d.getMinutes()
        })
    }

    componentWillUnmount(){
        let buttons = document.getElementById("partsHalfRight").children;
        buttons.forEach((button)=>{
            button.removeEventListener("touchend",  this.clickHandler);
            button.removeEventListener("touchmove", (e)=>e.preventDefault());
        })
    }

    highlight(e){
        let target;
        let targetWord = e.target.attributes.name.value;
        switch(targetWord){
            case "horas":
                target = document.querySelector(".horasContainer");
            break;
            case "minutos":
                target = document.querySelector(".minutosContainer");
            break;
            case "horario":
                target = document.querySelector("#horario .manilla");
            break;
            case "minutero":
                target = document.querySelector("#minutero .manilla");
            break;
            default:
            break;
        }
        target.classList.add("analogHighlight");
        this.setState({part:targetWord})
    }

    unHighlight(){
        let target;
        if(typeof this.state.part !=="undefined"){
            switch(this.state.part){
                case "horas":
                    target = document.querySelector(".horasContainer");
                break;
                case "minutos":
                    target = document.querySelector(".minutosContainer");
                break;
                case "horario":
                    target = document.querySelector("#horario .manilla");
                break;
                case "minutero":
                    target = document.querySelector("#minutero .manilla");
                break;
                default:
                break;
            }
        target.classList.remove("analogHighlight");
        }
    }

    clickHandler(e){
        if(e.target.id === this.state.part){
            this.unHighlight();
            this.setState({part:undefined});
        }else{
            this.unHighlight();
            this.highlight(e);
        }
    }

    render(){
        return(
                <div className="phraseTemplate">
                    <h1>{t('parts.title')}</h1>
                    <p>{t('parts.explanation')}</p>
                    <div className="phraseTemplateHalfsContainer parts0">
                        <div className="phraseTemplateHalf" id="partsHalfLeft">
                        <RelojAnalogo hours={this.state.hours} minutes={this.state.minutes}/>
                        </div>
                        <div className="phraseTemplateHalf" id="partsHalfRight">
                            <div className={`switchKlockansDelar${(this.state.part==="horas")?" active":""}`} onClick={this.clickHandler} id="horas" name="horas">Horas</div>
                            <div className={`switchKlockansDelar${(this.state.part==="minutos")?" active":""}`} onClick={this.clickHandler} id="minutos" name="minutos">Minutos</div>
                            <div className={`switchKlockansDelar${(this.state.part==="horario")?" active":""}`} onClick={this.clickHandler} id="horario" name="horario">Horario</div>
                            <div className={`switchKlockansDelar${(this.state.part==="minutero")?" active":""}`} onClick={this.clickHandler} id="minutero" name="minutero">Minutero</div>
                        </div>
                    </div>
                    <div id="parts02">
                        <p>
                            {(this.state.part === undefined) && t('parts.prompt')}
                            {(this.state.part === "horas") && t('parts.horas')}
                            {(this.state.part === "minutos") && t('parts.minutos')}
                            {(this.state.part === "horario") && t('parts.horario')}
                            {(this.state.part === "minutero") && t('parts.minutero')}
                        </p>
                    </div>
                </div>
        )
    }
}

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

class Phrase11 extends Component{
    constructor(){
        super();
        this.options=[
            {label:"A la una en punto.",value:1},
            {label:"A las dos en punto.",value:2},
            {label:"A las tres en punto.",value:3},
            {label:"A las cuatro en punto.",value:4},
            {label:"A las cinco en punto.",value:5},
            {label:"A las seis en punto.",value:6},
            {label:"A las siete en punto.",value:7},
            {label:"A las ocho en punto.",value:8},
            {label:"A las nueve en punto.",value:9},
            {label:"A las diez en punto.",value:10},
            {label:"A las once en punto.",value:11},
            {label:"A las doce en punto.",value:12},
        ]
        this.recieveValue=this.recieveValue.bind(this);
    }
    recieveValue(value){
        if(value==="12"){
            setTimeout(()=>{
                this.props.changeNext(true);
            },300);
        }else{
            this.props.changeNext(false);
        }
    }
    render(){
        return(
            <div id="phrase11">
                <h1>{t("phrase1.title")}</h1>
                <p>{t("phrase1.explanation2")}</p>
                <p className="continuePrompt">{t("continuePrompt")}</p>
                <div id="dropdownContainer">
                    <Dropdown options={this.options} placeholder={t("phraseTemplate.dropdownPlaceholder")} recieveValue={this.recieveValue}/>
                </div>
            </div>
        )
    }
}

class Minutes15and30 extends Component{
    constructor(){
        super();
        this.state ={
            field1:false,
            field2:false,
            next:false
        }
        this.recieveData = this.recieveData.bind(this);
    }
    
    recieveData({field,value}){
        if(this.state.field1===false && field==="field1" && /cuarto/i.test(value)){
            this.setState({field1:true});
            if(this.state.field2 === true)this.props.changeNext(true);
        }else if(this.state.field2===false && field==="field2" && /media/i.test(value)){
            this.setState({field2:true});
            if(this.state.field1 === true)this.props.changeNext(true);
        }

    }
    render(){
        let field1 = this.state.field1;
        let field2 = this.state.field2;
        return(
            <div id="minutes15and30">
                <h1>{t("minutes15and30.title")}</h1>
                <p>{t("minutes15and30.explanation")}</p>
                <p className="continuePrompt">{t("continuePrompt")}</p>
                <div id="minutes15and30AnswersContainer">
                    <div className="minutes15and30FieldContainer">
                        <h2>15 =</h2>
                        <TextInput name="field1" type={(field1)?"inactive":""}recieveData={this.recieveData} placeholder={t("minutes15and30.placeholder")}/>
                        <span className="minutes15and30FieldcheckContainer">
                            {(field1) && <AiFillCheckCircle className="minutes15and30FieldCheck" id ="minutes15and30Field1check"/>}
                        </span>
                        </div>
                    <div className="minutes15and30FieldContainer">
                        <h2>30 =</h2>
                        <TextInput name="field2" type={(field2)?"inactive":""} recieveData={this.recieveData} placeholder={t("minutes15and30.placeholder")}/>
                        <span className="minutes15and30FieldcheckContainer">
                        {this.state.field2 && <AiFillCheckCircle className="minutes15and30FieldCheck" id ="minutes15and30Field2check"/>}
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
                
                    {/* <div> */}
                    <h2>{t(`${this.props.name}.question`)}</h2>
                        <p>{t(`${this.props.name}.instructions`)}</p>
                        <p className="continuePrompt">{t("continuePrompt")}</p>
                    {/* </div> */}
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

class Phrase2and30 extends Component{
    constructor(){
        super();
        this.state = {
            hours:undefined,
            minutes:undefined,
            phrases:[]
        };
        this.generatePhrases=this.generatePhrases.bind(this);
        this.changeTime=this.changeTime.bind(this);
    };

    componentDidMount(){
        this.setState({
            hours:10,
            minutes:37,
            phrases:es.phraseFinder(10,37,this.props.esType,false,false,0)
        })
    }

    changeTime({hours,minutes}){
        let newState={
            hours:hours,
            minutes:minutes,
            phrases:[]
        }
        
        if(minutes>34 && minutes<41){
            newState.phrases = es.phraseFinder(hours,minutes,this.props.esType,false,false,0)
        }
        this.setState(newState);
    }

    generatePhrases(){
        if(this.state.phrases.length >0){
            return <>
                <span className={`writtenTime phrase1`}>{general.capitalizeAndPoint(this.state.phrases[0].phrase)}</span>
                <span>ó</span>
                <span className={`writtenTime phrase2`}>{general.capitalizeAndPoint(this.state.phrases[1].phrase)}</span>
            </>
        }else{
            return <p>{t(`phrases2and3.emptyMessage`)}</p>
        }
    }

    render(){
        return(
            <div className="phraseTemplate">
                <h1>{t(`phrases2and3.title`)}</h1>
                <p>{t(`phrases2and3.explanation`)}</p>
                <div className="phraseTemplateContent">
                     <h2>{t("examples")}</h2>
                    <div className="phraseTemplateHalfsContainer">
                        <span className="phraseTemplateHalf">
                            <RelojAnalogo response={this.changeTime} interaction={true} hours={this.state.hours} minutes={this.state.minutes} oneHandle="minutero"/>
                        </span>
                        <span className="phraseTemplateHalf phraseTemplateHalfRight2och3">
                            {this.generatePhrases()}
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}

class Phrase2and31 extends Component{
    constructor(props){
        super();
        this.state = {
            correctAnswer:false
        };
        this.options=[
            {label:general.capitalizeAndPoint(es.phraseFinder(13,35,props.esType,false,2,0)[0].phrase),value:35},
            {label:general.capitalizeAndPoint(es.phraseFinder(13,36,props.esType,false,2,0)[0].phrase),value:36},
            {label:general.capitalizeAndPoint(es.phraseFinder(13,37,props.esType,false,2,0)[0].phrase),value:37},
            {label:general.capitalizeAndPoint(es.phraseFinder(13,38,props.esType,false,2,0)[0].phrase),value:38},
            {label:general.capitalizeAndPoint(es.phraseFinder(13,39,props.esType,false,2,0)[0].phrase),value:39},
            {label:general.capitalizeAndPoint(es.phraseFinder(13,40,props.esType,false,2,0)[0].phrase),value:40},
        ]
        this.recievevalue=this.recieveValue.bind(this);
    };

    recieveValue(value){
        if(value==="40"){
            this.setState({correctAnswer:true});
            this.props.changeNext(true);
        }else{
            if(this.state.correctAnswer === true){
                this.setState({correctAnswer:false});
                this.props.changeNext(false);
            }
        }
    }

    render(){   
        return(
            <div className="phraseTemplate">
                <h1>{t(`phrases2and3.title`)}</h1>
                <div id="phrases2and3Content">
                    <h2 id="phrases2and3Question">{t(`phrases2and3.question`)}</h2>
                    <p>{t(`phrases2and3.instructions`)}</p>
                </div>
                <p className="continuePrompt">{t("continuePrompt")}</p>
                <Dropdown options={this.options} placeholder={t('phraseTemplate.dropdownPlaceholder')} recieveValue={this.recievevalue}/>
                <div id="casaBlanca"></div>
            </div>
        )
    }
}

class Periods0 extends Component{
    constructor(){
        super();
        this.state = {
            hours:10,
            minutes:0,
            phrases:[],
            endings:[],
            chosenPhrase:undefined,
            chosenEnding:undefined
        };
        this.changeTime = this.changeTime.bind(this);
        this.chosePhrase = this.chosePhrase.bind(this);
        this.choseEnding = this.choseEnding.bind(this);
    };

    componentDidMount(){
        let newState={}
        newState.phrases = es.phraseFinder(this.state.hours, this.state.minutes, this.props.esType, false, false, 0,false);
        newState.endings = es.endings(this.state.hours, null,true);
        this.setState(newState);
    }

    changeTime({hours,minutes}){
        let newState={
            hours:hours,
            minutes:minutes,
            phrases:[],
            chosenPhrase:undefined,
            chosenEnding:undefined
        }
        newState.phrases = es.phraseFinder(this.state.hours, this.state.minutes, this.props.esType, false, false, 0,false);
        newState.endings = es.endings(this.state.hours, null,true);
        this.setState(newState);
    }

    chosePhrase(Item){
        let newState={chosenPhrase:undefined}
        if(((Item + " ..") ===this.state.chosenPhrase)||(Item ===this.state.chosenPhrase)){
            if(this.state.chosenEnding){
                newState.chosenEnding = "... "+this.state.chosenEnding;
            }else{
                //do nothing
            }
        }else{
            if(this.state.chosenEnding){
                newState.chosenEnding = this.state.chosenEnding.replace("... ","");
                newState.chosenPhrase=Item.replace(" ..","");
            }else{
                newState.chosenPhrase = Item + " ..";
            }
        }
        if(this.state.chosenEnding && newState.chosenPhrase){
            this.props.changeNext(true)
        }else{
            this.props.changeNext(false)
        }
        this.setState({...newState})
    }

    choseEnding(Item){
        let newState={chosenEnding:undefined}
        if(("... "+Item===this.state.chosenEnding)|| Item===this.state.chosenEnding){
            if(this.state.chosenPhrase){
                newState.chosenPhrase=this.state.chosenPhrase+" ..";
            }else{
                //do nothing
            }
        }else{
            if(this.state.chosenPhrase){
                newState.chosenEnding = Item.replace("... ","");
                newState.chosenPhrase=this.state.chosenPhrase.replace(" ..","");
            }else{
                newState.chosenEnding = "... "+Item;
            }
        }

        if(this.state.chosenPhrase && newState.chosenEnding){
            this.props.changeNext(true);
        }else{
            this.props.changeNext(false);
        }

        this.setState({...newState});
    }

    generatePhrases(){
        let phrasesDivs = this.state.phrases.map((phrase)=>{
            return <span onClick={this.chosePhrase.bind(this,general.capitalize(phrase.phrase))} key={`phrase${phrase.type}`} className={`writtenTime phrase${phrase.type}`}>{general.capitalize(phrase.phrase)} ...</span>
        })
        return phrasesDivs;
    }

    generateEndings(){
        let phrasesDivs = this.state.endings.map((ending)=>{
            let type = undefined;
            switch(ending){
                case " de la mañana":
                    type=1;
                    break;
                case " de la tarde":
                    type=2;
                    break;
                case " de la noche":
                    type=3;
                    break;
                default:
                    break;
            }
            return <span onClick={this.choseEnding.bind(this,ending)} key={`period${type}`} className={`writtenTime ending ending${type}`}>...{ending}.</span>
        })
        return phrasesDivs;
    }
    
    render(){   
        return(
            <div className="phraseTemplate">
                <h1>{t(`periods0.title`)}</h1>
                <p>{t("periods0.explanation")}</p>
                <div className="periods0table">
                    <div className="periods0row" id="periods0row0">
                        <div className="periods0cell periods0cellRight" id="periods0row0cell0">01 - 12</div>
                        <div className="periods0cell periods0cellLeft" id="periods0row0cell1">'... de la mañana.'</div>
                    </div>
                    <div className="periods0row" id="periods0row1">
                        <div className="periods0cell periods0cellRight" id="periods0row1cell0">13 - 19</div>
                        <div className="periods0cell periods0cellLeft" id="periods0row1cell1">'... de la tarde.'</div>
                    </div>
                    <div className="periods0row" id="periods0row2">
                        <div className="periods0cell periods0cellRight" id="periods0row2cell0">19 - 00</div>
                        <div className="periods0cell periods0cellLeft" id="periods0row2cell1">'... de la noche.'</div>
                    </div>
                </div>
                <p>{t("periods0.observe")}</p>
                <div className="phraseTemplateContent" id="periods0Content">
                    <h2>{t("examples")}</h2>
                    <div className="phraseTemplateHalfsContainer">
                        <span className="periods0Half">
                            <div className="completeClock">
                            <RelojAnalogo response={this.changeTime} interaction={true} hours={this.state.hours} minutes={this.state.minutes}/>
                            <RelojDigital
                                mode="24"
                                hours={this.state.hours}
                                minutes={this.state.minutes}/>
                            </div>
                            
                        </span>
                        <span className="periods0Half periods0HalfStretch">
                            <div className="periods0HalfHalf">
                                <h2>{t("periods0.phrase")}</h2>
                                {this.generatePhrases()}
                            </div>
                            <div className="periods0HalfHalf">
                                <h2>{t("periods0.periods")}</h2>
                                {this.generateEndings()}
                            </div>
                        </span>
                    </div>
                </div>
                <div id="periods0UnderContent">
                        <h2>{t(`periods0.question`)}</h2>
                        <p>{t(`periods0.instructions`)}</p>
                        <span id="horaEscogidaPhantom">
                            {(this.state.chosenPhrase || this.state.chosenEnding) &&
                            <span id="horaEscogida">
                                {`${this.state.chosenPhrase|| ""}${this.state.chosenEnding||""}.`}
                            </span>}
                        </span>
                </div>
            </div>
        )
    }
}

class End extends Component{
    componentDidMount(){
        this.props.confetti(true);
    }

    componentWillUnmount(){
        this.props.confetti(false);
    }
    render(){
        return( 
            <div className="phraseTemplate">
                <h1>{t('end.title')}</h1>
                <p>{t('end.explanation')}</p>
                <Button type={1} label={t('end.buttonLabel')} onClick={this.props.restart}/>
            </div>
                
        )
    }
}

export default withTranslation('elreloj')(Tutorial);