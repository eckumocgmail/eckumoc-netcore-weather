import { Injectable } from '@angular/core';
import { TimeUtilitiesService } from './forecast/services/time-utilities.service';

@Injectable()
export class AppService {

  constructor( public timeUtilitiesService: TimeUtilitiesService  ) {
    window['app']=this;
  }
}
