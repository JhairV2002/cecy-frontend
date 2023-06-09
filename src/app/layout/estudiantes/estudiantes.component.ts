import { Component } from '@angular/core';
import { CursosService } from '@services/cecy/cursos';
import { tap } from 'rxjs';
import { EstudiantesService } from './estudiantes.service';
import { Estudiantes } from '@models/cecy';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css'],
})
export class EstudiantesComponent {
  constructor(
    private cursosService: CursosService,
    private estudiantesService: EstudiantesService
  ) { }

  carreras$ = this.cursosService.getCarreras();

  cursos$ = this.cursosService
    .getCursosByCarrera('all')
    .pipe(tap((_) => console.log('Data Fetched')));

  user: { id: number; nombre: string; url: string } | null = null;

  estudiantes$ = this.estudiantesService.obtenerEstudiantes();

  estudianteSeleccionado!: Estudiantes;

  seleccionarEstudiante(estudiante: Estudiantes) {
    this.estudianteSeleccionado = estudiante;
    console.log(this.estudianteSeleccionado);
  }
}
