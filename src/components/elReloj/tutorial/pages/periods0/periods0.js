import {Component} from 'react';
import {t} from 'i18next';
import {RelojAnalogo} from '../../../relojes/relojAnalogo/relojAnalogo.js';
import {RelojDigital} from '../../../relojes/relojDigital/relojDigital.js';
import {general} from '../../../relojes/relojGeneral.js';
import {es} from '../../../relojes/relojEscrito/written';
import './periods0.css';

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

export default Periods0;