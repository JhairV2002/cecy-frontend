import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Asistencia } from './asistencia.model';
import { Observable } from 'rxjs';
import { Matriculas } from '../notas/estudiante.model';

@Injectable({
  providedIn: 'root',
})
export class AsistenciaService {
  private baseUrl = 'http://localhost:8080/api/asistencias/';
  private matriculasUrl = 'http://localhost:8080/api/matriculas/';
  constructor(private http: HttpClient) { }

  obtenerEstudiantes(): Observable<Asistencia[]> {
    return this.http.get<Asistencia[]>(this.baseUrl);
  }

  obtenerMatriculasPorId(id: number): Observable<Matriculas[]> {
    return this.http.get<Matriculas[]>(`${this.matriculasUrl}cursoId/${id}/`);
  }

  guardarEstudiante(estudiante: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${estudiante.id}`, estudiante);
  }

  obtenerEstudiantePorId(id: number): Observable<Asistencia> {
    return this.http.get<Asistencia>(`${this.baseUrl}${id}/`);
  }
}
