import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from './chart/chart.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ChartModule
  ],
  exports: [
    ChartModule
  ]
})
export class SharedModule { }
