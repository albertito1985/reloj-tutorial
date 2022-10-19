import {Component} from 'react';
import logo from '../../images/ES.svg';
import "./loading.css";

export class LoadingMarkup extends Component {
    render(){
        return(
            <div className="LoadingMarkup">
                <div className="LoadingImage" alt="logo" />
            </div>
        )
    }
}