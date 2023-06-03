import { Component } from '@angular/core';
import { CursosService } from '@services/cecy/cursos';
import { tap } from 'rxjs';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css'],
})
export class CursosComponent {
  constructor(private cursosService: CursosService) { }

  cursos$ = this.cursosService
    .getCursosByCarrera('all')
    .pipe(tap((_) => console.log('Data Fetched')));
}
