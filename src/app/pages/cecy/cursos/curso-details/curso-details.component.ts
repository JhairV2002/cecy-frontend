import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursosService } from '@services/cecy/cursos';
import { map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-curso-details',
  templateUrl: './curso-details.component.html',
  styleUrls: ['./curso-details.component.css'],
})
export class CursoDetailsComponent {
  constructor(
    private route: ActivatedRoute,
    private cursoService: CursosService
  ) { }

  nombreCurso$ = this.route.paramMap.pipe(
    map((param) => param.get('nombreCurso'))
  );

  curso$ = this.route.paramMap.pipe(
    switchMap((param) =>
      this.cursoService.getCursoByName(param.get('nombreCurso')!).pipe(
        map((res) => res[0]),
        tap((res) => console.log(res))
      )
    )
  );

  cursoContenido$ = this.route.paramMap.pipe(
    switchMap((param) =>
      this.cursoService
        .getCursoByName(param.get('nombreCurso')!)
        .pipe(map((res) => res[0].contenidos))
    )
  );

  cursoResumen$ = this.route.paramMap.pipe(
    switchMap((param) =>
      this.cursoService
        .getCursoByName(param.get('nombreCurso')!)
        .pipe(map((res) => res[0].descripcion))
    )
  );
}
