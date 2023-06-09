import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-fecha',
  templateUrl: './fecha.component.html',
})
export class FechaComponent {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
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

  nota(){
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

  redireccionar() {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.router.navigate([
        `cecy/responsible-execute/asistencia/${param.get('cursoId')}`,
      ]);
    });
  }
}
