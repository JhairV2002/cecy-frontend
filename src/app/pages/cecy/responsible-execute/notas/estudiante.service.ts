import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, finalize } from 'rxjs';
import { Matriculas } from './estudiante.model';
import { environment } from '@env/environment';
// import * as fs from 'fs';
// import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root',
})
export class EstudianteService {
  private baseUrl = `${environment.api}/matriculas/`;
  private loading = new BehaviorSubject<boolean>(true);
  public loading$: Observable<boolean> = this.loading.asObservable();
  constructor(private http: HttpClient) {}

  obtenerEstudiantes(): Observable<Matriculas[]> {
    return this.http.get<Matriculas[]>(this.baseUrl);
  }

  guardarEstudiante(estudiante: any): Observable<any> {
    return this.http.put<Matriculas>(
      `${this.baseUrl}/${estudiante.id}`,
      estudiante
    );
  }

  obtenerEstudiantePorId(id: number): Observable<Matriculas> {
    return this.http.get<Matriculas>(`${this.baseUrl}${id}/`);
  }

  obtenerMatriculasPorCursoId(id: number): Observable<Matriculas[]> {
    this.loading.next(true);
    return this.http.get<Matriculas[]>(`${this.baseUrl}cursoId/${id}/`).pipe(
      finalize(() => {
        this.loading.next(false);
      })
    );
  }

  actualizarNotas(matricula: Matriculas, id: number): Observable<Matriculas> {
    let promedio =
      (matricula.porcentajeAsistencia + matricula.nota1 + matricula.nota2) / 3;
    matricula.promedio = promedio;

    if (promedio >= 70) {
      matricula.estadoCurso = { descripcion: 'aprobado' };
    } else {
      matricula.estadoCurso = { descripcion: 'reprobado' };

      return this.http.put<any>(`${this.baseUrl}${id}/`, matricula);
    }

    return this.http.put<any>(`${this.baseUrl}${id}/`, matricula);
  }
}
