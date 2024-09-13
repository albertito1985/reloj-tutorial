import {Component} from 'react';
import {t} from 'i18next';

class Answer0 extends Component{
    render(){
        return(
            <div className="answer0">
                <h1>{t('answer0.title')}</h1>
                <p>{t('answer0.explanation')}</p>
                <h2>¿Que hora es?</h2>
                <h2>{t('answer0.and')}</h2>
                <h2>¿A que hora ...?</h2>
            </div>
            )
    }
}

export default Answer0;