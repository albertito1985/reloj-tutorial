import {Component} from 'react';
import {t} from 'i18next';
import {RelojAnalogo} from '../../../relojes/relojAnalogo/relojAnalogo.js';
import './parts0.css';

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
        this.clickHandler = this.clickHandler.bind(this);
    }

    componentDidMount(){
        let buttons = document.getElementById("partsHalfRight").children;
        buttons.forEach((button)=>{
            button.addEventListener("touchstart", (e)=>e.preventDefault());
            button.addEventListener("touchend",  this.clickHandler);
            button.addEventListener("touchmove", (e)=>e.preventDefault());
        })
        const d = new Date();
        this.setState({
            hours:d.getHours(),
            minutes:d.getMinutes()
        })
    }

    componentWillUnmount(){
        let buttons = document.getElementById("partsHalfRight").children;
        buttons.forEach((button)=>{
            button.removeEventListener("touchstart", (e)=>e.preventDefault());
            button.removeEventListener("touchend",  this.clickHandler);
            button.removeEventListener("touchmove", (e)=>e.preventDefault());
        })
    }

    highlight(e){
        let target;
        let targetWord = e.target.attributes.name.value;
        switch(targetWord){
            case "horas":
                target = document.querySelector(".horasContainer");
            break;
            case "minutos":
                target = document.querySelector(".minutosContainer");
            break;
            case "horario":
                target = document.querySelector("#horario .manilla");
            break;
            case "minutero":
                target = document.querySelector("#minutero .manilla");
            break;
            default:
            break;
        }
        target.classList.add("analogHighlight");
        this.setState({part:targetWord})
    }

    unHighlight(){
        let target;
        if(typeof this.state.part !=="undefined"){
            switch(this.state.part){
                case "horas":
                    target = document.querySelector(".horasContainer");
                break;
                case "minutos":
                    target = document.querySelector(".minutosContainer");
                break;
                case "horario":
                    target = document.querySelector("#horario .manilla");
                break;
                case "minutero":
                    target = document.querySelector("#minutero .manilla");
                break;
                default:
                break;
            }
        target.classList.remove("analogHighlight");
        }
    }

    clickHandler(e){
        if(e.target.id === this.state.part){
            this.unHighlight();
            this.setState({part:undefined});
        }else{
            this.unHighlight();
            this.highlight(e);
        }
    }

    render(){
        return(
                <div className="phraseTemplate">
                    <h1>{t('parts.title')}</h1>
                    <p>{t('parts.explanation')}</p>
                    <div className="phraseTemplateHalfsContainer parts0">
                        <div className="phraseTemplateHalf" id="partsHalfLeft">
                        <RelojAnalogo hours={this.state.hours} minutes={this.state.minutes}/>
                        </div>
                        <div className="phraseTemplateHalf" id="partsHalfRight">
                            <div className={`switchKlockansDelar${(this.state.part==="horas")?" active":""}`} onClick={this.clickHandler} id="horas" name="horas">Horas</div>
                            <div className={`switchKlockansDelar${(this.state.part==="minutos")?" active":""}`} onClick={this.clickHandler} id="minutos" name="minutos">Minutos</div>
                            <div className={`switchKlockansDelar${(this.state.part==="horario")?" active":""}`} onClick={this.clickHandler} id="horario" name="horario">Horario</div>
                            <div className={`switchKlockansDelar${(this.state.part==="minutero")?" active":""}`} onClick={this.clickHandler} id="minutero" name="minutero">Minutero</div>
                        </div>
                    </div>
                    <div id="parts02">
                        <p>
                            {(this.state.part === undefined) && t('parts.prompt')}
                            {(this.state.part === "horas") && t('parts.horas')}
                            {(this.state.part === "minutos") && t('parts.minutos')}
                            {(this.state.part === "horario") && t('parts.horario')}
                            {(this.state.part === "minutero") && t('parts.minutero')}
                        </p>
                    </div>
                </div>
        )
    }
}

export default Parts0;