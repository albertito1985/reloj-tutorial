import React, { Component } from 'react';
import {FlagIcon} from './FlagIcon';
import { withTranslation } from 'react-i18next';
import i18n from '../../i18n';
import './flags.css';

export class Flags extends Component {
    generateFlags(){
      const actualLanguage = i18n.language;
      const languages = {
        es : {
            code: "es",
            icon: "es",
            title: {
              active:"La página está en Español",
              passive: "Página en Español"
            },
            alt: "Traducir la página al Español"
        },
        en : {
            code: "en",
            icon: "gb",
            title: {
              active: "This page is in English",
              passive: "Page in English"
            },
            alt: "Translate the page to English"
        },
        se : {
            code: "se",
            icon: "se",
            title: {
              active:"Den här sidan är på Svenska",
              passive: "Sida på Svenska"
            },
            alt: "Översätt den här sidan till Svenska"
        }
      };
        let divs=[];
        
        Object.keys(languages).forEach((language)=>{
          let props={key:languages[language].code};
            let div;
            let size;
            let position;
            if(actualLanguage === languages[language].code){
             size="3x";
             position=1;
             props["title"] = languages[language].title.active;
            }else{
              size="2x";
              position=(divs[0])? 2:0;
              props["onClick"] = ()=>i18n.changeLanguage(languages[language].code);
              props["title"] = languages[language].title.passive;
              props["alt"] = languages[language].alt;
              props["className"] = "flagLink";
            }
            div = React.createElement("div",props,<FlagIcon code={languages[language].icon} size={size} />);
            divs[position] = div;
        })
        return divs;
    }
  render() {
    return <div className="languageMenu">
	<div className="flags">
      {this.generateFlags()}
	</div>
</div>;
  }
}

export default withTranslation()(Flags);
