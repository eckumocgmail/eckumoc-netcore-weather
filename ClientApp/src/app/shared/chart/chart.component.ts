import { Component, OnInit, ElementRef, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ChartService } from './chart.service';

declare var require: any;
const Boost = require('highcharts/modules/boost');
const noData = require('highcharts/modules/no-data-to-display');
const More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'ui-chart',
  template: `
    <div #node style="width: 100%; height: 100%;">
    </div>
  `,
  styles: []
})
export class ChartComponent implements OnInit, OnChanges {

   @ViewChild('node', {static: true} ) node: ElementRef;

   @Input() title: string = 'Динамика';
   @Input() yLabel: string = 'Подпись оси Y';
   @Input() series: { name: string, data: number[] }[] = [];
   @Input() categories: string[] = [];

   constructor( 
      private charts: ChartService ){
   }

   ngOnInit(){
      this.update();     
   }

   ngOnChanges( changes: SimpleChanges ){
      this.update();
   }

   update(){
      const options = new Object(
      {   
         chart: {
            type: 'area'
         },
         title: {
            text: this.title
         },
         subtitle : {
            style: {
               position: 'absolute',
               right: '0px',
               bottom: '10px'
            }
         },
         legend : {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: -150,
            y: 100,
            floating: true,
            borderWidth: 1,
            backgroundColor: '#FFFFFF'
         },
         xAxis:{
            categories: this.categories
         },
         yAxis : {
            title: {
               text: 'Температура (℃)'
            },
            labels: {
               formatter: function () {
                  return this.value;
               }
            },
            min: 0
         },
         tooltip : {
            formatter: function () {
               return '<b>' + this.series.name + '</b><br/>' + this.x + ': ' + this.y;
            }
         },
         plotOptions : {
            area: {
               fillOpacity: 0.5 
            }
         },
         credits:{
            enabled: false
         },
         series: this.series
      });
      if ( !this.node ) {
            console.error('#node not defined at template of shared chart component');
      } else {
            this.charts.chart(this.node.nativeElement, options);
      }      
   }
      
}
