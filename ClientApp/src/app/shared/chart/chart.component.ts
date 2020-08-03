import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ChartService } from 'src/app/services/chart.service';


import * as Highcharts from 'highcharts';

declare var require: any;
const Boost = require('highcharts/modules/boost');
const noData = require('highcharts/modules/no-data-to-display');
const More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'app-chart',
  template: `
    <div #node style="width: 100%; height: 100%;" >
    </div>
  `,
  styles: []
})
export class ChartComponent implements OnInit {


   @ViewChild('node', {static: true} ) node: ElementRef;
   ngOnInit(){
     if ( !this.node ) {
       console.error('chartElement undefined in StructureChartComponent');
     } else {
         Highcharts.chart(this.node.nativeElement, new Object(this.chartOptions) );
     }
   }
 
   title = 'Area chart';
   highcharts = Highcharts;
   chartOptions = {   
       chart: {
          type: 'area'
       },
       title: {
          text: 'Average fruit consumption during one week'
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
          categories: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'] 
       },
       yAxis : {
          title: {
             text: 'Number of units'
          },
          labels: {
             formatter: function () {
                return this.value;
             }
          },
          min:0
       },
       tooltip : {
          formatter: function () {
             return '<b>' + this.series.name + '</b><br/>' +
                this.x + ': ' + this.y;
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
       series: [
          {
             name: 'John',
             data: [3, 4, 3, 5, 4, 10, 12]
          }, 
          {
             name: 'Jane',
             data: [1, 3, 4, 3, 3, 5, 4]
          }
       ]
    };
}
