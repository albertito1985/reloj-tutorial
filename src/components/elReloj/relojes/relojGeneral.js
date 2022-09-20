import {es} from '../../../modell/writtenComponents/written';

export let general = {
    getRandomTime(){
      let minutes = Math.floor(Math.random() * 60);
      let rest = minutes%5;
      minutes = (rest>=3)?minutes+(5-rest):minutes-rest;
      return {
        hours: Math.floor(Math.random() * 23),
        minutes: minutes
      }
    },
    compareTime(actual,input){
      let evaluation = false;
      if(Array.isArray(input.hours)){
        input.hours.forEach((hour)=>{
          if(hour===actual.hours){
            evaluation = true;
            input.hours = hour;
          }
        })
      }else{
        evaluation = true;
      };
      if(evaluation!== false){
        if(actual.hours===input.hours && actual.minutes === input.minutes){
          return true;
        }else{
          return false;
        }
      }else{
        return false;
      }
    },
    compareSpelling(response){
      let correctSpelling = es.phraseFinder(response.results.hours,response.results.minutes,response.analysis.mode,response.results.period,response.analysis.type)
      if(correctSpelling[0].phrase.localeCompare(response.analysis.phrase) === 0){
        return true;
      }else{
        return correctSpelling[0].phrase;
      }
    },
    randomGreeting(){
      let greetings = ["Perfecto!","Muy bién!","Felicidades!", "Enhorabuena!","Bien hecho!","Buen trabajo!"];
      return greetings[Math.floor(Math.random() * greetings.length)];
    }
  }