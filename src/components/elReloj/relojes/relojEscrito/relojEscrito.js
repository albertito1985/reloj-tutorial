import {Component} from 'react';
import escrito from '../../controller/relojEscritoController';
import {es} from '../../modell/writtenComponents/written';
import './relojEscrito.css';

export class Escrito extends Component{
    constructor(){
      super();
      this.state = {
        hours:undefined,
        minutes:undefined,
        feedback:[],
        input:"",
        inputWithFeedback: null,
      }
      this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount(){
      let input= null;
      if(this.props.answer === true){
        input = escrito.input;
      }else{
        input = this.state.input;
      }
      this.evaluatePhrase(input);
    }
  
    componentDidUpdate(prevProps,prevState){
      if(this.props.answer){
        let input= null;
        if(this.props.answer === true){
          input = escrito.input;
        }else{
          input = this.state.input;
        }
        if(prevState.input !== this.state.input){
          this.evaluatePhrase(input);
        }
      }
    }
  
    showInteraction(e){
      if(this.props.interaction){
        if(e.target.classList.contains("clockContainers")){
          let span = e.target.getElementsByClassName("digitalSpan")[0];
          let show = e.target.getElementsByClassName("digitalShow")[0];
          span.classList.add("show");
          show.classList.remove("show");
          let interaction = span.getElementsByClassName("digitalInteraction")[0];
          interaction.focus();
        }
      }
    }
    static getDerivedStateFromProps(props,state){
      if(props.answer){
        return {input:escrito.input,
          hours:escrito.hours,
          minutes: escrito.minutes};
      }else{
        return{
          hours:props.hours,
          minutes:props.minutes
        }
      }
    }
    write(hours,minutes){
      if(this.props.answer === true){
        return this.state.inputWithFeedback;
      }else{
        let text = es.phraseFinder(hours, minutes, this.props.mode);
        let content =  text.map((phrase,index)=>{
          return <p key={`${phrase.type}${index}`}><span className={`phrasePart phrase${phrase.type}`}>{phrase.phrase}</span></p>
        })
        return content;
      }
    }
    changeInputValue(value){
      console.log("change input value")
      escrito.input = value;
      this.setState({input : value,inputWithFeedback: null});
    }
    deletePhraseParts(inputObject){
      let alternative = [];
      let value= "";
      let key= null;
      inputObject.phraseStructure.forEach((part,index)=>{
        // if(part.name === object.phrasePart){
          if(inputObject.object.includes(part.name)){
          key+=index;
          if(alternative.length===0){
            alternative.push(<span key = {index} className="delete">{part.phrase}</span>)
          }else{
            alternative.push(` `);
            alternative.push(<span key = {index} className="delete">{part.phrase}</span>)
          }
        }else{
          if(alternative.length===0 ||part.name === "point"){
            alternative.push(part.phrase);
            value = value + part.phrase;
          }else{
            alternative.push(` ${part.phrase}`);
            value = value + ` ${part.phrase}`;
          }
        }
      });
      value= value.replace(/\s\s+/gi," ");
      return <span className="alternative" key={`${inputObject.object}${key}`} children={alternative} onClick={this.changeInputValue.bind(this,value)}></span>
    }
    createEitherOrAlternatives(timeObject){
      let returnObjects=[];
      let temporalStructure= null;
      timeObject.phraseStructure.forEach((part,index)=>{
        if(part.name === timeObject.object[0]){
          temporalStructure = [...timeObject.phraseStructure];
          temporalStructure[index] = {...part};
          temporalStructure[index].name = temporalStructure[index].name + "X";
          returnObjects.push(this.deletePhraseParts({
            action: "delete",
            object: timeObject.object,
            phraseStructure:temporalStructure
          }))
        }
      });
      return returnObjects;
    }
    switchParts(timeObject){
      timeObject.object.forEach((part,index)=>{
        if(part.correctPosition){
          let temporal = {...timeObject.object[part.correctPosition]};
          timeObject.object[part.correctPosition] = {...part};
          delete timeObject.object[part.correctPosition].correctPosition;
          timeObject.object[part.correctPosition].highlight = true;
          timeObject.object[index] = temporal;
          delete timeObject.object[index].correctPosition;
          timeObject.object[index].highlight = true;
        }
      });
      let value="";
      let children = [];
      timeObject.object.forEach((part)=>{
        if(children.length ===0 || part.name ==="point"){
          //do nothing
        }else{
          children.push(" ");
          value += " ";
        };
        if(part.highlight === true){
          children.push(<span className="highlight" key={part.phrase}>{part.phrase}</span>);
        }else{
          children.push(part.phrase)
        }
        value+=part.phrase;
      });
      return <span className="alternative" key={`${value}`} children={children} onClick={this.changeInputValue.bind(this,value)}></span>
    }
    highlightPart(inputObject){
      let children = [];
      inputObject.structure.forEach((part)=>{
        if(children.length ===0 || part.name ==="point"){
          //do nothing
        }else{
          children.push(" ");
        };
        if(part.highlight === true){
          children.push(<span key={part.phrase} className ="highlight">{part.phrase}</span>);
        }else{
          children.push(part.phrase);
        }
      });
      return <span key="highlight" children={children}></span>
    }
    replacePart(inputObject){
      let children = [];
      let value="";
      inputObject.structure.forEach((part)=>{
        if(children.length ===0 || part.name ==="point"){
          //do nothing
        }else{
          children.push(" ");
          value += " ";
        };
        if(part.replace){
          children.push(<span key={part.phrase} className ="highlight">{part.replace}</span>);
          value+=part.replace;
        }else{
          children.push(part.phrase);
          value+=part.phrase;
        }
      });
      return <span className="alternative" key={value} children={children} onClick={this.changeInputValue.bind(this,value)}></span>
    }
  
    replacePartsAndGiveAlternatives(timeObject){
      let returnArray = [];
      timeObject.structure.forEach((part,index)=>{
        if(part.replace){
          part.replace.forEach((replacement)=>{
            let structure = [...timeObject.structure];
            structure[index] = {...timeObject.structure[index]};
            structure[index].replace = replacement; 
            returnArray.push({structure})
          });
        }
      });
      return returnArray.map((replacement)=>{
        return this.replacePart(replacement);
      })
    }
    evaluatePhrase(input){
      if(input.match(/.+\..+$/)){
        return null;
      }
      let timeObject = escrito.analyzePhrase(input);
      //validation
      if(timeObject.action === "changeInput"){
        console.log("answer: changeInput")
        if(timeObject.type === "erasePoint"){
          this.changeInputValue(input.replace(/\.$/gm,""));
        }else if(timeObject.type === "eraseLastSpace"){
          this.changeInputValue(input.replace(/\s\.$/gm,"."));
        }
        return 0;
      }else if(timeObject.action === "show"){
        console.log("answer: show");
        this.props.feedback({feedback:timeObject.feedback});
        this.setState({inputWithFeedback : null})
        return 0;
      }else if(timeObject.action === "delete"){
        console.log("answer: delete");
        this.props.feedback({feedback:timeObject.feedback});
        this.setState({inputWithFeedback : this.deletePhraseParts(timeObject)});
        return 0;
      }else if(timeObject.action === "alternatives"){
        console.log("answer: alternatives");
        this.props.feedback({feedback:timeObject.feedback});
        this.setState({inputWithFeedback : this.createEitherOrAlternatives(timeObject)});
        return 0;
      }else if(timeObject.action === "switch"){
        console.log("answer: switch");
        this.props.feedback({feedback:timeObject.feedback});
        this.setState({inputWithFeedback : this.switchParts(timeObject)});
        return 0;
      }else if(timeObject.action === "highlight"){
        console.log("answer: highlight");
        this.props.feedback({feedback:timeObject.feedback});
        this.setState({inputWithFeedback : this.highlightPart(timeObject)});
        return 0;
      }else if(timeObject.action === "replace"){
        console.log("answer: replace");
        this.props.feedback({feedback:timeObject.feedback});
        this.setState({inputWithFeedback : this.replacePart(timeObject)});
        return 0;
      }else if(timeObject.action === "replaceAndAlternatives"){
        console.log("answer: replaceAndAlternatives");
        this.props.feedback({feedback:timeObject.feedback});
        this.setState({inputWithFeedback : this.replacePartsAndGiveAlternatives(timeObject)});
        return 0;
      }else{
        console.log("answer: accepted");
        this.props.feedback({feedback:null});
        this.setState({inputWithFeedback : null});
      }
      this.props.response(timeObject);
    }
    handleChange(e){
      escrito.input = e.target.value;
      this.setState({input:e.target.value});
    }
    render(){
        return (<div className="escritoContainer">
          <div className={`escrito${(this.props.answer === true)?'':' show'}`} >{this.write(this.state.hours, this.state.minutes)}</div>
          <span className={`escritoSpan${(this.props.answer === true)?' show':''}`}>
            <div className="escritoInteractionShow" >{this.write(this.state.hours, this.state.minutes)}</div>
            <input id="escritoInteraction" className="escritoInteraction" placeholder="Escribe la hora aquí." value={(this.props.answer === true )?escrito.input:this.state.input} onChange={this.handleChange}></input>
          </span>
        </div>);
    }
  }