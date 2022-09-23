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
    
    render(){
        return(
            <div className={`CustomButton button${this.props.type}`} id={this.props.id} onClick={(this.props.type==="inactive")?null:this.props.onClick}>{this.props.label}</div>
        )
    }
}



export {RadioButton, CheckBox, Button}