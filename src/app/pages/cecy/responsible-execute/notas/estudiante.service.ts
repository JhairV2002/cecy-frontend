import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Matriculas } from './estudiante.model';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class EstudianteService {
  private baseUrl = `${environment.api}/matriculas/`;
  constructor(private http: HttpClient) { }

  obtenerEstudiantes(): Observable<Matriculas[]> {
    return this.http.get<Matriculas[]>(this.baseUrl);
  }

  guardarEstudiante(estudiante: any): Observable<any> {
    return this.http.put<Matriculas>(`${this.baseUrl}/${estudiante.id}`, estudiante);
  }

  obtenerEstudiantePorId(id: number): Observable<Matriculas> {
    return this.http.get<Matriculas>(`${this.baseUrl}${id}/`);
  }

  obtenerMatriculasPorCursoId(id: number): Observable<Matriculas[]> {
    return this.http.get<Matriculas[]>(`${this.baseUrl}cursoId/${id}/`);
  }

  actualizarNotas(matricula: Matriculas, id: number): Observable<Matriculas> {
    let promedio = (matricula.nota1 + matricula.nota2) / 2;

    if (promedio >= 70) {
      matricula.estadoCurso = { descripcion: 'aprobado' };
      matricula.promedio = promedio;

      return this.http.put<any>(`${this.baseUrl}${id}/`, matricula);
    } else {

      matricula.estadoCurso = { descripcion: 'reprobado' };
      matricula.promedio = promedio;
      
      return this.http.put<any>(`${this.baseUrl}${id}/`, matricula);
    }
  }
}