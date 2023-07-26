import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { AsistenciaService } from '../asistencia.service';

@Component({
  selector: 'app-fecha',
  templateUrl: './fecha.component.html',
})
export class FechaComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private asistenciaService: AsistenciaService
  ) {}

  fechas?: [] = [];

  ngOnInit(): void {}

  filtroFecha: string = '';

  fecha() {
    this.router.navigate(['/cecy/responsible-execute/fecha/']);
  }

  nota() {
    this.router.navigate(['cecy/responsible-execute/notas/estudiante']);
  }

  registrofotografico() {
    this.router.navigate(['/cecy/responsible-execute/registro-fotografico/']);
  }
  guardarfecha(fecha: any) {}

  redireccionar(asistenciaId: number) {
    this.router.navigate([
      `cecy/responsible-execute/asistencia/${asistenciaId}`,
    ]);
  }

  redireccionCrear() {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.router.navigate([
        `cecy/responsible-execute/course/${param.get(
          'courseId'
        )}/attendance/create`,
      ]);
    });
  }

  regresar() {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.router.navigate([
        `cecy/responsible-execute/course/${param.get(
          'courseId'
        )}/notes/students/`,
      ]);
    });
  }
}
