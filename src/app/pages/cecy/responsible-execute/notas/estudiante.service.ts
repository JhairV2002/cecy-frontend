import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Matriculas } from './estudiante.model';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  
  private baseUrl = 'http://localhost:8080/api/matriculas/';
  constructor(private http: HttpClient) { }

  obtenerEstudiantes(): Observable<Matriculas[]> {
    return this.http.get<Matriculas[]>(this.baseUrl);
  }

  guardarEstudiante(estudiante: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${estudiante.id}`, estudiante);
  }

  obtenerEstudiantePorId(id: number): Observable<Matriculas> {
    return this.http.get<Matriculas>(`${this.baseUrl}${id}/`)
  }

  actualizarNotas(id: number, nota1: number, nota2: number): Observable<any> {

    const body = { nota1, nota2 };
    return this.http.put<any>(`${this.baseUrl}/estudiantes/${id}`, body);
  }
  


}
