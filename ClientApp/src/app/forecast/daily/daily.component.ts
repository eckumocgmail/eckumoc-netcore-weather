import { TimeUtilitiesService } from './../services/time-utilities.service';

import { Component, OnInit, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { CityModel } from './../models/city.model';
import { of, Observable } from 'rxjs';
import { ForecastModel } from './../models/forecast.model';
import { CitiesService } from './../services/cities.service';
import { OpenWeatherService } from './../services/open-weather.service';
import { OnecallResponseModel } from '../services/messages/onecall-response.model';
import { ChartService } from 'src/app/services/chart.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styles: [
    `.shadow-box{border-radius: 5px; box-shadow: 0px 4px 3px -2px rgba(0, 0, 0, 0.4), 0px 2px 2px 0px rgba(0, 0, 0, 0.24), 0px 2px 6px 0px rgba(0, 0, 0, 0.22);} `
  ]
})
export class DailyComponent implements OnInit,OnChanges {

  //datepickers model
  minDate = new Date();
  maxDate = new Date();


  //chart model
  @ViewChild('node', {static: true} ) node: ElementRef;
  title = 'Динамика изменения температуры';
  series: { name: string, data: number[] }[] = [];
  view:     'table'|'chart'='chart';
  cities:   CityModel[];
  city:     CityModel;
  categories: string[] = [];

  //params model
  params = [
    { label: 'температура', name: 'temp',     value: true },
    { label: 'влажность',   name: 'humidity', value: false },
    { label: 'давление',    name: 'pressure', value: false },
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
    this.updateChart();
  }

  ngOnChanges( changes: SimpleChanges ){
    this.updateChart();
  }

  toggleParam( key  ){
    console.log(key);
    let paramForChanges = this.params.find(p=>p.name==key);
    paramForChanges.value = paramForChanges.value? false: true;
  }

  setView( view: 'table'|'chart' ){
    this.view = view;
    this.updateChart();
  }

  updateSeries(){
    const ctrl = this;
    const props = {};
    this.series = [];
    ctrl.categories = [];
    ctrl.series.push(props['temp']={ name: 'Температура', data: [] });

    if( !this.onecall || !this.onecall.daily ){
      return;
    }else{
      ctrl.minDate = new Date('01.01.2970');
      ctrl.maxDate = new Date('01.01.1970');
      this.onecall.daily.forEach(day=>{
        let d: Date = new Date(day.dt*1000);
        let datestr =
          (d.getDate()<10?'0'+d.getDate(): d.getDate())+'.'+
          (d.getMonth()<10?'0'+d.getMonth(): d.getMonth())+'.'+
          (d.getFullYear());
        datestr = ctrl.timeUtilitiesService.getDayOfWeek(d) + '('+datestr+')';
        ctrl.minDate = ctrl.minDate.getTime()>d.getTime()? d: ctrl.minDate;
        ctrl.maxDate = ctrl.maxDate.getTime()<d.getTime()? d: ctrl.maxDate;
        if( ctrl.categories.indexOf(datestr)==-1 ){
          ctrl.categories.push(datestr);
        }
        props['temp'].data.push(day.temp.day);
      });
    }
  }

  updateChart(){
    this.updateSeries();
    const options = new Object({
        series: this.series,
        xAxis: {
          categories: this.categories,
          units: 'Цельсии',
        },
        title: {
          text: this.title,
          type: 'area'
        }
    });
    if ( !this.node ) {
        console.error('chartElement undefined in StructureChartComponent');
    } else {
        this.charts.chart(this.node.nativeElement, options);
    }
  }

  trace( evt ){
    console.log(evt);
  }

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
