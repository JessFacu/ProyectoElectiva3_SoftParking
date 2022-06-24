import { Component, OnInit } from '@angular/core';
import { StatsEspacios } from '../../data/data';

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';

@Component({
  selector: 'app-test-chart',
  templateUrl: './test-chart.component.html',
  styleUrls: ['./test-chart.component.css']
})
export class TestChartComponent implements OnInit {
  /*Para poder acceder al objeto obtenido se debe de especificarlo dentro de la calse*/
  statsEspacios= StatsEspacios;
  currentRate = 8;
  title = 'TESTTT';
  id: any;
  margin = {top: 20, right: 20, bottom: 30, left: 50};
  width: number;
  height: number;
  radius: number;
  g: any;
  arc: any;
  labelArc: any;
  labelPer: any;
  pie: any;
  color: any;
  svg: any;
  x: any;
  y: any;
  ycolUno = 50;
  ycolDos = 250;
  ycolTres = 450;

  constructor() {
    this.width = 900 - this.margin.left - this.margin.right ;
    this.height = 500 - this.margin.top - this.margin.bottom;
    this.radius = Math.min(this.width, this.height) / 2;
  }

  ngOnInit() {
    this.initSvg();
    //this.drawPie();
    //this.drawBars();
   // this.colUno();
    //this.colDos();
    //this.colTres();
    this.drawParking();

  }

  initSvg() {
    this.color = d3Scale.scaleOrdinal()
      .range(['#FFA500', '#00FF00', '#FF0000', '#6b486b', '#FF00FF', '#d0743c', '#00FA9A']);

    this.arc = d3Shape.arc()
      .outerRadius(this.radius - 10)
      .innerRadius(0);

    this.labelArc = d3Shape.arc()
      .outerRadius(this.radius - 40)
      .innerRadius(this.radius - 40);

    this.labelPer = d3Shape.arc()
      .outerRadius(this.radius - 80)
      .innerRadius(this.radius - 80);

    this.svg = d3.select('#svghandle')
      .append('svg')
        .attr('width', 1150)
        .attr('height', 650)
        .style('background', '#dff0d8')
    
    this.g = this.svg.append('g');
 
  }

  drawParking() {
    const g = this.g.selectAll('svg')
      .data(StatsEspacios)
      .enter()
      .append('rect')
        .attr("id", (d: { id: any; }) => d.id)
        .attr('x',(d: { x: any; }) => d.x)
        .attr('y',(d: { y: any; }) => d.y)
        .attr('fill',(d: { color: any; }) => d.color)
        .attr('width', 100)
        .attr('height', 150)
        .attr('stroke', 'white')
     // g.append('text').attr('transform', (d: any) => 'translate(' + this.labelArc.centroid(d) + ')')
      //  .attr('dy', '.35em')
       // .text((d: any) => d.estado);
    
  }
  /*
  colUno(){
    //col1 CUADRO 1
    this.svg = d3.select('svg')
      .append('rect')
        .attr('x', 50)
        .attr('y', this.ycolUno)
        .attr('width', 100)
        .attr('height', 150)
        .attr('fill', '#fcf8e3')
        .attr('stroke', '#8a6d3b')
        //.attr('stroke-width', '15px')
    //col1 CUADRO 2
    this.svg = d3.select('svg')
      .append('rect')
        .attr('x', 150)
        .attr('y', this.ycolUno)
        .attr('width', 100)
        .attr('height', 150)
        .attr('fill', '#fcf8e3')
        .attr('stroke', '#8a6d3b')
        //.attr('stroke-width', '15px')
    //col1 CUADRO 3
    this.svg = d3.select('svg')
    .append('rect')
      .attr('x', 250)
      .attr('y', this.ycolUno)
      .attr('width', 100)
      .attr('height', 150)
      .attr('fill', '#fcf8e3')
      .attr('stroke', '#8a6d3b')
      //.attr('stroke-width', '15px')
    //col1 CUADRO 4
    this.svg = d3.select('svg')
      .append('rect')
        .attr('x', 350)
        .attr('y', this.ycolUno)
        .attr('width', 100)
        .attr('height', 150)
        .attr('fill', '#fcf8e3')
        .attr('stroke', '#8a6d3b')
        //.attr('stroke-width', '15px')
    //col1 CUADRO 5
        this.svg = d3.select('svg')
        .append('rect')
          .attr('x', 450)
          .attr('y', this.ycolUno)
          .attr('width', 100)
          .attr('height', 150)
          .attr('fill', '#fcf8e3')
          .attr('stroke', '#8a6d3b')
          //.attr('stroke-width', '15px')
        //col1 CUADRO 6
        this.svg = d3.select('svg')
        .append('rect')
          .attr('x', 600)
          .attr('y', this.ycolUno)
          .attr('width', 100)
          .attr('height', 150)
          .attr('fill', '#fcf8e3')
          .attr('stroke', '#8a6d3b')
          //.attr('stroke-width', '15px')
          //col1 CUADRO 7
        this.svg = d3.select('svg')
        .append('rect')
          .attr('x', 700)
          .attr('y', this.ycolUno)
          .attr('width', 100)
          .attr('height', 150)
          .attr('fill', '#fcf8e3')
          .attr('stroke', '#8a6d3b')
          //.attr('stroke-width', '15px')
          //col1 CUADRO 8
        this.svg = d3.select('svg')
        .append('rect')
          .attr('x', 800)
          .attr('y', this.ycolUno)
          .attr('width', 100)
          .attr('height', 150)
          .attr('fill', '#fcf8e3')
          .attr('stroke', '#8a6d3b')
          //.attr('stroke-width', '15px')
          //col1 CUADRO 9
        this.svg = d3.select('svg')
        .append('rect')
          .attr('x', 900)
          .attr('y', this.ycolUno)
          .attr('width', 100)
          .attr('height', 150)
          .attr('fill', '#fcf8e3')
          .attr('stroke', '#8a6d3b')
          //.attr('stroke-width', '15px')
          //col1 CUADRO 10
        this.svg = d3.select('svg')
        .append('rect')
          .attr('x', 1000)
          .attr('y', this.ycolUno)
          .attr('width', 100)
          .attr('height', 150)
          .attr('fill', '#fcf8e3')
          .attr('stroke', '#8a6d3b')
          //.attr('stroke-width', '15px')
  }
  colDos() {
        //col1 CUADRO 1
        this.svg = d3.select('svg')
        .append('rect')
          .attr('x', 50)
          .attr('y', this.ycolDos)
          .attr('width', 100)
          .attr('height', 150)
          .attr('fill', '#fcf8e3')
          .attr('stroke', '#8a6d3b')
          //.attr('stroke-width', '15px')
      //col1 CUADRO 2
      this.svg = d3.select('svg')
        .append('rect')
          .attr('x', 150)
          .attr('y', this.ycolDos)
          .attr('width', 100)
          .attr('height', 150)
          .attr('fill', '#fcf8e3')
          .attr('stroke', '#8a6d3b')
          //.attr('stroke-width', '15px')
      //col1 CUADRO 3
      this.svg = d3.select('svg')
      .append('rect')
        .attr('x', 250)
        .attr('y', this.ycolDos)
        .attr('width', 100)
        .attr('height', 150)
        .attr('fill', '#fcf8e3')
        .attr('stroke', '#8a6d3b')
        //.attr('stroke-width', '15px')
      //col1 CUADRO 4
      this.svg = d3.select('svg')
        .append('rect')
          .attr('x', 350)
          .attr('y', this.ycolDos)
          .attr('width', 100)
          .attr('height', 150)
          .attr('fill', '#fcf8e3')
          .attr('stroke', '#8a6d3b')
          //.attr('stroke-width', '15px')
      //col1 CUADRO 5
          this.svg = d3.select('svg')
          .append('rect')
            .attr('x', 450)
            .attr('y', this.ycolDos)
            .attr('width', 100)
            .attr('height', 150)
            .attr('fill', '#fcf8e3')
            .attr('stroke', '#8a6d3b')
            //.attr('stroke-width', '15px')
          //col1 CUADRO 6
          this.svg = d3.select('svg')
          .append('rect')
            .attr('x', 600)
            .attr('y', this.ycolDos)
            .attr('width', 100)
            .attr('height', 150)
            .attr('fill', '#fcf8e3')
            .attr('stroke', '#8a6d3b')
            //.attr('stroke-width', '15px')
            //col1 CUADRO 7
          this.svg = d3.select('svg')
          .append('rect')
            .attr('x', 700)
            .attr('y', this.ycolDos)
            .attr('width', 100)
            .attr('height', 150)
            .attr('fill', '#fcf8e3')
            .attr('stroke', '#8a6d3b')
            //.attr('stroke-width', '15px')
            //col1 CUADRO 8
          this.svg = d3.select('svg')
          .append('rect')
            .attr('x', 800)
            .attr('y', this.ycolDos)
            .attr('width', 100)
            .attr('height', 150)
            .attr('fill', '#fcf8e3')
            .attr('stroke', '#8a6d3b')
            //.attr('stroke-width', '15px')
            //col1 CUADRO 9
          this.svg = d3.select('svg')
          .append('rect')
            .attr('x', 900)
            .attr('y', this.ycolDos)
            .attr('width', 100)
            .attr('height', 150)
            .attr('fill', '#fcf8e3')
            .attr('stroke', '#8a6d3b')
            //.attr('stroke-width', '15px')
            //col1 CUADRO 10
          this.svg = d3.select('svg')
          .append('rect')
            .attr('x', 1000)
            .attr('y', this.ycolDos)
            .attr('width', 100)
            .attr('height', 150)
            .attr('fill', '#fcf8e3')
            .attr('stroke', '#8a6d3b')
            //.attr('stroke-width', '15px')

  }
  colTres() {
    //col1 CUADRO 1
    this.svg = d3.select('svg')
    .append('rect')
      .attr('x', 50)
      .attr('y', this.ycolTres)
      .attr('width', 100)
      .attr('height', 150)
      .attr('fill', '#fcf8e3')
      .attr('stroke', '#8a6d3b')
      //.attr('stroke-width', '15px')
  //col1 CUADRO 2
  this.svg = d3.select('svg')
    .append('rect')
      .attr('x', 150)
      .attr('y', this.ycolTres)
      .attr('width', 100)
      .attr('height', 150)
      .attr('fill', '#fcf8e3')
      .attr('stroke', '#8a6d3b')
      //.attr('stroke-width', '15px')
  //col1 CUADRO 3
  this.svg = d3.select('svg')
  .append('rect')
    .attr('x', 250)
    .attr('y', this.ycolTres)
    .attr('width', 100)
    .attr('height', 150)
    .attr('fill', '#fcf8e3')
    .attr('stroke', '#8a6d3b')
    //.attr('stroke-width', '15px')
  //col1 CUADRO 4
  this.svg = d3.select('svg')
    .append('rect')
      .attr('x', 350)
      .attr('y', this.ycolTres)
      .attr('width', 100)
      .attr('height', 150)
      .attr('fill', '#fcf8e3')
      .attr('stroke', '#8a6d3b')
      //.attr('stroke-width', '15px')
  //col1 CUADRO 5
      this.svg = d3.select('svg')
      .append('rect')
        .attr('x', 450)
        .attr('y', this.ycolTres)
        .attr('width', 100)
        .attr('height', 150)
        .attr('fill', '#fcf8e3')
        .attr('stroke', '#8a6d3b')
        //.attr('stroke-width', '15px')
      //col1 CUADRO 6
      this.svg = d3.select('svg')
      .append('rect')
        .attr('x', 600)
        .attr('y', this.ycolTres)
        .attr('width', 100)
        .attr('height', 150)
        .attr('fill', '#fcf8e3')
        .attr('stroke', '#8a6d3b')
        //.attr('stroke-width', '15px')
        //col1 CUADRO 7
      this.svg = d3.select('svg')
      .append('rect')
        .attr('x', 700)
        .attr('y', this.ycolTres)
        .attr('width', 100)
        .attr('height', 150)
        .attr('fill', '#fcf8e3')
        .attr('stroke', '#8a6d3b')
        //.attr('stroke-width', '15px')
        //col1 CUADRO 8
      this.svg = d3.select('svg')
      .append('rect')
        .attr('x', 800)
        .attr('y', this.ycolTres)
        .attr('width', 100)
        .attr('height', 150)
        .attr('fill', '#fcf8e3')
        .attr('stroke', '#8a6d3b')
        //.attr('stroke-width', '15px')
        //col1 CUADRO 9
      this.svg = d3.select('svg')
      .append('rect')
        .attr('x', 900)
        .attr('y', this.ycolTres)
        .attr('width', 100)
        .attr('height', 150)
        .attr('fill', '#fcf8e3')
        .attr('stroke', '#8a6d3b')
        //.attr('stroke-width', '15px')
        //col1 CUADRO 10
      this.svg = d3.select('svg')
      .append('rect')
        .attr('x', 1000)
        .attr('y', this.ycolTres)
        .attr('width', 100)
        .attr('height', 150)
        .attr('fill', '#fcf8e3')
        .attr('stroke', '#8a6d3b')
        //.attr('stroke-width', '15px')

}*/
}

