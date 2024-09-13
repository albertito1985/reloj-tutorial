import {Component} from 'react';
import {t} from 'i18next';
import {Dropdown} from '../../../../input/input';
import './phrase11.css';

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
export default Phrase11;