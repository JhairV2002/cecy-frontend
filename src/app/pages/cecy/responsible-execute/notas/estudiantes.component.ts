import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, filter, map, switchMap } from 'rxjs';
import { EstudianteService } from './estudiante.service';
import { Matriculas } from './estudiante.model';
import { NombreFilterPipe } from './filter.pipe';
import * as fs from 'fs';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.scss'],
})
export class EstudiantesComponent implements OnInit {
 
  nombreFiltrado: string = '';
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private estudianteService: EstudianteService
  ) { }

  ngOnInit(): void {
    this.estudianteService
      .obtenerEstudiantes()
      .subscribe((res) => (this.estudiantes = res));
  }

  estudiantes: Matriculas[] = [];

  estudiantes$ = this.activatedRoute.paramMap.pipe(
    switchMap((param) =>
      this.estudianteService
        .obtenerMatriculasPorCursoId(Number(param.get('cursoId')!))
        .pipe(map((res) => res.filter((res) => res.estudiantes != null)))
    )
  );

  redireccionar() {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.router.navigate([
        `cecy/responsible-execute/asistencia/${param.get('cursoId')}`,
      ]);
    });
  }

  regresar() {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.router.navigate([
        `cecy/responsible-execute/mis-cursos`,
      ]);
    });
  }

  filtrarPorNombre(): void {
    this.estudiantes = this.estudiantes.filter(
      (estudiante) =>
        estudiante.estudiantes &&
        estudiante.estudiantes.nombres
          .toLowerCase()
          .includes(this.nombreFiltrado.toLowerCase())
    );
  }

  guardarNotas(matricula: Matriculas): void {
    console.log(matricula);

    this.estudianteService.actualizarNotas(matricula, matricula.id).subscribe(
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


 generarExcel(notas: Matriculas[]): void {
  const datosExportar = notas.map(nota => {
    const estado = nota.promedio >= 70 ? 'Aprobado' : 'Reprobado';

    return {
      Nota1: nota.nota1,
      Nota2: nota.nota2,
      Promedio: nota.promedio,
      Estado: estado,
    };
  });

  const libro = XLSX.utils.book_new();
  const hoja = XLSX.utils.json_to_sheet(datosExportar);
  XLSX.utils.book_append_sheet(libro, hoja, 'Notas');

  const nombreArchivo = 'notas.xlsx';
  XLSX.writeFile(libro, nombreArchivo);

  console.log(`El archivo Excel "${nombreArchivo}" ha sido generado exitosamente.`);
}

}