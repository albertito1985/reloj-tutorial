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
    
    render(){
        return(
            <div className={`CustomButton button${this.props.type}`} id={this.props.id} onClick={(this.props.type==="inactive")?null:this.props.onClick}>{this.props.label}</div>
        )
    }
}

class Dropdown extends Component{
    constructor(){
        super();
        this.state={
            selected:{
                value: undefined,
                phrase:undefined
            }
        }
        this.openClick=this.openClick.bind(this);
        this.handleClick=this.handleClick.bind(this);
    }

    openClick(){
        let itemsList= document.getElementById("itemsList");
        let CustomdropdownContainer = document.getElementById("CustomdropdownContainer");
        itemsList.classList.toggle("itemListShow");
        CustomdropdownContainer.classList.toggle("dropdownShow")
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
        let selected = document.getElementById("selectedItem");
        target.parentNode.children.forEach((div)=>{
            div.classList.remove("selected");
        })
        target.classList.add("selected");
        selected.textContent =target.textContent;
        this.props.recieveValue(target.attributes.datavalue.value);
        this.setState({selected:{value: target.attributes.datavalue.value, phrase: target.textContent}});
    }

    generateItems(optionsArray){
        let items = [];
        optionsArray.forEach((optionObject)=>{
            let div = <div className="item" onClick={this.handleClick} key={optionObject.value} datavalue={optionObject.value}>{optionObject.label}</div>
            items.push(div);
        });
        return items;
    }

    render(){
        return(
            <div className={`CustomdropdownContainer${(this.props.type === "inactive")?" CustomdropdownContainerInactive":""}`} 
                id="CustomdropdownContainer"
                onClick={(this.props.type!=="inactive")?this.openClick:undefined}
            >
                <span className={`selectedItem${this.state.selected.phrase?"":" selectedItemEmpty"}`} id="selectedItem">{this.state.selected.phrase || this.props.placeholder}</span>
                <span className="itemsList" id="itemsList">
                    {this.generateItems(this.props.options)}
                </span>
                <select id="customDropdown" className={`Customdropdown${this.props.type?` ${this.props.type}`:""}`} value={this.state.value}>
                    {this.generateOptions(this.props.options)}
                </select>
            </div>
        )
    }
}

export {RadioButton, CheckBox, Button, Dropdown}