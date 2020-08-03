import { MatButtonModule } from '@angular/material/button';
import { CitiesService } from './services/cities.service';
import { RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenWeatherService } from './services/open-weather.service';
import { ForecastComponent } from './forecast.component';
import { HttpClientModule } from '@angular/common/http';
import { DailyModule } from './daily/daily.module';
import { DailyComponent } from './daily/daily.component';

import { TimeUtilitiesService } from './services/time-utilities.service';
import { IconsDispatcherService } from './services/icons-dispatcher.service';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ForecastComponent
  ],
  imports: [
    CommonModule,
    SharedModule,

    //deps
    HttpClientModule,

    DailyModule,
    MatIconModule,
    MatButtonModule,

    //routing
    RouterModule.forChild([
      { path: '',       component: ForecastComponent  },
      { path: 'daily',  component: DailyComponent }
    ]),    
  ],
  providers: [
    OpenWeatherService,
    TimeUtilitiesService,
    CitiesService,
    IconsDispatcherService
  ]
})
export class ForecastModule { }
