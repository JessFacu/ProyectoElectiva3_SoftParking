import { Component, OnInit } from '@angular/core';
import { StatsEspacios } from '../../data/data';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {NgForm} from '@angular/forms';
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
  posiciones: any;
  seccion: String = "Elija una sección" ;
  posicion: String = "Elija una posición" ;

  ngOnInit() {
    this.initSvg();
    this.drawParking();
    this.seccionesEstacionamiento();
    //this.lugaresXseccion(undefined);

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
      .data(this.statsEspacios)
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
// SECCION
  public seccionesEstacionamiento(){
     
    this.secciones = [];
    for (let i in this.statsEspacios) {
      if (this.secciones.includes(this.statsEspacios[i].columna) === false) {
          this.secciones.push(this.statsEspacios[i].columna);
      }
    }
    console.log("secciones = "+ this.secciones);
     
  }

  
  public setValueSeccion(a: any | undefined) { 
    this.seccion = a; 
    console.log(this.seccion); 
    if((this.seccion != "Elija una sección")||(this.seccion != undefined)) {
      const conv_a = Number(this.seccion);
      this.lugaresXseccion(conv_a);
    }
    
  }

//POSICION

  public lugaresXseccion(a: any | undefined) {
    this.posiciones = [];
    for (let i in this.statsEspacios) {
      if (((this.statsEspacios[i].columna) === a)&&((this.statsEspacios[i].estado)=== "LIBRE")) {
          this.posiciones.push(this.statsEspacios[i].id);
      }
    }
    console.log("posiciones = "+ this.posiciones);
  }

  public setValuePosicion(b: any | undefined) { 
    this.posicion = b; 
    console.log(this.posicion); 
  }

//PONER OCUPADO EL ESTACIONAMIENTO EN LA POSICION SELECCIONADA
  public setEstacionamiento(b: any | undefined){
    for (let i in this.statsEspacios) {
      if (((this.statsEspacios[i].id) == b) && (b != undefined)){
        this.statsEspacios[i].estado = "OCUPADO";
        this.statsEspacios[i].color = "red";
        this.drawParking();
        this.seccion = "Elija una sección" ;
        this.posicion = "Elija una posición" ;
      }
    }
    
  }
}

