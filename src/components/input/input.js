import React, {Component} from 'react';
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
    static id = 0;
    constructor(){
        super();
        this.id = undefined;
        if(this.props === undefined || this.props.id === undefined){
            this.id = `button${Button.id}`;
            Button.id++; 
        }else{
            this.id = this.props.id
        }
        this.touchEndhandler = this.touchEndhandler.bind(this);
        this.touchStarthandler =this.touchStarthandler.bind(this);
    }

    componentDidMount(){
        let button = document.getElementById(this.id);
        button.addEventListener("touchstart", this.touchStarthandler);
        button.addEventListener("touchend",  this.touchEndhandler);
        button.addEventListener("touchmove", (e)=>e.preventDefault());
        // button.addEventListener("touccancel", (e)=>e.preventDefault());
    }

    componentWillUnmount(){
        let button = document.getElementById(this.id);
        button.removeEventListener("touchstart", this.touchStarthandler);
        button.removeEventListener("touchend",  this.touchEndhandler);
        button.removeEventListener("touchmove", (e)=>e.preventDefault());
    }

    touchStarthandler(e){
        e.preventDefault();
        if(this.props.type==="inactive"){
            //do nothing
        }else{
            let button = document.getElementById(this.id);
            button.classList.add("hover");
        }
    }

    touchEndhandler(e){
        let button = document.getElementById(this.id);
            button.classList.remove("hover");
        if(this.props.type==="inactive" || (typeof this.props.onClick === "undefined")){
            //do nothing
        }else{
            this.props.onClick(e)
        }
    }

    render(){
        return(
            <div className={`CustomButton button${this.props.type}`} id={this.id} onClick={(this.props.type==="inactive")?null:this.props.onClick} name={this.props.name}>{this.props.label}</div>
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
            return {selected:{
                        value: undefined,
                        phrase:undefined
                        },
                    showDropdown:false}
        }else{
            return 0;
        }
    }

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

class SwitchButton extends Component{
    static id = 0;
    constructor(){
        super();
        this.id = undefined;
        if(this.props === undefined || this.props.id === undefined){
            this.id = `switch${SwitchButton.id}`;
            SwitchButton.id++;
        }else{
            this.id = this.props.id
        }
        this.touchEndhandler = this.touchEndhandler.bind(this);
        this.touchStarthandler =this.touchStarthandler.bind(this);
    }

    componentDidMount(){
        let switchButton = document.getElementById(this.id);
        switchButton.addEventListener("touchstart", this.touchStarthandler);
        switchButton.addEventListener("touchend",  this.touchEndhandler);
        switchButton.addEventListener("touchmove", (e)=>e.preventDefault());
    }

    componentWillUnmount(){
        let switchButton = document.getElementById(this.id);
        switchButton.removeEventListener("touchstart", this.touchStarthandler);
        switchButton.removeEventListener("touchend",  this.touchEndhandler);
        switchButton.removeEventListener("touchmove", (e)=>e.preventDefault());
    }

    touchStarthandler(e){
        e.preventDefault();
        if(this.props.type==="inactive"){
            //do nothing
        }else{
            let button = document.getElementById(this.id);
            button.classList.add("hover");
        }
    }

    touchEndhandler(e){
        let button = document.getElementById(this.id);
            button.classList.remove("hover");
        if(this.props.type==="inactive" || (typeof this.props.onClick === "undefined")){
            //do nothing
        }else{
            this.props.onClick(e)
        }
    }
    render(){
        return(
        <div className={`CustomButton CustomSwitch button${this.props.type}${(this.props.value)?" active":""}`} onClick={this.props.onClick} id={this.id}>{this.props.label}
            <input className="CustomCheckBox" onChange={this.props.onChange} type="checkbox" id={this.props.id} name={this.props.name} value={this.props.value}/>
        </div>)
    }
}


export {RadioButton, CheckBox, Button, Dropdown, TextInput, SwitchButton}