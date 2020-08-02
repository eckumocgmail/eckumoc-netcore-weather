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
  template: `
    <div *ngIf="city" style="width: 100%;">
      <h1>{{city.country}}, {{city.name}}</h1>


      <div style="display: flex; flex-direction: row; width: 100%; flex-wrap: nowrap;">
        <div  style="width: 100%;">


          <mat-form-field appearance="fill">
            <mat-label>Начало периода</mat-label>
            <input matInput [matDatepicker]="beginPicker" [(ngModel)]="minDate" (input)="trace($event)" (changes)="trace($event)">
            <mat-datepicker-toggle matSuffix [for]="beginPicker" (changes)="trace($event)"></mat-datepicker-toggle>
            <mat-datepicker #beginPicker></mat-datepicker>
          </mat-form-field>

          <mat-form-field appearance="fill">
            <mat-label>Конец пеиода</mat-label>
            <input matInput [matDatepicker]="endPicker" [min]="minDate" [(ngModel)]="maxDate" (input)="trace($event)" (changes)="trace($event)">
            <mat-datepicker-toggle matSuffix [for]="endPicker" (changes)="trace($event)"></mat-datepicker-toggle>
            <mat-datepicker #endPicker></mat-datepicker>
          </mat-form-field>

        </div>

        <div style="width: 100%; padding-left: 20px; padding-right: 20px;">
          <mat-button-toggle-group style="width: 100%;" (change)="setView($event.value)" [value]="view">
            <mat-button-toggle [value]="'table'" style="width: 100%;"> таблица </mat-button-toggle>
            <mat-button-toggle [value]="'chart'" style="width: 100%;"> диаграмма </mat-button-toggle>
          </mat-button-toggle-group>
        </div>
      </div>
    </div>

    <div style="display: flex; flex-direction: row; flex-wrap: nowrap; width: 100%; height: 100%;">
      <div>
        <h6>Параметры: </h6>
        <mat-button-toggle-group style="width: 100%;" [multiple]="true" style="display: flex; flex-direction: column; flex-wrap: nowrap;">
          <mat-button-toggle *ngFor="let param of params" (change)="toggleParam(param.name)"  [value]="param.value" style="width: 100%;"  > {{ param.label }} </mat-button-toggle>
        </mat-button-toggle-group>

      </div>
      <div style="width: 100%;">
        <div *ngIf="view=='table'" style="width: 100%;">
          <table class="table" *ngIf="onecall" style="width: 100%;">
            <thead>
              <tr>
                <th scope="col">Дата</th>
                <th scope="col">Утро</th>
                <th scope="col">День</th>
                <th scope="col">Вечер</th>
                <th scope="col">Ночь</th>

              </tr>
            </thead>
            <tbody *ngIf="onecall.daily">
              <tr *ngFor="let day of onecall.daily">
                <th scope="row"> {{(day.dt*1000) | date: 'dd.MM.yyyy'}} </th>

                <td>{{day.temp.morn}} </td>
                <td>{{day.temp.day}} </td>
                <td>{{day.temp.eve}} </td>
                <td>{{day.temp.night}} </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div [hidden]="view!='chart' && param.value" *ngFor="let param of params">

          <div #node style="width: 100%; height: 100%;"></div>
        </div>
      </div>
    </div>
  `,
  styles: []
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
    { label: 'температура', name: 't', value: true },
    { label: 'влажность', name: 'v', value: false },
    { label: 'давление', name: 'd', value: false },
  ]

  //data model
  onecall:  OnecallResponseModel = new OnecallResponseModel();

  constructor(
    private timeUtilitiesService: TimeUtilitiesService,
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
