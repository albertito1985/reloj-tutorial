export let translate = {
    time12hto24h(timeObject){
      let responseObject={minutes: timeObject.minutes};
      if(timeObject.hours === 12 && timeObject.period === "AM"){
        responseObject.hours = 0;
      }else if (timeObject.hours === 12 && timeObject.period === "PM"){
        responseObject.hours = timeObject.hours;
      }else if(timeObject.period === "PM"){
        responseObject.hours = timeObject.hours +12;
      }else{
        responseObject.hours = timeObject.hours;
      }
      return responseObject;
    },
    time24hto12h(timeObject){
      if(timeObject.hours === 0 ){
        timeObject.hours = 12;
          timeObject.period ="AM"
      }else if(timeObject.hours > 12){
        timeObject.hours = timeObject.hours - 12;
        timeObject.period = "PM";
      }else if(timeObject.hours === 12){
          timeObject.period ="PM"
      } else{
        timeObject.period ="AM"
      }
      return timeObject;
    }
  }