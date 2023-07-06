import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Matriculas } from './estudiante.model';
import { environment } from '@env/environment';
import * as fs from 'fs';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root',
})
export class EstudianteService {
  private apiUrl = `${environment.api}/matriculas/`;
  constructor(private http: HttpClient) {}

  obtenerEstudiantes(): Observable<Matriculas[]> {
    return this.http.get<Matriculas[]>(`${this.apiUrl}`);
  }

  guardarEstudiante(estudiante: any): Observable<any> {
    return this.http.put<Matriculas>(
      `${this.apiUrl}/${estudiante.id}`,
      estudiante
    );
  }

  obtenerEstudiantePorId(id: number): Observable<Matriculas> {
    return this.http.get<Matriculas>(`${this.apiUrl}${id}/`);
  }

  obtenerMatriculasPorCursoId(id: number): Observable<Matriculas[]> {
    return this.http.get<Matriculas[]>(`${this.apiUrl}cursoId/${id}/`);
  }

  actualizarNotas(matricula: Matriculas, id: number): Observable<Matriculas> {
    let promedio = (matricula.nota1 + matricula.nota2) / 2;

    if (promedio >= 70) {
      matricula.estadoCurso = { descripcion: 'aprobado' };
      matricula.promedio = promedio;
      return this.http.put<Matriculas>(`${this.apiUrl}${id}/`, matricula);
    } else {
      matricula.estadoCurso = { descripcion: 'reprobado' };
      matricula.promedio = promedio;
      return this.http.put<Matriculas>(`${this.apiUrl}${id}/`, matricula);
    }
  }

  // generarExcel(notas: Matriculas[]): void {
  //   const datosExportar = notas.map((nota) => {
  //     const estado = nota.promedio >= 70 ? 'Aprobado' : 'Reprobado';

  //     return {
  //       Nota1: nota.nota1,
  //       Nota2: nota.nota2,
  //       Promedio: nota.promedio,
  //       Estado: estado,
  //     };
  //   });

  //   const libro = XLSX.utils.book_new();
  //   const hoja = XLSX.utils.json_to_sheet(datosExportar);
  //   XLSX.utils.book_append_sheet(libro, hoja, 'Notas');

  //   const nombreArchivo = 'notas.xlsx';
  //   XLSX.writeFile(libro, nombreArchivo);

  //   console.log(
  //     `El archivo Excel "${nombreArchivo}" ha sido generado exitosamente.`
  //   );
  // }

  // notas: Matriculas[] = [
  //   { nota1: 80, nota2: 75, promedio: 77.5 },
  //   { nota1: 70, nota2: 65, promedio: 67.5 }
  //   // Agrega más objetos de notas según sea necesario
  // ];

  // generarExcel(notas: Matriculas[]): void {
  //   const datosExportar = notas.map(nota => {
  //     const estado = nota.promedio >= 70 ? 'Aprobado' : 'Reprobado';

  //     return {
  //       Nota1: nota.nota1,
  //       Nota2: nota.nota2,
  //       Promedio: nota.promedio,
  //       Estado: estado,
  //     };
  //   });

  //   const libro = XLSX.utils.book_new();
  //   const hoja = XLSX.utils.json_to_sheet(datosExportar);
  //   XLSX.utils.book_append_sheet(libro, hoja, 'Notas');

  //   const nombreArchivo = 'notas.xlsx';
  //   XLSX.writeFile(libro, nombreArchivo);

  //   console.log(`El archivo Excel "${nombreArchivo}" ha sido generado exitosamente.`);
  // }

  // llamarGenerarExcel(): void {
  //   const notas: Matriculas[] = [
  //     { nota1: 80, nota2: 75, promedio: 77.5, ... }

  //   ];
  //   this.generarExcel(notas);
  // }
}

