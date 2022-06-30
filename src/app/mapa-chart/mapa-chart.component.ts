import { Component, OnInit } from '@angular/core';
import { StatsEspacios,TablaCli,TablaMov } from '../../data/data';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import { json } from 'd3';
import { NumberSymbol } from '@angular/common';

@Component({
  selector: 'app-mapa-chart',
  templateUrl: './mapa-chart.component.html',
  styleUrls: ['./mapa-chart.component.css']
})
export class MapaChartComponent implements OnInit {
  /*Para poder acceder al objeto obtenido se debe de especificar dentro de la clase*/
  statsEspacios= StatsEspacios;
  esp_total = this.statsEspacios.length;
  //tabla_movimiento
  array_mov:any  = {seccion: "",
                    posicion: "",
                    id_estacionamiento: 0,
                    id_cliente: 0,
                    fhora_entrada: null,
                    fhora_salida: null,
                    forma_de_pago: "",
                    monto_total: 0,
                    estado_pago: "",
                    id_tipo_cliente: 0,
                    id_tipo_vehiculo: 0,
                    nro_doc: "",
                    chapa: "",
                    tarifa: 0,
                    descuento_aplicado: 0};

  tabla_cliente = TablaCli;
  //definicion de variables
  currentRate = 8;
  title = 'Mapa';
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
  esp_disponible: number = 0;
  esp_ocupado: number = 0 ;

  ngOnInit(): void {
    this.initSvg();
    this.drawParking();
    this.seccionesEstacionamiento();
    this.calcEspacios();

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
    //const g = svg;
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

    
      this.g.selectAll('svg')
        .data(this.statsEspacios)
        .enter()
        .append('text')
        .attr('x',(d: { x: any; }) => d.x + 25)
        .attr('y',(d: { y: any; }) => d.y + 70)
        .text(((d: { id: any;}) => d.id))
        .style("font-size", 45)
        .style("font-family", "arial")
        .style("fill", "black")
        .style("align", "center")


        this.g.selectAll('svg')
        .data(this.statsEspacios)
        .enter()
        .append('text')
        .attr('x',(d: { x: any; }) => d.x + 25)
        .attr('y',(d: { y: any; }) => d.y + 100)
        .text(((d: { estado: any; }) => d.estado))
        .style("font-size", 14)
        .style("font-family", "arial")
        .style("fill", "white")
        .style("align", "center")
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
        //modificar valores
        this.statsEspacios[i].estado = "OCUPADO";
        this.statsEspacios[i].color = "red";
        //volver a dibujar
        this.drawParking();
        //limpiar las variables
        this.seccion = "Elija una sección" ;
        this.posicion = "Elija una posición" ;
      }
    }
  }

  public setValueAsignar(cli:any| undefined){
    console.log("Entre en setValueAsignar = " + cli.nro_doc + "--" + cli.chapa);
    this.calcEspacios();
  }

  public calcEspacios(){
    //
    let sum = 0;
    
    for (let i in this.statsEspacios) {
      if (((this.statsEspacios[i].estado) === "OCUPADO")){
          sum = sum + 1;
      }
    }
    this.esp_ocupado = sum;
    this.esp_disponible = this.esp_total - this.esp_ocupado;
    console.log("Entre en calcEspacios = " + this.esp_ocupado + " - " + this.esp_disponible + " - " + this.esp_total);
  }
}

