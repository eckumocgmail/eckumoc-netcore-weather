import { Injectable } from "@angular/core";

@Injectable()
export class TimeUtilitiesService
{

  SEC = 1000;
  MIN = 60*this.SEC;
  HOUR = 60*this.MIN;
  DAY = 24*this.HOUR;
  YEAR = 365*this.DAY;
  LYEAR = 366*this.DAY;

  toUnixTimestamp( date: Date ){
    return date.getTime();
  }

  fromUnixTimestamp( timestamp: number ){
    return new Date(timestamp);
  }

  getDayOfWeek( d: Date ){
    if( typeof(d)=='number' ){
      d = new Date(d*1000);
    }
    const date = d;
    const days = ['Пн','Вт','Ср','Чт','Пт','Суб','Вс'];
    return days[date.getDay()];
  }

  getFullDayOfWeek( d: Date ){
    if( typeof(d)=='number' ){
      d = new Date(d*1000);
    }
    const date = d;
    const days = ['Понедельник','Вторник','Среда','Четверг','Пятница','Суббота','Воскресение'];
    return days[date.getDay()];
  }


  toDateString(d){
    if( typeof(d)=='number' ){
      d = new Date(d*1000);
    }
    let datestr =
      (d.getDate()<10?'0'+d.getDate(): d.getDate())+'.'+
      (d.getMonth()<10?'0'+d.getMonth(): d.getMonth())+'.'+
      (d.getFullYear());
    return datestr;
  }
}
