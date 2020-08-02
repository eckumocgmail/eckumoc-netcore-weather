
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { CityModel } from '../models/city.model';
import { map } from 'rxjs/operators';
import { ForecastModel } from '../models/forecast.model';

@Injectable()
export class CitiesService {

  _cities: Observable<CityModel[]>;
  cities: CityModel[];

  constructor( public httpClient: HttpClient ) {
    const ctrl = this;
    var timeout = 100;
    var n = 0;
    this._cities = this.httpClient.get<CityModel[]>('/assets/ru.city.list.json');
  }

  getLocationForName( name: string ){
    return this.cities.find(city=>city.name==name).coord;
  }

}
