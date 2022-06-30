export const StatsPieChart: any[] = [
  {party: 'BJP', electionP: 56},
  {party: 'INC', electionP: 18},
  {party: 'AA', electionP: 10},
  {party: 'CPI', electionP: 5},
  {party: 'CPI-M', electionP: 5},
  {party: 'BSP', electionP: 7},
  {party: 'AITS',  electionP: 10}
];

export interface Employee {
  company: string;
  frequency: number;
}

export const StatsBarChart: Employee[] = [
  {company: 'Apple', frequency: 20000},
  {company: 'IBM', frequency: 45000},
  {company: 'HP', frequency: 5000},
  {company: 'Facebook', frequency: 5000},
  {company: 'TCS', frequency: 5000},
  {company: 'Google', frequency: 5000},
  {company: 'Wipro', frequency: 5000},
  {company: 'EMC', frequency: 5000}
];


export interface Espacios {
  id: number;
  color: string;
  estado: string;
  columna: number;
  x: number;
  y: number;
}


export const StatsEspacios: Espacios[] = [
  {id: 1,color: 'green',estado: 'LIBRE',columna: 1, x: 50 , y: 50},
  {id: 2,color: 'green',estado: 'LIBRE',columna: 1, x: 150, y: 50},
  {id: 3,color: 'green',estado: 'LIBRE',columna: 1, x: 250, y: 50},
  {id: 4,color: 'green',estado: 'LIBRE',columna: 1, x: 350, y: 50},
  {id: 5,color: 'green',estado: 'LIBRE',columna: 1, x: 450, y: 50},
  {id: 6,color: 'green',estado: 'LIBRE',columna: 1, x: 600, y: 50},
  {id: 7,color: 'green',estado: 'LIBRE',columna: 1, x: 700, y: 50},
  {id: 8,color: 'green',estado: 'LIBRE',columna: 1, x: 800, y: 50},
  {id: 9,color: 'green',estado: 'LIBRE',columna: 1, x: 900, y: 50},
  {id: 10,color: 'green',estado: 'LIBRE',columna: 1, x: 1000, y: 50},
  {id: 11,color: 'green',estado: 'LIBRE',columna: 2, x: 50, y: 250},
  {id: 12,color: 'green',estado: 'LIBRE',columna: 2, x: 150, y: 250},
  {id: 13,color: 'green',estado: 'LIBRE',columna: 2, x: 250, y: 250},
  {id: 14,color: 'green',estado: 'LIBRE',columna: 2, x: 350, y: 250},
  {id: 15,color: 'green',estado: 'LIBRE',columna: 2, x:450, y: 250},
  {id: 16,color: 'green',estado: 'LIBRE',columna: 2, x:600, y: 250},
  {id: 17,color: 'green',estado: 'LIBRE',columna: 2, x:700, y: 250},
  {id: 18,color: 'green',estado: 'LIBRE',columna: 2, x:800, y: 250},
  {id: 19,color: 'green',estado: 'LIBRE',columna: 2, x:900, y: 250},
  {id: 20,color: 'green',estado: 'LIBRE',columna: 2, x:1000, y: 250},
  {id: 21,color: 'green',estado: 'LIBRE',columna: 3, x:50, y: 450},
  {id: 22,color: 'green',estado: 'LIBRE',columna: 3, x:150, y: 450},
  {id: 23,color: 'green',estado: 'LIBRE',columna: 3, x:250, y: 450},
  {id: 24,color: 'green',estado: 'LIBRE',columna: 3, x:350, y: 450},
  {id: 25,color: 'green',estado: 'LIBRE',columna: 3, x:450, y: 450},
  {id: 26,color: 'green',estado: 'LIBRE',columna: 3, x:600, y: 450},
  {id: 27,color: 'green',estado: 'LIBRE',columna: 3, x:700, y: 450},
  {id: 28,color: 'green',estado: 'LIBRE',columna: 3, x:800, y: 450},
  {id: 29,color: 'red',estado: 'OCUPADO',columna: 3, x:900, y: 450},
  {id: 30,color: 'red',estado: 'OCUPADO',columna: 3,x:1000, y: 450}
];

export interface Cliente {
  id_cliente: number;
  id_empresa: string;
  id_tipo_cliente: number;
  nombre: string;
  apellido: string;
  nro_ci: string;
  telefono: string;
  createdAt: any;
  updatedAt: any;
}

export const TablaCli: Cliente[] = [
  
]

export interface Movimiento {
  seccion: string;
  posicion: string;
	id_estacionamiento: number;
	id_cliente: number;
	fhora_entrada: any;
	fhora_salida: any;
	forma_de_pago: string;
	monto_total: number;
	estado_pago: string;
  id_tipo_cliente: number;
  id_tipo_vehiculo: number;
  nro_doc:string;
  chapa:string;
  tarifa:number;
  descuento_aplicado:number;
}


export const TablaMov: Movimiento[] = [
  {seccion: "",  posicion: "",	id_estacionamiento: 0,id_cliente: 0,	fhora_entrada: null,fhora_salida: null,	forma_de_pago: "",monto_total: 0,	estado_pago: "",id_tipo_cliente: 0,  id_tipo_vehiculo: 0,nro_doc:"",  chapa: "",tarifa: 0,  descuento_aplicado: 0}
]