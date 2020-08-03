import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CitiesService } from './cities.service';
import { ForecastModel } from './../models/forecast.model';
import { TimeUtilitiesService } from './time-utilities.service';
import { OnecallResponseModel } from '../models/onecall-response.model';

@Injectable()
export class OpenWeatherService
{

  constructor(
    private httpClient: HttpClient,
    private citiesService: CitiesService,
    private timeUtilitiesService: TimeUtilitiesService  ) {
      window['weather'] = this;
  }

  getOneCall( cityname: string, date: Date ): Observable<OnecallResponseModel>{
    let coord = this.citiesService.getLocationForName( cityname );
    let time = date.getTime();
    return this.httpClient.get<OnecallResponseModel>('/api/WeatherForecast/GetOneCall',
    {
      params: {
        lat: coord.lat+'',
        lon: coord.lon+'',
        time: new Date().getTime()+'',
      }
    });
  }

  getWeatherForecast( cityname: string ){
    return this.httpClient.get<ForecastModel>('/api/WeatherForecast/GetWeatherForecastByCity',
    {
      params: {
        cityname: cityname
      }
    });
  }
}
