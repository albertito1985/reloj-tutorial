import {Component} from 'react';
import {t} from 'i18next';
import './footer.css';

export class Footer extends Component {
    render(){
        return(
                <footer>
                    <div className="footerContent footerContent1">
                        {t('footer',{ns:'general'})}
                    </div>
                    <div id="adminName">Alberto Nuñez</div>
                    <a href="tel:0737296127">{t('telephone',{ns:'general'})} 073 72 96 127</a>
                </footer>
        )
    }
}