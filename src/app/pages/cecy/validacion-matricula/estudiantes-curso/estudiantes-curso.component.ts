import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursosService } from '@services/cecy/cursos';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-estudiantes-curso',
  templateUrl: './estudiantes-curso.component.html',
  styleUrls: ['./estudiantes-curso.component.css'],
})
export class EstudiantesCursoComponent {
  constructor(
    private router: ActivatedRoute,
    private cursoService: CursosService
  ) { }

  estudiantes = [];

  estudiantes$ = this.router.paramMap.pipe(
    switchMap((param) =>
      this.cursoService
        .getCursoByName(param.get('nombreCurso')!)
        .pipe(map((res) => res[0].estudiantes))
    )
  );

  curso$ = this.router.paramMap.pipe(
    switchMap((param) =>
      this.cursoService.getCursoById(parseInt(param.get('idCurso')!))
    )
  );

  cursoNombre$ = this.curso$.pipe(map((res) => res.planification.name));

  matriculas$ = this.router.paramMap.pipe(
    switchMap((param) =>
      this.cursoService.getMatriculasByCursoId(parseInt(param.get('idCurso')!))
    )
  );
}
