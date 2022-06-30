import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { MapaChartComponent } from './mapa-chart/mapa-chart.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'barChart', component: BarChartComponent },
  { path: 'pieChart', component: PieChartComponent },
  { path: 'mapaChart', component: MapaChartComponent }
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
