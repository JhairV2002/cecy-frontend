import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Asistencia } from './asistencia.model';
import { Observable } from 'rxjs';
import { Matriculas } from '../notas/estudiante.model';
import { Matricula } from '@models/cecy/estudiantes/carreras';

@Injectable({
  providedIn: 'root',
})
export class AsistenciaService {
  private baseUrl = 'http://localhost:8080/api/asistencia/';
  private matriculasUrl = 'http://localhost:8080/api/matriculas/';
  constructor(private http: HttpClient) {}

  obtenerEstudiantes(): Observable<Asistencia[]> {
    return this.http.get<Asistencia[]>(this.baseUrl);
  }

  obtenerMatriculasPorId(id: number): Observable<Matricula[]> {
    return this.http.get<Matricula[]>(`${this.matriculasUrl}cursoId/${id}/`);
  }

  guardarEstudiante(estudiante: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${estudiante.id}`, estudiante);
  }

  obtenerEstudiantePorId(id: number): Observable<Asistencia> {
    return this.http.get<Asistencia>(`${this.baseUrl}${id}/`);
  }

  guardarAsistencia(asistencia: Asistencia): Observable<Asistencia> {
    return this.http.post<Asistencia>(this.baseUrl, asistencia);
  }

  obtenerFechas(id: number): Observable<Asistencia[]> {
    return this.http.get<Asistencia[]>(`${this.baseUrl}cursoId/${id}/`);
  }

  obtenerAsistenciaPorId(id: number): Observable<Asistencia> {
    return this.http.get<Asistencia>(`${this.baseUrl}${id}/`);
  }

  actualizarAsistencia(
    id: number,
    asistencia: Asistencia
  ): Observable<Asistencia> {
    return this.http.put<Asistencia>(`${this.baseUrl}${id}/`, asistencia);
  }
}
