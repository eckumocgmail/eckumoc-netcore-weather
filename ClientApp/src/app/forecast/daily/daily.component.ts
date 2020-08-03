import { TimeUtilitiesService } from './../services/time-utilities.service';

import { Component, OnInit, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { CityModel } from './../models/city.model';
import { of } from 'rxjs';
import { CitiesService } from './../services/cities.service';
import { OpenWeatherService } from './../services/open-weather.service';
import { OnecallResponseModel } from '../models/onecall-response.model';
import { ChartService } from 'src/app/shared/chart/chart.service';

import * as Highcharts from 'highcharts';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

declare var require: any;
const Boost = require('highcharts/modules/boost');
const noData = require('highcharts/modules/no-data-to-display');
const More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styles: [
   // `.link-active{background-color: black; color: white;}
    //  .shadow-box{border-radius: 5px; box-shadow: 0px 4px 3px -2px rgba(0, 0, 0, 0.4), 0px 2px 2px 0px rgba(0, 0, 0, 0.24), 0px 2px 6px 0px rgba(0, 0, 0, 0.22);} `
  ]
})
export class DailyComponent implements OnInit,OnChanges {

  //datepickers model
  minDate = null;
  maxDate = null;
  maxDateLimit: Date;
  minDateLimit: Date;


  //chart model
  @ViewChild('node', {static: true} ) node: ElementRef;
  title = 'Динамика изменения температуры';
  //series: { name: string, data: number[] }[] = [];
  view:     'table'|'chart'='chart';
  cities:   CityModel[];
  city:     CityModel;
  categories: string[] = [];
  

  //params model
  params = [
    { label: 'температура', name: 'temp',     value: true , data: [] },
    { label: 'влажность',   name: 'humidity', value: false, data: [] },
    { label: 'давление',    name: 'pressure', value: false, data: [] },
  ]
  paramsMap = {
    temp:     this.params[0],
    humidity: this.params[1],
    pressure: this.params[2],
  }

  //data model
  onecall:  OnecallResponseModel = new OnecallResponseModel();

  constructor(
    public timeUtilitiesService: TimeUtilitiesService,
    private charts: ChartService,
    private service: OpenWeatherService,
    private citiesService: CitiesService ) { }

  ngOnInit() {
    window['$'] = this;
    const ctrl = this;
    if( !this.citiesService.cities ){
      this.citiesService._cities.subscribe((cities)=>{ctrl.citiesService.cities=cities; ctrl.setCitylist(cities);});
    }else{
      this.setCitylist(this.citiesService.cities);
    }
    setTimeout(()=>{ctrl.updateChart();},1700);
  }

  ngOnChanges( changes: SimpleChanges ){
    console.log(changes);
    this.updateChart();
  }

  toggleParam( key  ){
    console.log(key);
    let paramForChanges = this.params.find(p=>p.name==key);
    paramForChanges.value = paramForChanges.value? false: true;
  }

  getMinDate( date1: Date, date2: Date ){
    if( !date1 && !date2 ) return null;
    if( !date1 ){
      date1 = new Date('10.10.2040');
    }
    if( !date2 ){
      date2 = new Date('10.10.2040');
    }
    return date1.getTime()<date1.getTime()? date1: date2;
  }

  onDateChange( keyToProperty: string, event: MatDatepickerInputEvent<any> ){
    console.log( event );
    switch(keyToProperty){
      case 'minDate':  
        this.minDate = event.value;
        break;
      case 'maxDate':
        this.maxDate = event.value;
        break;
    }
    this.updateSeriesByCalendar( this.minDate, this.maxDate );
  }

  updateSeriesByCalendar( min: Date, max: Date ){
    const ctrl = this;
    of(ctrl.cities[ Math.floor(Math.random()*ctrl.cities.length)]).subscribe((_city: CityModel)=>{
      console.log(_city);
      ctrl.city = _city;
      ctrl.service.getOneCall(_city.name, new Date() ).subscribe((onecall: OnecallResponseModel)=>{

        console.log( onecall );
        ctrl.onecall = onecall;
        let i1 = Math.floor(onecall.daily.length*Math.random());
        let i2 = Math.floor(onecall.daily.length*Math.random());

        const tempDays = onecall.daily;
        const days = onecall.daily.filter((day)=>{

          console.log( 'dt=',day.dt, 'min=',min.getTime()/1000,'max=',day.dt<=(max.getTime()/1000));
          return day.dt>=(min.getTime()/1000) && day.dt<=(max.getTime()/1000);
        });
        onecall.daily = days;
        
        if( ctrl.view=='chart' ){
          ctrl.updateChart();
        }
        this.minDateLimit = new Date(tempDays[0].dt*1000);
        this.maxDateLimit = new Date(tempDays[tempDays.length-1].dt*1000);
      });
    });
  }  

  setView( view: 'table'|'chart' ){
    console.log( view );
    this.view = view;
    this.updateChart();
  }


  updateSeries( ){
    const ctrl = this;
    const props = {};
    this.paramsMap.temp.data = [];
    this.paramsMap.humidity.data = [];
    this.paramsMap.pressure.data = [];
    ctrl.categories = [];

    // ###
    ctrl.paramsMap.temp.data.push(props['temp']={ name: 'Температура', data: [] });

    if( !this.onecall || !this.onecall.daily ){
      return;
    }else{            
      this.onecall.daily.forEach(day=>{
        let d: Date = new Date(day.dt*1000);
        let datestr =
          (d.getDate()<10?'0'+d.getDate(): d.getDate())+'.'+
          (d.getMonth()<10?'0'+d.getMonth(): d.getMonth())+'.'+
          (d.getFullYear());
        //datestr = //ctrl.timeUtilitiesService.getDayOfWeek(d) + '('+datestr+')';
//          this.timeUtilitiesService.getFullDayOfWeek(d);
        ctrl.minDateLimit = ctrl.minDate = (ctrl.minDate?ctrl.minDate.getTime():new Date().getTime())>(d.getTime())? d: ctrl.minDate;
        ctrl.maxDateLimit = ctrl.maxDate = (ctrl.maxDate?ctrl.maxDate.getTime():new Date().getTime())<(d.getTime())? d: ctrl.maxDate;
        //if( ctrl.categories.indexOf(datestr)==-1 ){
          ctrl.categories.push(datestr);
        //}

        // ###
        props['temp'].data.push(day.temp.day);
      });
      
    }
  }

  updateChart(){
    this.updateSeries();     
  }

  trace( evt ){
    console.log(evt);
  }


  setRandomTimeRange(){
    const ctrl = this;
    of(ctrl.cities[ Math.floor(Math.random()*ctrl.cities.length)]).subscribe((_city:CityModel)=>{
      console.log(_city);
      ctrl.city = _city;
      ctrl.service.getOneCall(_city.name, new Date() ).subscribe((onecall: OnecallResponseModel)=>{
        console.log( onecall );
        ctrl.onecall = onecall;
        let i1 = Math.floor(onecall.daily.length*Math.random());
        let i2 = Math.floor(onecall.daily.length*Math.random());
        const days = [];
        for( let i=Math.min(i1,i2); i<Math.max(i1,i2); i++ ){
          days.push(onecall.daily[i]);
        }
        onecall.daily = days;
        if( ctrl.view=='chart' ){
          ctrl.updateChart();
        }
      });
    });
  }

  /**
   * Метод обновления данных для представления. 
   * На момент обновления данные о городах должны находится в переменной cities.
   */
  updateData(){
    const ctrl = this;
    of(ctrl.cities[ Math.floor(Math.random()*ctrl.cities.length)]).subscribe((_city:CityModel)=>{
      console.log(_city);
      ctrl.city = _city;
      ctrl.service.getOneCall(_city.name, new Date() ).subscribe((onecall: OnecallResponseModel)=>{
        console.log( onecall );
        ctrl.onecall = onecall;
        if( ctrl.view=='chart' ){
          ctrl.updateChart();
        }
      });
    });
  }

  setCitylist( cities: CityModel[] ){
    this.cities = cities;
    this.updateData();
  }

}
