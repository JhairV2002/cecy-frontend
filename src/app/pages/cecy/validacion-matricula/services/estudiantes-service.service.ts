import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Estudiante } from '@models/cecy';
import { Matricula } from '@models/cecy/estudiantes/carreras';
import { Observable } from 'rxjs';
import { Estudiantes } from '@models/cecy/estudiantes/carreras';

@Injectable({
  providedIn: 'root',
})
export class EstudiantesServiceService {
  constructor(private http: HttpClient) { }

  url: string = 'http://localhost:8083/api/estudiantes';
  urlMatricula: string = 'http://localhost:8080/api/matriculas/';
  urlEstudiatnes: string = 'http://localhost:8080/api/estudiantes/';

  getEstudianteById(id: number): Observable<Estudiante> {
    return this.http.get<Estudiante>(`${this.url}/${id}/`);
  }

  getMatriculaById(id: number): Observable<Matricula> {
    return this.http.get<Matricula>(`${this.urlMatricula}${id}/`);
  }

  updateMatricula(id: number, body: Matricula): Observable<Matricula> {
    return this.http.put<Matricula>(`${this.urlMatricula}${id}/`, body);
  }

  crearEstudiante(body: any): Observable<any> {
    return this.http.post<any>(this.urlEstudiatnes, body);
  }
}
