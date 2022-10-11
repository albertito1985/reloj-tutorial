import { exists, t } from 'i18next';
import React, {Component} from 'react';
import { withTranslation } from 'react-i18next';

import {RelojAnalogo} from '../relojes/relojAnalogo/relojAnalogo';
import {RelojEscrito} from '../relojes/relojEscrito/relojEscrito';
import {Button,Dropdown} from '../../input/input';
import NextBack from '../tutorial/NextBack'
import '../pages.css';

import { isContentEditable } from '@testing-library/user-event/dist/utils';


class Tutorial extends Component {
    constructor(){
        super();
        this.state={
            page:undefined,
            // lastPage:undefined,
            next:true,
            back:false
        };
        this.pages=[];
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
                phrase11: [true, true],
                phrase12:[true, true],
                minutearm0:[true, true],
                phrase20:[true, true],
                phrase21:[true, true],
                min15and300:[true, true],
                phrase30:[true, true],
                phrase31:[true, true],
                phrases2and30:[true, true],
                periods0:[true, true],
                answer0:[true, true],
                answer1:[true, true],
                answer2:[true, true]
            }
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
        if(this.state.page === 0){
            pagenumber = undefined
        }else{
            let temp = this.state.page;
            pagenumber = --temp;
        }
        this.setState({
            page:pagenumber,
            back:(pagenumber === undefined)?undefined:true,
            next:true
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
            if(value ==="lang" || value ==="esType"){
                this.config[value]=stateUpdate[value];
            }else{
                this.moments.actual.push(value);
            }
        });
        //generating the series of pages according to the moments.
        this.moments.actual.forEach((value)=>{
            for(let i=0;i<this.moments.duration[value];i++){
                this.pages.push(`${value+i}`)
            }
        })
    }

    generateContent(){
        function createElement(page, props ={}){
            let parts ={
                parts0 : <Parts0 {...props}/>,
                phrase10: <Phrase10 {...props}/>,
                phrase11: null,
                phrase12:null,
                minutearm0:null,
                phrase20:null,
                phrase21:null,
                min15and300:null,
                phrase30:null,
                phrase31:null,
                phrases2and30:null,
                periods0:null,
                answer0:null,
                answer1:null,
                answer2:null
            }
            return parts[page];
        }
        if(this.state.page === undefined){
            return <Home nextPage={this.nextPage}/>
        }else{
            const myComponent = createElement(this.pages[this.state.page], {changeNext:this.changeNext});
            return myComponent;
        }
    };
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

class Phrase10 extends Component{
    constructor(){
        super();
        this.state={
            hours:0,
            minutes:0,
            next:false,
            dropdown:"inactive"
        }
        this.ejerciciosContent = this.ejerciciosContent.bind(this);
        this.changeTime= this.changeTime.bind(this);
        this.recieveValue =this.recieveValue.bind(this);
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
    }
    componentDidMount(){
        const d = new Date();
        this.setState({
            hours:d.getHours(),
            minutes:d.getMinutes()
        })
    }
    changeTime({hours,minutes}){
        let newState={}
        if(minutes === 0){
            if(hours===1 || hours === 13){
                newState.dropdown = "";
            }
        }
        newState.hours = hours;
        newState.minutes = minutes;
        this.setState({...newState});
        
    }

    ejerciciosContent(hours,minutes){
        if(minutes === 0){
            if(hours===1){
                return <div className="phrase10pic" id="phrase10night"></div>
            }else if(hours===13){
                return <div className="phrase10pic" id="phrase10day"></div>
            }else{
                return <div className="phrase10pic" id="phrase10normal"></div>
            }
        }
    };
    recieveValue(value){
        if(value==="1"){
            this.props.changeNext(true);
        }else{
            this.props.changeNext(false);
        }
    }
    render(){
        return(
            <div className="phrase10">
                <h1>{t('phrase1.title')}</h1>
                <p>{t('phrase1.explanation')}</p>
                <div id="phrase10">
                    <h2>{t("examples")}</h2>
                    <div id="phrase10HalfsContainer">
                        <span className="phrase10Half phrase10HalfLeft">
                            <p id="phrase1Task1">{t("phrase1.task1")}</p>
                            <RelojAnalogo response={this.changeTime} interaction={true} hours={this.state.hours} minutes={this.state.minutes}/>
                        </span>
                        <span className="phrase10Half phrase10HalfRight">
                            <p className="phrase10question">{t("phrase1.question1")}</p>
                            <span id="relojescritoTime">{this.state.minutes === 0 &&<RelojEscrito className="escritoPhrase10" hours={this.state.hours} minutes={this.state.minutes} mode="0" begining={0}/>}</span>
                            {this.ejerciciosContent(this.state.hours, this.state.minutes)}
                        </span>
                    </div>
                </div>
                <div id="dropdownContainer">
                    <p>¿A que hora come Juanito?</p>
                    <Dropdown type={this.state.dropdown} options={this.options} placeholder={t("phrase1.dropdownPlaceholder")} recieveValue={this.recieveValue}/>
                </div>
                
            </div>
        )
    }
}

export default withTranslation()(Tutorial);