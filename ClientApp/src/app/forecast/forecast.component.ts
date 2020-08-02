
import { Component, OnInit } from '@angular/core';
import { CityModel } from './models/city.model';
import { of } from 'rxjs';
import { ForecastModel } from './models/forecast.model';
import { CitiesService } from './services/cities.service';
import { OpenWeatherService } from './services/open-weather.service';
import { IconsDispatcherService } from './services/icons-dispatcher.service';

@Component({
  selector: 'app-_forecast',
  template: `
    <div *ngIf="forecast && city">
      <h1>{{city.country=='RU'? 'Россия': city.country}}, {{forecast.name}}</h1>
      <h5>{{ (forecast.dt*1000)| date:'dd.MM.yyyy, hh час(ов)' }} </h5>
      <hr/>
      <div style="display: flex; flex-firection: row; flex-wrap: nowrap; width: 100%;">
        <div  >
          <dl>
            <dt>Широта &nbsp;</dt>
            <dd>{{city.coord.lat}}</dd>
            <dt>Долгота</dt>
            <dd>{{city.coord.lon}}</dd>
          </dl>
        </div>


        <div *ngIf="forecast" style="justify-self: flex-end; margin-left: auto;">
          <div *ngFor="let weather of forecast.weather">
            <div style="width: 225px; height: 225px; " align="center">
              <img [attr.src]="'http://openweathermap.org/img/wn/'+weather.icon.replace('n','d')+'@'+'2x.png'"/>
              <div>{{ weather.description }}</div>
            </div>
          </div>
        </div>

      </div>
      <hr/>
    </div>

    <!-- <img [attr.src]="icons.getSnowUrl()"/> -->
    <div *ngIf="forecast">

      <div>
        <table class="table">

          <tbody>
            <tr style="background-color: var(--blue); color: white;">
              <th>Температура</th>
              <td>{{ forecast.main.temp }} ℃</td>
            </tr>
            <tr>
              <th scope="row">Минимальная температура</th>
              <td>{{ forecast.main.temp_min }} ℃</td>
            </tr>
            <tr>
              <th scope="row">Максимальная температура</th>
              <td>{{ forecast.main.temp_max }} ℃</td>
            </tr>
            <tr>
              <th scope="row">Скорость ветра</th>
              <td>{{ forecast.wind.speed }} м/c</td>
            </tr>        <tr>
              <th scope="row">Направление ветра</th>
              <td>
                {{
                  forecast.wind.deg>(360/8/2)&&forecast.wind.deg<=((360/8/2)+((360/8))) ? 'северо-восточно':
                  forecast.wind.deg>((360/8/2)+((360/8)))&&forecast.wind.deg<=((360/8/2)+((360/8))*2) ? 'восточное':

                  forecast.wind.deg>((360/8/2)+((360/8))*2)&&forecast.wind.deg<=((360/8/2)+((360/8))*3) ? 'юго-восточное':
                  forecast.wind.deg>((360/8/2)+((360/8))*3)&&forecast.wind.deg<=((360/8/2)+((360/8))*4) ? 'южное':
                  forecast.wind.deg>((360/8/2)+((360/8))*4)&&forecast.wind.deg<=((360/8/2)+((360/8))*5) ? 'юго-западное':
                  forecast.wind.deg>((360/8/2)+((360/8))*5)&&forecast.wind.deg<=((360/8/2)+((360/8))*6) ? 'западное':
                  forecast.wind.deg>((360/8/2)+((360/8))*6)&&forecast.wind.deg<=((360/8/2)+((360/8))*7) ? 'северо-западное':
                  forecast.wind.deg>((360/8/2)+((360/8))*7)||forecast.wind.deg<(360/8/2) ? 'северное':
                  ''
                }}
                <!-- <mat-icon [ngStyle]="{'font-size': '44px', 'transform': 'rotate('+forecast.wind.deg+'deg)'}">trending_flat</mat-icon> -->
              </td>
            </tr>
            <tr>
              <th scope="row">Атмосферное давление</th>
              <td>
                <!-- {{ forecast.main.sea_level }} гПа, {{ forecast.main.grnd_level }} гПа, -->
                {{ forecast.main.pressure }} гПа</td>
            </tr>
            <tr>
              <th scope="row">Влажность</th>
              <td>{{ forecast.main.humidity }} %</td>
            </tr>
            <!-- <tr  >
              <th scope="row"> </th>
              <td>{{ forecast.main.feels_like }} ℃</td>
            </tr> -->
          </tbody>
        </table>
      </div>

    </div>
  `,
  styles: []
})
export class ForecastComponent implements OnInit {

  cities:   CityModel[];
  city:     CityModel;
  forecast: any = new ForecastModel();
  onecall:  any = {};

  constructor(
    public icons: IconsDispatcherService,
    private service: OpenWeatherService,
    private citiesService: CitiesService ) { }

  ngOnInit() {
    const ctrl = this;
    if( !this.citiesService.cities ){
      this.citiesService._cities.subscribe((cities)=>{ctrl.citiesService.cities=cities; ctrl.setCitylist(cities);});
    }else{
      this.setCitylist(this.citiesService.cities);
    }
  }

  update(){
    const ctrl = this;
    of(ctrl.cities[ Math.floor(Math.random()*ctrl.cities.length)]).subscribe((_city:CityModel)=>{
      console.log(_city);
      ctrl.city = _city;
      ctrl.service.getOneCall(_city.name, new Date() ).subscribe((onecall)=>{
        console.log( onecall );
        ctrl.onecall = onecall;
      });
      ctrl.service.getWeatherForecast(_city.name).subscribe((forecast)=>{
        console.log( forecast );
        ctrl.forecast = forecast;
      });
    });
  }

  setCitylist( cities: CityModel[] ){
    this.cities = cities;
    this.update();
  }

  setForecast( forecast: ForecastModel ){
    console.log( forecast );
    this.forecast = forecast;
  }

}
