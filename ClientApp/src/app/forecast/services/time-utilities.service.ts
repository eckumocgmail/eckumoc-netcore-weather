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

  getDayOfWeek( date: Date ){
    const days = ['Пн','Вт','Ср','Чт','Пт','Суб','Вс'];
    return days[date.getDay()];
  }
}
