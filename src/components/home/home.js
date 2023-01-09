import {Component} from 'react';
import i18t from 'i18next';
import {t} from 'i18next';
import { withTranslation} from 'react-i18next';
import {setDefaultNamespace} from 'i18next';
import puffsContent from './homeModell';
import {Link} from 'react-router-dom';
import './home.css';

class Home extends Component{
    constructor(){
        super();
        setDefaultNamespace('general')
    }
    render(){
        return(
            <div className="themesHome">
                <h1>{t('themes')}</h1>
                <div className="themesHomePuffs">
                    {Object.keys(puffsContent).map((puff)=>{
                        return <Puff key={puffsContent[puff]["name"]} contentObject={puffsContent[puff]}/>
                    })}
                </div>
            </div>
        )
    }
}

class Puff extends Component {
    
    render(){
        let name= this.props.contentObject.name;
        let title= this.props.contentObject.title;
        let address= this.props.contentObject.address;
      return(
        <Link to={address}>
            <div className={`homePuff puff${name}`}>
            <div className={`homePuffImage homePuffImage${name}`}></div>
            <div className="homePuffText">
                <h2 className="homePuffTitle">{title}</h2>
                <div className="homePuffExplanation">
                    {t(name)}
                </div>
            </div>
            </div>
        </Link>
      )
    }
  }

export default withTranslation()(Home);