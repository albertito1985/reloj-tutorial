import { t, setDefaultNamespace } from 'i18next';
import {Link} from 'react-router-dom'
import {Component} from 'react';
import { withTranslation} from 'react-i18next';
import './pages.css';
import {RadioButton, CheckBox, Button} from '../input/input'
import { toHaveDisplayValue } from '@testing-library/jest-dom/dist/matchers';

class Configuration extends Component {
    constructor(){
        super();
        this.state={
            totalTime:0,
            extraTime:0,
            valuesString:undefined,
            actualMoments:{
                lang: "spanish",
                esType:"spain"
            }
        };
        setDefaultNamespace('elreloj');
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
                phrases2and3:2,
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
        let prelMoments={...this.state.actualMoments};
        delete prelMoments["minutearm"];
        delete prelMoments["min15and30"];
        delete prelMoments["phrases2and3"];
        if(value===false){
            delete prelMoments[name];
        }else{
            changedMoment[name] = value? value: undefined;
            prelMoments ={...prelMoments,...changedMoment};
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
        let totalTime = this.calculateTime(prelMoments);
        let valuesString = this.valuesString(prelMoments);

        this.setState({
            actualMoments:{...prelMoments},
            totalTime, extraTime, valuesString
        });
    }

    valuesString(prelMoments){
        let keys = Object.keys(prelMoments);
        let string = "?";
        for(let i=0;i<keys.length;i++){
            let value = prelMoments[keys[i]];
            let name = keys[i];
                string += `${encodeURIComponent(name)}=${encodeURIComponent(value)}&`;
        }
        string=string.slice(0,string.length-1)
        return string;
    }

    handleTutorial(){
        let address= `./#/elreloj/tutorial${this.state.valuesString}`;
        window.location.href = address;
    }

    handleExcercises(){
        let address= `./#/elreloj/exercise1${this.state.valuesString}`;
        window.location.href = address;
    }
    
    render(){
        return(
            <div className='pages'>
                <div id="config">
                    <h1>{t('config.title')}</h1>
                    <p>{t('config.explanation')}</p>
                    <form id="form">
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
                                        <td>{t('config.answer')}</td>
                                        <td className={`estTime${this.state.actualMoments.answer? " active": ""}`} id="answerTime">3</td>
                                        <td>
                                            <CheckBox id="answer" name="answer" onChange={this.handleChange} value={true}/>
                                        </td>
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
                        <Link to={`./tutorial${this.state.valuesString}`}><Button type={this.state.totalTime>0?"1":"inactive"} onClick={this.handleTutorial} label={t('config.tutorial')}/></Link>
                        <Link to={`./exercise1${this.state.valuesString}`}><Button type={"inactive"} label={t('config.excercises')}/></Link>
                    </div>
                </div>
           </div>
        )
    }
}



export default withTranslation()(Configuration);

