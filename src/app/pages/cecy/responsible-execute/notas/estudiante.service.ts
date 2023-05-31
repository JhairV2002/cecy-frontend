import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estudiante } from './estudiante.model';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  actualizarEstudiante(estudiante: Estudiante) {
    throw new Error('Method not implemented.');
  }
  private baseUrl = 'http://localhost:8080/api/matriculas/';
  constructor(private http: HttpClient) {}

  obtenerEstudiantes(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  guardarEstudiante(estudiante: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${estudiante.id}`, estudiante);
  }

}
