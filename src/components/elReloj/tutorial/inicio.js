import { t, setDefaultNamespace } from 'i18next';
import React, {Component} from 'react';
import { withTranslation } from 'react-i18next';
import './inicio.css';

import {Button} from '../../input/input';
import NextBack from './nextback/NextBack';
import { Konfettikanone } from "react-konfettikanone";

import {es} from '../relojes/relojEscrito/written';
import {general} from '../relojes/relojGeneral';

import Tittle from './pages/tittle/tittle';
import Answer0 from './pages/answer0/answer0';
import Parts0 from './pages/parts0/parts0';
import Minutearm0 from './pages/minutearm0/minutearm0';
import Phrase11 from './pages/phrase11/phrase11';
import {AnswerTemplate, PhraseTemplate1, PhraseTemplate2} from './pages/templates/templates';
import Minutes15and30 from './pages/minutes15and30/minutes15and30';
import {Phrase2and30, Phrase2and31} from './pages/phrase2and3/phrase2and3';
import Periods0 from './pages/periods0/periods0';

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
                home: <Tittle {...props}/>,
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