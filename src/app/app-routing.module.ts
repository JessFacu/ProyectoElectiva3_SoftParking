import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';

const routes: Routes = [
  { path: '', component: BarChartComponent },
  { path: 'barChart', component: BarChartComponent },
  { path: 'pieChart', component: PieChartComponent }
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],exports:[
    RouterModule
  ],
})
export class AppRoutingModule { }