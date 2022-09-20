import translate from '../timeFunctions';

export let relojDigital = {
    hours:0,
    minutes:0,
    togglePeriodIn24h(timeObject12){
      let time24= translate.time12hto24h(timeObject12);
      if(this.state.period === "PM"){
        //pm to am
        return {
          hours: time24.hours - 12,
          minutes: time24.minutes
        };
      }else{
        //am to pm
        return {
          hours: (time24.hours +12 === 24)?0:time24.hours +12,
          minutes: time24.minutes
        }
      }
    }
  }