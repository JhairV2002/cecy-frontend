import { Component } from '@angular/core';
import { EstudiantesService } from '@layout/estudiantes/estudiantes.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-mis-cursos',
  templateUrl: './mis-cursos.component.html',
  styleUrls: ['./mis-cursos.component.css'],
})
export class MisCursosComponent {
  constructor(private estudiantesService: EstudiantesService) { }

  matriculas = this.estudiantesService.estudianteActual.pipe(
    map((res) => res?.matriculas)
  );
}
