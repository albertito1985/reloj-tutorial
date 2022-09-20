import {Component} from 'react';
import './input.css'

class RadioButton extends Component {
    render(){
        return(
            <input id={this.props.id} onChange={this.props.onChange} checked={this.props.checked} className="CustomRadio" type="radio" name={this.props.name} value={this.props.value}/>
        )
    }
}

class CheckBox extends Component {
    render(){
        return(
            <input className="CustomCheckBox" onChange={this.props.onChange} type="checkbox" id={this.props.id} name={this.props.name} value={this.props.value}/>
        )
    }
}

class Button extends Component{
    constructor(){
        super();
        this.classTag = this.classTag.bind(this);
    }
    classTag(){
        if(this.props.active === true || this.props.active === undefined){
            return "";
        }else{
            return " inactive";
        }
    }
    render(){
        return(
            <div className={`CustomButton${this.classTag()}`} id={this.props.id} onClick={(this.props.active)?this.props.onClick:null}>{this.props.label}</div>
        )
    }
}



export {RadioButton, CheckBox, Button}