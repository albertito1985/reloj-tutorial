import { exists, t } from 'i18next';
import React, {Component} from 'react';
import { withTranslation } from 'react-i18next';
import '../pages.css';
import {RelojAnalogo} from '../relojes/relojAnalogo/relojAnalogo';
import {RelojEscrito} from '../relojes/relojEscrito/relojEscrito';
import {Button} from '../../input/input';
import NextBack from '../tutorial/NextBack'
import { isContentEditable } from '@testing-library/user-event/dist/utils';


class Tutorial extends Component {
    constructor(){
        super();
        this.state={
            page:undefined,
            // lastPage:undefined,
            next:undefined,
            back:undefined
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
            }
        };
        this.generateContent=this.generateContent.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
    }
    nextPage(){
        let pagenumber;
        if(this.state.page === undefined){
            pagenumber = 0
        }else{
            console.log(this.state.page)
            let temp = this.state.page;
            pagenumber =++temp;
        }
        this.setState({
            page:pagenumber,
            back:true,
            next:(pagenumber+1 === this.moments.actual.length)
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
        function createElement(page, props){
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
            const myComponent = createElement(this.pages[this.state.page]);
            return myComponent;
        }

    };

    render(){
        return(
            <div className="pages">
                {this.generateContent()}   
                <NextBack 
                    back={(this.state.back === undefined)?"inactive":true}
                    next={(this.state.page+1 === this.moments.actual.length)?"inactive":true}
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
        console.log(target);
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
            minutes:0
        }
        this.changeTime= this.changeTime.bind(this);
    }
    componentDidMount(){
        const d = new Date();
        this.setState({
            hours:d.getHours(),
            minutes:d.getMinutes()
        })
    }
    changeTime({hours,minutes}){
        this.setState({
            hours:hours,
            minutes:minutes
        })
    }
    render(){
        return(
            <div className="phrase10">
                <h1>{t('phrase1.title')}</h1>
                <p>{t('phrase1.explanation')}</p>
                <div className="phrase10">
                        <RelojAnalogo response={this.changeTime} interaction={true} hours={this.state.hours} minutes={this.state.minutes}/>
                        <div id="writenTime">
                            {/* <RelojEscrito hours={this.state.hours} minutes={this.state.minutes}/>; */}
                        </div>
                    </div>
            </div>
        )
    }
}

export default withTranslation()(Tutorial);