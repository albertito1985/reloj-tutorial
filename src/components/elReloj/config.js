import { t } from 'i18next';
import {Component} from 'react';
import { withTranslation } from 'react-i18next';
import './pages.css';
import {RadioButton, CheckBox, Button} from '../input/input'
import { toHaveDisplayValue } from '@testing-library/jest-dom/dist/matchers';

class Configuration extends Component {
    constructor(){
        super();
        this.state={
            totalTime:0,
            extraTime:0,
            actualMoments:{
                lang: "spanish",
                esType:"spain"
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleTutorial = this.handleTutorial.bind(this);
        this.handleExcercises = this.handleExcercises.bind(this);
        this.valuesString = this.valuesString.bind(this);
        this.calculateTime = this.calculateTime.bind(this);
        this.calculateExtraMoments = this.calculateExtraMoments.bind(this);
        this.moments= {
            principal:{
                titles :["parts", "minutearm","phrase1", "min15and30", "phrase2", "phrase3", "phrases2and3", "periods", "answer"],
                accepted:[],
            },
            extras:{
                titles:["minutearm","min15and30","phrases2and3"],
                accepted:[]
            },
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
            
        }
    }
    
    calculateExtraMoments(keys){
        let extraMoments = {};
        let evaluation = {
            1: (inputArray)=>{
                return inputArray.includes("phrase1" || "phrase2"||"phrase3");
            },
            2: (inputArray)=>{
                return inputArray.includes("phrase2"||"phrase3");
            },
            3: (inputArray)=>{
                if(inputArray.includes("phrase2") && inputArray.includes("phrase3")){
                    return true;
                }else{
                    return false;
                }
            },
        }
        if(evaluation[1](keys)){
            extraMoments["minutearm"] = true;
        }else{
            delete extraMoments["minutearm"];
        }
        if(evaluation[2](keys)){
            extraMoments["min15and30"] = true;
        }else{
            delete extraMoments["min15and30"];
        }
        if(evaluation[3](keys)){
            extraMoments["phrases2and3"] = true;
        }else{
            delete ["phrases2and3"];
        }
        return extraMoments;
    }

    calculateTime(prelMoments){
        let total = 0;

        let keys = Object.keys(prelMoments);
        keys.forEach((value)=>{
            total += this.moments.duration[value]||0;
        })  
        return total
    }

    handleChange(e){
        let target = e.target;
        let name = target.attributes.name.value;
        let value;
        if(target.type==="checkbox"){
            value= target.checked;
        }else{
            value= target.value;
        }
        let changedMoment={};
        let prelMoments={};
        if(value===false){
            prelMoments ={...this.state.actualMoments};
            delete prelMoments[name];
        }else{
            changedMoment[name] = value? value: undefined;
            prelMoments ={...this.state.actualMoments,...changedMoment};
        }

        let keys = Object.keys(prelMoments);
        let relevantMoments=[];
        keys.forEach((key)=>{
            if(typeof prelMoments[key] !== "undefined"){
                if(prelMoments[key] !== "undefined"){
                    relevantMoments.push(key);
                }
            }
        });
        let prelMomentsExtras = this.calculateExtraMoments(relevantMoments);

        prelMoments={...prelMoments, ...prelMomentsExtras}

        let extraTime = this.calculateTime(prelMomentsExtras);
        let totalTime = this.calculateTime(prelMoments) + extraTime;

        this.setState({
            actualMoments:{...prelMoments},
            totalTime, extraTime
        });
        console.log(prelMoments)
    }

    valuesString(){
        let elements = this.state.actualMoments;
        let keys = Object.keys(this.state.actualMoments);
        let string = "?";
        for(let i=0;i<keys.length;i++){
            let value = elements[keys[i]];
            let name = keys[i];
                string += `${encodeURIComponent(name)}=${encodeURIComponent(value)}&`;
        }
        string=string.slice(0,string.length-1)
        return string;
    }

    handleTutorial(){
        let data = this.valuesString();
        let address= `./elreloj/tutorial${data}`
        window.location.href = address;
    }

    handleExcercises(){
        let data = this.valuesString();
        let address= `./elreloj/exercise1${data}`
        window.location.href = address;
    }
    
    render(){
        return(
            <div className='pages'>
                <div id="config">
                    <h1>{t('config.title')}</h1>
                    <p>{t('config.explanation')}</p>
                    <form id="form">
                        <div id="explanation">
                            <div className="title">{t('config.tutorialExplanation')}</div>
                            <div className="radioAlternatives">
                                <div className="radioButton"><RadioButton onChange={this.handleChange} checked={this.state.actualMoments.lang === "spanish"} name="lang" value="spanish" id="spanish"/><label htmlFor="spanish">{t('languages.spanish')}</label></div>
                                <div className="radioButton"><RadioButton onChange={this.handleChange} checked={this.state.actualMoments.lang === "english"} name="lang" value="english" id="english"/><label htmlFor="english">{t('languages.english')}</label></div>
                                <div className="radioButton"><RadioButton onChange={this.handleChange} checked={this.state.actualMoments.lang === "swedish"} name="lang" value="swedish" id="swedish"/><label htmlFor="swedish">{t('languages.swedish')}</label></div>
                            </div>
                        </div>
                        <div id="esType">
                            <div className="title">{t('config.esType')}</div>
                            <div className="radioAlternatives">
                                <div className="radioButton"><RadioButton onChange={this.handleChange} checked={this.state.actualMoments.esType === "spain"} id="espana" name="esType" value="spain"/><label htmlFor="españa">{t('config.spain')}</label></div>
                                <div className="radioButton"><RadioButton onChange={this.handleChange} checked={this.state.actualMoments.esType === "lAmerica"} id="lAmerica" name="esType" value="lAmerica"/><label htmlFor="lAmerica">{t('config.lAmerica')}</label></div>
                            </div>
                        </div>
                        <div>
                            <div className="title">{t('config.content')}</div>
                            <table className="contentTable">
                                <tbody>
                                    <tr>
                                        <th>{t('config.moment')}</th><th>{t('config.minutes')}</th>
                                    </tr>
                                    <tr>
                                        <td>{t('config.parts')}</td>
                                        <td className={`estTime${this.state.actualMoments.parts? " active": ""}`} id="partsTime">1</td>
                                        <td>
                                            <CheckBox id="parts" name="parts" onChange={this.handleChange} value={true}/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>{t('config.phrase1')}</td>
                                        <td className={`estTime${this.state.actualMoments.phrase1? " active": ""}`} id="phrase1Time">3</td>
                                        <td>
                                            <CheckBox id="phrase1" name="phrase1" onChange={this.handleChange} value={true}/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>{t('config.phrase2')}</td>
                                        <td className={`estTime${this.state.actualMoments.phrase2? " active": ""}`} id="phrase2Time">2</td>
                                        <td>
                                            <CheckBox id="phrase2" name="phrase2" onChange={this.handleChange} value={true}/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>{t('config.phrase3')}</td>
                                        <td className={`estTime${this.state.actualMoments.phrase3? " active": ""}`} id="phrase3Time">2</td>
                                        <td>
                                            <CheckBox id="phrase3" name="phrase3" onChange={this.handleChange} value={true}/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>{t('config.periods')}</td>
                                        <td className={`estTime${this.state.actualMoments.periods? " active": ""}`} id="periodsTime">1</td>
                                        <td>
                                            <CheckBox id="periods" name="periods" onChange={this.handleChange} value={true}/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>{t('config.answer')}</td>
                                        <td className={`estTime${this.state.actualMoments.answer? " active": ""}`} id="answerTime">3</td>
                                        <td>
                                            <CheckBox id="answer" name="answer" onChange={this.handleChange} value={true}/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>{t('config.extra')}</td>
                                        <td className={`estTime${(this.state.extraTime>0)?" active": ""}`} id="extraTime">{this.state.extraTime}</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th className="tiempoTotal">{t('config.total')}</th>
                                        <td className={`estTime${(this.state.totalTime>0)?" active": ""}`} id="totalTime">{this.state.totalTime}</td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </form>
                    <div id="buttons">
                        <Button active={this.state.totalTime>0?true:false} onClick={this.handleTutorial} label={t('config.tutorial')}/>
                        <Button active={this.state.totalTime>0?true:false} onClick={this.handleExcercises} label={t('config.excercises')}/> 
                    </div>
                </div>
           </div>
        )
    }
}
export default withTranslation()(Configuration);
