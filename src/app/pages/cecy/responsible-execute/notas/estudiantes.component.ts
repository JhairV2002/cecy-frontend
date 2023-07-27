import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { EstudianteService } from './estudiante.service';
import { Matriculas } from './estudiante.model';
import * as XLSX from 'xlsx';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.scss'],
})
export class EstudiantesComponent implements OnInit {
  nombreFiltrado: string = '';
  estudiantes: Matriculas[] = [];
  loading$ = this.estudianteService.loading$;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private estudianteService: EstudianteService,
    public messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param) => {
      console.log(param);
      this.estudianteService
        .obtenerMatriculasPorCursoId(parseInt(param.get('courseId')!))
        .subscribe((res) => {
          console.log('ESTUDIANTES', res);
          this.estudiantes = res;
        });
    });
  }
  estudiantes$ = this.activatedRoute.paramMap.pipe(
    switchMap((param) =>
      this.estudianteService
        .obtenerMatriculasPorCursoId(Number(param.get('courseId')!))
        .pipe(map((res) => res.filter((res) => res.estudiantes != null)))
    )
  );

  redireccionar() {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.router.navigate([
        `cecy/responsible-execute/course/${param.get('courseId')}/date-list`,
      ]);
    });
  }

  regresar() {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.router.navigate([`cecy/responsible-execute/my-courses`]);
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

  guardarNotas(event: any, matricula: Matriculas): void {
    console.log(matricula);

    this.estudianteService.actualizarNotas(matricula, matricula.id).subscribe({
      next: (data: any) => {
        console.log(data);
        this.messageService.add({
          severity: 'success',
          summary: `Actualizado`,
          detail: `Notas estudiante ${data.estudiantes.nombres}`,
        });
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error al guardar',
          detail: `${error.message}`,
        });
      },
    });
  }

  // guardarPorcentaje(matricula: Matriculas): void {
  //   console.log(matricula);
  //
  //   this.estudianteService
  //     .porcentaje(matricula, matricula.id)
  //     .subscribe((res) => {
  //       console.log('Asistencia guardada', res);
  //     });
  // }

  matriculas$ = this.estudianteService
    .obtenerEstudiantes()
    .pipe(map((res) => res.filter((it) => it.estudiantes != null)));

  matricula$ = this.estudianteService.obtenerEstudiantePorId(4);

  validarNumero(event: KeyboardEvent): void {
    const input = event.key;
    const currentValue = (event.target as HTMLInputElement).value.trim();
    const minValue = 1;
    const maxValue = 100;

    if (
      (isNaN(Number(input)) &&
        input !== 'ArrowUp' &&
        input !== 'ArrowDown' &&
        input !== 'Backspace') ||
      (currentValue !== '' &&
        (Number(currentValue) < minValue || Number(currentValue) > maxValue))
    ) {
      event.preventDefault();
      alert(
        'Solo se permiten números del 1 al 100. No se permiten letras, números negativos o campos vacíos.'
      );
    }
  }

  generarExcel(): void {
    const datosExportar = this.estudiantes.map((nota) => {
      return {
        Cedula: nota.estudiantes.cedula,
        Nombres: nota.estudiantes.nombres,
        Apellidos: nota.estudiantes.apellidos,
        Asistencia: nota.porcentajeAsistencia,
        Nota1: nota.nota1,
        Nota2: nota.nota2,
        Promedio: nota.promedio,
        Estado: nota.estadoCurso.descripcion,
      };
    });

    const libro = XLSX.utils.book_new();
    const hoja = XLSX.utils.json_to_sheet(datosExportar);
    XLSX.utils.book_append_sheet(libro, hoja, 'Notas');

    const reporte = 'Reporte Promedio.xlsx';
    XLSX.writeFile(libro, reporte);

    console.log(`El archivo Excel "${reporte}" ha sido generado exitosamente.`);
  }
}
