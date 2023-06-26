import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Matriculas } from './estudiante.model';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class EstudianteService {
  private apiUrl = `${environment.api4}/matriculas/`;
  constructor(private http: HttpClient) { }

  obtenerEstudiantes(): Observable<Matriculas[]> {
    return this.http.get<Matriculas[]>(`${this.apiUrl}`);
  }

  guardarEstudiante(estudiante: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${estudiante.id}`, estudiante);
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
      matricula.estadoCurso = { descripcion: 'Aprobado' };
      matricula.promedio = promedio;
      return this.http.put<any>(`${this.apiUrl}${id}/`, matricula);
    } else {
      matricula.estadoCurso = { descripcion: 'Reprobado' };
      matricula.promedio = promedio;
      return this.http.put<any>(`${this.apiUrl}${id}/`, matricula);
    }
  }
}
