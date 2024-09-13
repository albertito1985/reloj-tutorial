import {Component} from 'react';
import {t} from 'i18next';
import {TextInput} from '../../../../input/input.js';
import './minutes15and30.css';

import {AiFillCheckCircle} from 'react-icons/ai';

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

export default Minutes15and30;