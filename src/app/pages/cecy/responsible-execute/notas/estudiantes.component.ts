import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, filter, map } from 'rxjs';
import { EstudianteService } from './estudiante.service';
import { Matriculas } from './estudiante.model';
import { NombreFilterPipe } from './filter.pipe';
@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.scss'],
})
export class EstudiantesComponent implements OnInit {
  nombreFiltrado: string = '';
  constructor(
    private router: Router,
    private estudianteService: EstudianteService
  ) { }

  ngOnInit(): void {
    this.estudianteService
      .obtenerEstudiantes()
      .subscribe((res) => (this.estudiantes = res));

  }


  estudiantes: Matriculas[] = [];

  redireccionar() {
    this.router.navigate(['cecy/responsible-execute/asistencia']);
  }

  filtrarPorNombre(): void {
    this.estudiantes = this.estudiantes.filter(estudiante =>
      estudiante.estudiantes && estudiante.estudiantes.nombres.toLowerCase().includes(this.nombreFiltrado.toLowerCase())
    );
  }
    
  guardarNotas(matricula: Matriculas): void {
    this.estudianteService.actualizarNotas(matricula.id, matricula.nota1, matricula.nota2).subscribe(
      (res) => {
        console.log('Notas guardadas', res);
      },
      (error) => {
        console.log('Error al guardar notas', error);
      }
    );
  }



  matriculas$ = this.estudianteService
    .obtenerEstudiantes()
    .pipe(map((res) => res.filter((it) => it.estudiantes != null)));

  matricula$ = this.estudianteService.obtenerEstudiantePorId(4);

}
