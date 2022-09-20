import {Component} from 'react';
import logo from '../../images/ES.svg';

export class LoadingMarkup extends Component {
    render(){
        return(
            <div className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
            </div>
        )
    }
}