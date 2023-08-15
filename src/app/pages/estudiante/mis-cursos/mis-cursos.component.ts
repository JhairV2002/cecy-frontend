import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstudiantesService } from '@layout/estudiantes/estudiantes.service';
import { map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-mis-cursos',
  templateUrl: './mis-cursos.component.html',
  styleUrls: ['./mis-cursos.component.css'],
})
export class MisCursosComponent {
  constructor(
    private estudiantesService: EstudiantesService,
    private route: Router
  ) {}

  matriculas = this.estudiantesService.estudianteActual.pipe(
    map((res) => res?.matriculas)
  );

  navigateMisCursosDetails(matricula: any) {
    this.route.navigateByUrl('estudiante/mis-cursos/details', {
      state: matricula,
    });
  }
}
