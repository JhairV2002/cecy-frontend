import { Component } from '@angular/core';
import { CursosService } from '@services/cecy/cursos';
import { tap } from 'rxjs';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css'],
})
export class EstudiantesComponent {
  constructor(private cursosService: CursosService) { }

  carreras$ = this.cursosService.getCarreras();

  cursos$ = this.cursosService
    .getCursosByCarrera('all')
    .pipe(tap((_) => console.log('Data Fetched')));
}
