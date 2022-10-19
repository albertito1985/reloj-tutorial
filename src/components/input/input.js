import React, {Component} from 'react';
import { IoTrashBinSharp } from 'react-icons/io5';
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

class Dropdown extends Component{
    constructor(props){
        super();
        this.state={
            selected:{
                value: undefined,
                phrase:undefined
            },
            showDropdown:false
        }
        this.openClick=this.openClick.bind(this);
        this.handleClick=this.handleClick.bind(this);
    }

    static getDerivedStateFromProps(props,state){
        if(props.type === "inactive"){
            console.log(state);
            state.selected={
                    value: undefined,
                    phrase:undefined
                };
            state.showDropdown=false
        }
    }

    // componentDidMount(){
    //     if(this.props.type==="inactive"){
    //         this.setState({
    //             selected:{
    //                 value: undefined,
    //                 phrase:undefined
    //             },
    //             showDropdown:false,
    //         })
    //     }
    // }

    openClick(){
        this.setState({
            showDropdown:(this.state.showDropdown)?false:true
        })
    }

    generateOptions(optionsArray){
        let options = [];
        optionsArray.forEach((optionObject)=>{
            let option = <option key={optionObject.value} value={optionObject.value}>{optionObject.label}</option>
            options.push(option);
        });
        return options;
    }

    handleClick(e){
        let target = e.target;
        this.props.recieveValue(target.attributes.datavalue.value);
        this.setState({
            selected:{value: String(target.attributes.datavalue.value), phrase: target.textContent},
        });
    }

    generateItems(optionsArray){
        let items = [];
        optionsArray.forEach((optionObject)=>{
            let div = <div className={`item${(this.state.selected.value === String(optionObject.value))?" selected":""}`} onClick={this.handleClick} key={optionObject.value} datavalue={optionObject.value}>{optionObject.label}</div>
            items.push(div);
        });
        return items;
    }

    render(){
        return(
            <div className={`CustomdropdownContainer${(this.props.type === "inactive")?" CustomdropdownContainerInactive":""}${(this.state.showDropdown)?" dropdownShow":""}`} 
                id="CustomdropdownContainer"
                onClick={(this.props.type!=="inactive")?this.openClick:undefined}
            >
                <span className={`selectedItem${this.state.selected.phrase?"":" selectedItemEmpty"}`} id="selectedItem">{this.state.selected.phrase || this.props.placeholder}</span>
                {this.state.showDropdown===true && this.props.type !== "inactive" &&
                    <span className="itemsList" id="itemsList" >
                        {this.generateItems(this.props.options)}
                    </span>
                }
                <select id="customDropdown" className={`Customdropdown${this.props.type?` ${this.props.type}`:""}`} value={this.state.value}>
                    {this.generateOptions(this.props.options)}
                </select>
            </div>
        )
    }
}

class TextInput extends Component{
    constructor(){
        super();
        this.state = {
            value:""
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e){
        let value = e.target.value;
        this.props.recieveData({field:e.target.name || undefined,value:value});
        this.setState({value})
    }

    render(){
        return(<input className="CustomTextInput" name={this.props.name} value={this.state.value} onChange={(this.props.type === "inactive")? null: this.handleChange} placeholder={this.props.placeholder || "text"} type="text"/>)
    }
}

export {RadioButton, CheckBox, Button, Dropdown, TextInput}