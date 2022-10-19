import { t } from 'i18next';
import React, {Component} from 'react';
import { withTranslation } from 'react-i18next';
import '../pages.css';

import {RelojAnalogo} from '../relojes/relojAnalogo/relojAnalogo';
import {RelojEscrito} from '../relojes/relojEscrito/relojEscrito';
import {Button,Dropdown,TextInput} from '../../input/input';
import NextBack from '../tutorial/NextBack'
import {AiFillCheckCircle} from 'react-icons/ai'

import {es} from '../relojes/relojEscrito/written'


import { isContentEditable } from '@testing-library/user-event/dist/utils';


class Tutorial extends Component {
    constructor(){
        super();
        this.state={
            page:9,
            next:undefined,
            back:undefined
        };
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
                phrases2and3:1,
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
                periods0:[true, true],
                answer0:[true, true],
                answer1:[true, true],
                answer2:[true, true]
            },
            order:[
                "parts",
                "minutearm",
                "phrase1",
                "min15and30",
                "phrase2",
                "phrase3",
                "phrases2and3",
                "periods",
                "answer"
            ]
        };
        this.generateContent=this.generateContent.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.changeNext = this.changeNext.bind(this);
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
        //adjusting the next/back buttons to the first "slide"
        let back = this.moments.navigation[this.pages[this.state.page]][0];
        let next = this.moments.navigation[this.pages[this.state.page]][1];
        this.setState({
            back:back,
            next:next
        })
    }
    generateContent(){
        function createElement(page, props ={}){
            let specialProps={
                phrase10:{
                    ...props,
                    name:"phrase1",
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
                            newState.phrases = es.phraseFinder(hours,minutes,props.esType,false,0);
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
                        minutes:10
                    }
                },
                phrase30:{
                    ...props,
                    name:(props.esType===0)?"phrase3A":"phrase3B",
                    options:[
                        {label:es.phraseFinder(1,35,props.esType,false,0)[1].phrase,value:35},
                        {label:es.phraseFinder(1,40,props.esType,false,0)[1].phrase,value:40},
                        {label:es.phraseFinder(1,45,props.esType,false,0)[0].phrase,value:45},
                        {label:es.phraseFinder(1,50,props.esType,false,0)[0].phrase,value:50},
                        {label:es.phraseFinder(1,55,props.esType,false,0)[0].phrase,value:55}
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
                        hours:10,
                        minutes:45
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
                    if(state.Ahours>12){
                        newState.Ahours = state.hours-12;
                    }else{
                        newState.Ahours = state.hours;
                    }
                    if(state.Aminutes === 0){
                        if(state.Qhours === 0 || state.Qhours === 12){
                            if(state.Ahours=== 0 || state.Ahours === 12){
                                newState.Ahours=state.Qhours;
                            }
                        }
                        
                        if(state.Ahours===state.Qhours){
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
                phrases2and30:null,
                periods0:null,
                answer0:null,
                answer1:null,
                answer2:null
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
                {this.generateContent()}
                <NextBack 
                    back={(this.state.back)?true:"inactive"}
                    next={(this.state.next)?true:"inactive"}
                    backFunction={this.previousPage}
                    nextFunction={this.nextPage}
                />
            </div>
        )
    }
}

class Home extends Component{
    render(){
        return(
                <div className="home">
                    <h1>{t('titulo')}</h1>
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
    }

    componentDidMount(){
        let buttons = document.getElementById("partsButtons").children;
        buttons.forEach((button)=>{
            button.addEventListener("mouseover", this.highlight);
            button.addEventListener("mouseout", this.unHighlight);
        })
        const d = new Date();
        this.setState({
            hours:d.getHours(),
            minutes:d.getMinutes()
        })
    }

    componentWillUnmount(){
        let buttons = document.getElementById("partsButtons").children;
        buttons.forEach((button)=>{
            button.removeEventListener("mouseover", this.highlight);
            button.removeEventListener("mouseout", this.unHighlight)
        })
    }

    highlight(e){
        let target;
        let targetWord = e.target.textContent;
        switch(e.target.textContent){
            case "Horas":
                target = document.querySelector(".horasContainer");
            break;
            case "Minutos":
                target = document.querySelector(".minutosContainer");
            break;
            case "Horario":
                target = document.querySelector("#horario .manilla");
            break;
            case "Minutero":
                target = document.querySelector("#minutero .manilla");
            break;
            default:
            break;
        }
        target.classList.add("analogHighlight");
        this.setState({part:targetWord})
    }

    unHighlight(e){
        let target;
        switch(e.target.textContent){
            case "Horas":
                target = document.querySelector(".horasContainer");
            break;
            case "Minutos":
                target = document.querySelector(".minutosContainer");
            break;
            case "Horario":
                target = document.querySelector("#horario .manilla");
            break;
            case "Minutero":
                target = document.querySelector("#minutero .manilla");
            break;
            default:
            break;
        }
        target.classList.remove("analogHighlight");
        this.setState({part:undefined})
    }

    render(){
        return(
                <div id="parts0">
                    <h1>{t('parts.title')}</h1>
                    <p>{t('parts.explanation')}</p>
                    <div className="parts0">
                        <RelojAnalogo hours={this.state.hours} minutes={this.state.minutes} showMinutes="true"/>
                        <div id="partsButtons">
                            <Button label="Horas" type="2"/>
                            <Button label="Minutos" type="2"/>
                            <Button label="Horario" type="2"/>
                            <Button label="Minutero" type="2"/>
                        </div>
                    </div>
                    <div className="parts02">
                        <p>
                            {(this.state.part === undefined) && t('parts.prompt')}
                            {(this.state.part === "Horas") && t('parts.horas')}
                            {(this.state.part === "Minutos") && t('parts.minutos')}
                            {(this.state.part === "Horario") && t('parts.horario')}
                            {(this.state.part === "Minutero") && t('parts.minutero')}
                        </p>
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
                <div id="dropdownContainer">
                    <Dropdown options={this.options} placeholder={t("phrase1.dropdownPlaceholder")} recieveValue={this.recieveValue}/>
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
            <div id="minuteArm0">
                <h1>{t("minuteArm.title")}</h1>
                <p>{t("minuteArm.explanation")}</p>
                <div id="minuteArmContainer">
                    <div id="minuteArmOver">
                        <span className="minuteArmPhrase" id="minuteArmPhraseOver">
                            {(this.state.phrases[0]) && (this.state.phrases[0].type === 0) && this.state.phrases[0].phrase}
                        </span>
                    </div>
                    <div id="minuteArmUnder">
                        <div className="minuteArm0HAlva" id="minuteArm0HAlvLeft">
                            <span className="minuteArmPhrase" id="minuteArmPhraseLeft">
                                {(this.state.phrases[0]) && (this.state.phrases[0].type === 2) && this.state.phrases[0].phrase}
                                {(this.state.phrases[1]) && (this.state.phrases[1].type === 2) && this.state.phrases[1].phrase}
                            </span>
                        </div>
                        <div className="minuteArm0HAlva" id="minuteArm0HAlvMiddle">
                            <RelojAnalogo response={this.changeTime} interaction={true} hours={this.state.hours} minutes={this.state.minutes}/>
                        </div>
                        <div className="minuteArm0HAlva" id="minuteArm0HAlvRight">
                            <span className="minuteArmPhrase" id="minuteArmPhraseRight">
                                {(this.state.phrases[0]) && (this.state.phrases[0].type === 1) && this.state.phrases[0].phrase}
                            </span>
                        </div>
                    </div>
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
            // next:false,
            dropdown:"inactive",
            pic:undefined,
            phrases:[{type:0,phrase:"Las diez en punto."}]
        }
        this.picChanger = this.picChanger.bind(this);
        this.changeTime=this.changeTime.bind(this);
        this.changeState=this.changeState.bind(this);
        this.recieveValue =this.recieveValue.bind(this);
        this.generatePhraseAndImage = this.generatePhraseAndImage.bind(this);
    }
    componentDidMount(){
        this.changeTime(this.props.startTimeObject);
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
    }
    generatePhraseAndImage(){
        if(this.state.phrases[0]){
            if(this.state.phrases[0].type === this.props.phraseType){
                return (<>
                <span className={`writtenTime phrase${this.props.phraseType}`}>{this.state.phrases[0].phrase}</span>
                <div className={`phraseTemplatePic${(this.state.pic !== undefined)?` ${this.state.pic}`:""}`} ></div>
                </>)
            }else if(this.state.phrases[1]){
                if((this.state.phrases[1].type ) === this.props.phraseType){
                    return (<>
                        <span className={`writtenTime phrase${this.props.phraseType}`}>{this.state.phrases[1].phrase}</span>
                        <div className={`phraseTemplatePic${(this.state.pic !== undefined)?` ${this.state.pic}`:""}`} ></div>
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
                <div id="phraseTemplateContent">
                    <h2>{t("examples")}</h2>
                    <div id="phraseTemplateHalfsContainer">
                        <span className="phraseTemplateHalf">
                            <RelojAnalogo response={this.changeTime} interaction={true} hours={this.state.hours} minutes={this.state.minutes}/>
                        </span>
                        <span className="phraseTemplateHalf">
                            {this.generatePhraseAndImage()}
                        </span>
                    </div>
                </div>
                <div id="dropdownContainer">
                    <div>
                        <h2>{t(`${this.props.name}.question`)}</h2>
                        <p>{t(`${this.props.name}.instructions`)}</p>
                    </div>
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
                <div id="phraseTemplate2ContentContainer">
                    <div>
                        <h2>{t("excercises")}</h2>
                        <p>{t("phrase1.excercisesExplanation")}</p>
                    </div>
                    <div id="phraseTemplate2EscritoContainer">
                        <span className={`writtenTime phrase${this.props.type}`}>{es.phraseFinder(hours,minutes,this.props.esType,false,this.props.type,0)[0].phrase}</span>
                        <Button label={t("phrase1.otherTime")} type="1" onClick={this.changeQuestion}/>
                    </div>
                    <RelojAnalogo response={this.changeTime} interaction={true} hours={this.state.Ahours} minutes={this.state.Aminutes}/>
                </div>
            </div>
        )
    }
}


export default withTranslation()(Tutorial);