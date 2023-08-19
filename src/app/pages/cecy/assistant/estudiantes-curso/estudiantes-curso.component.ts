import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Matricula } from '@models/cecy/estudiantes/carreras';
import { CursosService } from '@services/cecy/cursos';
import { map, switchMap } from 'rxjs';
import { AuthService } from '@services/auth';

@Component({
  selector: 'app-estudiantes-curso',
  templateUrl: './estudiantes-curso.component.html',
  styleUrls: ['./estudiantes-curso.component.css'],
})
export class EstudiantesCursoComponent {
  constructor(
    private router: ActivatedRoute,
    private cursoService: CursosService,
    private routerActive: Router,
    private authService: AuthService,

  ) { }

  search: string = '';
  estudiantes = [];
  tipoEstudiante!: 'Interno' | 'Externo';
  loading$ = this.cursoService.loading$;

  estudiantes$ = this.router.paramMap.pipe(
    switchMap((param) =>
      this.cursoService
        .getCursoByName(param.get('nombreCurso')!)
        .pipe(map((res) => res[0].estudiantes)),
    ),
  );

  curso$ = this.router.paramMap.pipe(
    switchMap((param) =>
      this.cursoService.getCursoById(parseInt(param.get('idCurso')!)),
    ),
  );

  cursoNombre$ = this.curso$.pipe(map((res) => res.planification.name));

  matriculas$ = this.router.paramMap.pipe(
    switchMap((param) =>
      this.cursoService.getMatriculasByCursoId(parseInt(param.get('idCurso')!)),
    ),
  );

  gotToBack() {
    this.authService.user$.subscribe((user: any) => {
      if (user !== null) {
        if (user[0].role.name === 'coordinator_cecy') {
          this.router.paramMap.subscribe((param) => {
            this.routerActive.navigate(['/cecy/coordinator-cecy/matricula']);
          });
        } else if (user[0].role.name === 'assistant_cecy') {
          this.router.paramMap.subscribe((param) => {
            this.routerActive.navigate(['/cecy/assistant-cecy/matricula']);
          });
        }
      }
    });
  }
}
