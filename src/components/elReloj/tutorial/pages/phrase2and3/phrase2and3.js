import {Component} from 'react';
import {t} from 'i18next';

import {Dropdown} from '../../../../input/input.js';
import {RelojAnalogo} from '../../../relojes/relojAnalogo/relojAnalogo.js';
import {general} from '../../../relojes/relojGeneral.js';
import {es} from '../../../relojes/relojEscrito/written.js';

import './phrase2and3.css';

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

export {Phrase2and30, Phrase2and31};