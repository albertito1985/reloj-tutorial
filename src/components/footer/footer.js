import {Component} from 'react';
import {t} from 'i18next';
import './footer.css';
import {BsFillTelephoneFill} from 'react-icons/bs';
import {MdEmail} from'react-icons/md'

export class Footer extends Component {
    render(){
        return(
                <footer>
                    <div className="footerContent footerContent1">
                        {t('footer',{ns:'general'})}
                    </div>
                    <div id="adminName">Alberto Nuñez</div>
                    <a href="tel:0737296127"><BsFillTelephoneFill/> 073 72 96 127</a>
                    <a href="mailto:anulo@live.se"><MdEmail/> anulo@live.se</a>
                </footer>
        )
    }
}