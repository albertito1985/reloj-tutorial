import {Component} from 'react';
import {NavLink} from "react-router-dom";
import './header.css';

import Flags from '../flags/flags';

export class Header extends Component {
    render(){
        return(
                <div className="header">
                    <div className="loggaContainer">
                    <NavLink to="/" className="loggaLink">
                        <div className="logga"></div>
                        </NavLink>
                    </div>   
                    <div className="flagsContainer">
                    <Flags />
                    </div>
                </div>
        )
    }
}