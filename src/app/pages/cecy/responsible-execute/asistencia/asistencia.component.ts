import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.css']
})
export class AsistenciaComponent {
  constructor(
    private router: Router
  ) {
  }

  fechas: any[] = [
    { fecha: '01-02-2023'},
    { fecha: '02-02-2023'},
    { fecha: '03-02-2023'},
    { fecha: '04-02-2023'},
    { fecha: '05-02-2023'},
    { fecha: '08-02-2023'},
  ];

  filtroFecha: string = '';

  fecha(){
    this.router.navigate([
      '/cecy/responsible-execute/fecha/'
    ]);
  }

  registrar(){
    this.router.navigate([
      'cecy/responsible-execute/notas/estudiante'
    ]);
  }

  registrofotografico(){
    this.router.navigate([
      '/cecy/responsible-execute/registro-fotografico/'
    ]);
  }
  guardarfecha(fecha: any) {
  }
}