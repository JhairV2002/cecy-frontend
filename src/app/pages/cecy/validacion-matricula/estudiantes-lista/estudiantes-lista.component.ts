import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursosService } from '../services/cursos.service';
import { map, switchMap } from 'rxjs';
import { EstudiantesServiceService } from '../services/estudiantes-service.service';

@Component({
  selector: 'app-estudiantes-lista',
  templateUrl: './estudiantes-lista.component.html',
  styleUrls: ['./estudiantes-lista.component.css'],
})
export class EstudiantesListaComponent {
  constructor(
    private router: ActivatedRoute,
    private cursoService: CursosService
  ) { }

  data = this.router.snapshot.params['nombreCurso'];

  estudiantes$ = this.router.paramMap.pipe(
    switchMap((param) =>
      this.cursoService
        .getCursoByName(param.get('nombreCurso')!)
        .pipe(map((res) => res[0].estudiantes))
    )
  );
}
