import { withTranslation } from 'react-i18next';
import { t } from 'i18next';
import {Component} from 'react';
import {Button} from '../../input/input';
import './NextBack.css';
import {IoChevronBackSharp,IoChevronForwardSharp} from 'react-icons/io5';



class NextBack extends Component {
    backLabel= <div className="buttonLabel">
            <IoChevronBackSharp className='buttonLabelIcon'/>
            {t("back")}
        </div>;
    nextLabel= <div className="buttonLabel">
        {t("next")}
        <IoChevronForwardSharp className='buttonLabelIcon'/>
    </div>    
    render(){
        return(
            <div className="nextBack">
                <Button type={(this.props.back==="inactive")?"inactive":"1"} onClick={this.props.backFunction} label={this.backLabel}/>
                <Button type={(this.props.next==="inactive")?"inactive":"1"} onClick={this.props.nextFunction} label={this.nextLabel}/>
            </div>
            )
    }
}

export default withTranslation()(NextBack);