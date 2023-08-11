import { Component, OnInit } from '@angular/core';
import { CursosService } from '@services/cecy/cursos';
import { Observable, tap } from 'rxjs';
import { EstudiantesService } from './estudiantes.service';
import { Estudiantes } from '@models/cecy';
import { AuthStudentService, TokenService } from '@services/auth';



@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css'],
})
export class EstudiantesComponent implements OnInit {
  constructor(
    private cursosService: CursosService,
    private estudiantesService: EstudiantesService,
    private tokenService: TokenService,
    private authStudentService: AuthStudentService
  ) { }

  carreras$ = this.cursosService.getCarreras();

  cursos$ = this.cursosService
    .getCursosByCarrera('all')
    .pipe(tap((_) => console.log('Data Fetched')));

  user: { id: number; nombre: string; url: string } | null = null;

  // TODO: Refactorizar
  estudiantes$ = this.estudiantesService.estudianteActual;

  estudianteSeleccionado!: Estudiantes;

  seleccionarEstudiante(estudiante: Estudiantes) {
    this.estudianteSeleccionado = estudiante;
    console.log(this.estudianteSeleccionado);
  }
  //

  estudiante: Observable<Estudiantes | null> | null =
    this.estudiantesService.estudianteActual;

  ngOnInit(): void {
    if (this.tokenService.getEstudianteCedula()) {
      this.estudiantesService.obtenerEstudiantePorCedula(
        this.tokenService.getEstudianteCedula()!
      );
      this.estudiante = this.estudiantesService.estudianteActual;
      return;
    }
  }

  cerrarSesion() {
    this.authStudentService.cerrarSesion();
  }
}
