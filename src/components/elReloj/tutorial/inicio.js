import { t } from 'i18next';
import React, {createElement,Component} from 'react';
import { withTranslation } from 'react-i18next';
import '../pages.css';
import {RelojAnalogo} from '../relojes/relojAnalogo/relojAnalogo';
import {Button} from '../../input/input'
import { isContentEditable } from '@testing-library/user-event/dist/utils';


class Tutorial extends Component {
    constructor(){
        super();
        this.state={
            page:0,
        };
        this.pages=[];
        this.config ={};
        this.moments = {
            actual:[],
            duration:{
                parts: 1,
                minutearm:1,
                phrase1:3,
                min15and30:1,
                phrase2:2,
                phrase3:2,
                phrases2and3:1,
                periods:1,
                answer:3,
            }
        };
        this.generateContent=this.generateContent.bind(this);
        this.nextPage = this.nextPage.bind(this);
    }
    nextPage(){
        console.log("nextPage");
        let pagenumber;
        if(this.state.page === undefined){
            pagenumber = 0
        }else{
            let temp = this.state.page;
            pagenumber =temp++;
        }
        this.setState({page:pagenumber})

    }
    previousPage(){

    }

    componentDidMount(){
        // decoding the URL
        let urlString = window.location.href;
        let queryStart = urlString.indexOf("?")+1;
        let query = urlString.slice(queryStart,urlString.length);
        let pairs = query.replace(/\+/g, " ").split("&");
        let stateUpdate = {}
        pairs.forEach((pair)=>{
            let nv = pair.split("=", 2);
            let n = decodeURIComponent(nv[0]);
            let v = decodeURIComponent(nv[1]);
            if(v==="true"||v==="false"){
                stateUpdate[n] = Boolean(v);
            }else{
                stateUpdate[n] = v;
            }
            
        });
        //splitting the configuration and the moments values
        let data = Object.keys(stateUpdate);
        data.forEach((value)=>{
            if(value ==="lang" || value ==="esType"){
                this.config[value]=stateUpdate[value];
            }else{
                this.moments.actual.push(value);
            }
        });
        //generating the series of pages according to the moments.
        this.moments.actual.forEach((value)=>{
            for(let i=0;i<this.moments.duration[value];i++){
                this.pages.push(`${value+i}`)
            }
        })
    }

    generateContent(){
        function createElement(page, props){
            let parts ={
                parts0 : <Parts0 {...props}/>,
                phrase10: null,
                phrase11: null,
                phrase12:null,
                minutearm0:null,
                phrase20:null,
                phrase21:null,
                min15and300:null,
                phrase30:null,
                phrase31:null,
                phrases2and30:null,
                periods0:null,
                answer0:null,
                answer1:null,
                answer2:null
            }

            return parts[page];
        }

        if(this.state.page === undefined){
            return <Home nextPage={this.nextPage}/>
        }else{
            const myComponent = createElement(this.pages[this.state.page], {nextPage:this.nextPage});
            return myComponent;
        }

    };

    render(){

        return(
            <div className="pages">
                {this.generateContent()}
            </div>
        )
    }
}

class Home extends Component{
    render(){
        return(
                <div className="home">
                    <h1>{t('titulo')}</h1>
                    <Button active={true} label={t('start')} onClick={this.props.nextPage}/>
                </div>
        )
    }
}
class Parts0 extends Component{
    render(){
        return(
                <div className="parts0">
                    <h1>{t('parts.title')}</h1>
                    <p>{t('parts.explanation')}</p>
                    <div>
                        <RelojAnalogo/>
                        <div>
                            <Button label="Horas"/>
                            <Button label="Minutos"/>
                            <Button label="Horario"/>
                            <Button label="Minutero"/>

                        {/* // Cambiar de color a los botones */}
                        </div>
                    </div>
                </div>
        )
    }
}

export default withTranslation()(Tutorial);