import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Asistencia } from './asistencia.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {
  private baseUrl = 'http://localhost:8080/api/asistencias/';
  constructor(private http: HttpClient) { }

  obtenerEstudiantes(): Observable<Asistencia[]> {
    return this.http.get<Asistencia[]>(this.baseUrl);
  }

  guardarEstudiante(estudiante: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${estudiante.id}`, estudiante);
  }

  obtenerEstudiantePorId(id: number): Observable<Asistencia> {
    return this.http.get<Asistencia>(`${this.baseUrl}${id}/`);
  }

}
