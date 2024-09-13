import {Component} from 'react';
import {t} from 'i18next';

class Tittle extends Component{
    render(){
        return(
                <div className="phraseTemplate">
                    <h1>{t('titulo')}</h1>
                </div>
        )
    }
}

export default Tittle;