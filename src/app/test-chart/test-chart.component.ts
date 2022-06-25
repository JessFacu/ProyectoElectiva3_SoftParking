import { Component, OnInit } from '@angular/core';
import { StatsEspacios } from '../../data/data';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

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
  g: any;
  arc: any;
  labelArc: any;
  labelPer: any;
  pie: any;
  color: any;
  svg: any;
  x: any;
  y: any;
  dato: any;
  ycolUno = 50;
  ycolDos = 250;
  ycolTres = 450;
  secciones: any;
  
  ngOnInit() {
    this.initSvg();
    this.drawParking();
    this.condiciones();

  }

  initSvg() {
    this.color = d3Scale.scaleOrdinal()
      .range(['#FFA500', '#00FF00', '#FF0000', '#6b486b', '#FF00FF', '#d0743c', '#00FA9A']);

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
        .attr('id', (d: { id: any; }) => d.id)
        .attr('x',(d: { x: any; }) => d.x)
        .attr('y',(d: { y: any; }) => d.y)
        .attr('fill',(d: { color: any; }) => d.color)
        .attr('width', 100)
        .attr('height', 150)
        .attr('stroke', 'white');
      g.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '.71em')
        .style('text-anchor', 'end')
        .text((d: any) => d.estado)
        //        .text((d: any) => d.estado)
    
  }

  //CONFIGURACION PARA EL MODAL
  closeResult: string | undefined;
  constructor(private modalService: NgbModal) {}
    
  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  public condiciones(){
     
    this.secciones = [];
    for (let i in this.statsEspacios) {
      if (this.secciones.includes(this.statsEspacios[i].columna) === false) {
          this.secciones.push(this.statsEspacios[i].columna);
      }
    }
    console.log("secciones = "+ this.secciones);
     
  }
  
  export class MailtypeComponent {
    model : Mailtype;
    constructor() {
      this.model = new Mailtype('','','',[]);
      this.model.properties.push(new Property());
    }
  
    onAddProperty() {
      this.model.properties.push(new Property());
    }
  }
}

