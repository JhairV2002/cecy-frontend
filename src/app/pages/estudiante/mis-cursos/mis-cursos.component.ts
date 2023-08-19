import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstudiantesService } from '@layout/estudiantes/estudiantes.service';
import { AuthStudentService } from '@services/auth';
import { map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-mis-cursos',
  templateUrl: './mis-cursos.component.html',
  styleUrls: ['./mis-cursos.component.css'],
})
export class MisCursosComponent {
  constructor(
    private estudiantesService: EstudiantesService,
    private authStudent: AuthStudentService,
    private route: Router
  ) { }

  matriculas = this.authStudent.student$.pipe(map((res) => res?.matriculas));

  navigateMisCursosDetails(matricula: any) {
    this.route.navigateByUrl('estudiante/mis-cursos/details', {
      state: matricula,
    });
  }
}
