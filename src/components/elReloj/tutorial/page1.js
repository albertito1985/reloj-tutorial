import { t } from 'i18next';
import {Component} from 'react';
import { withTranslation } from 'react-i18next';
import './pages.css';
import { Link, Routes, Route} from "react-router-dom";
import Configuration from '../config';
import Tutorial from './inicio';




class Page1 extends Component{
    render(){
        return(
            <div className="pages">
            </div>
        )
    }
}

export default Page1