import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, filter, map } from 'rxjs';
import { EstudianteService } from './estudiante.service';
import { Matriculas } from './estudiante.model';
@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.scss'],
})
export class EstudiantesComponent implements OnInit {
  constructor(
    private router: Router,
    private estudianteService: EstudianteService
  ) { }

  ngOnInit(): void {
    this.estudianteService
      .obtenerEstudiantes()
      .subscribe((res) => (this.estudiantes = res));
  }

  estudiantes: Matriculas[] = [];

  redireccionar() {
    this.router.navigate(['cecy/responsible-execute/asistencia']);
  }

  matriculas$ = this.estudianteService
    .obtenerEstudiantes()
    .pipe(map((res) => res.filter((it) => it.estudiantes != null)));

  matricula$ = this.estudianteService.obtenerEstudiantePorId(4);
}
