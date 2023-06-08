import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Estudiante } from '@models/cecy';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EstudiantesServiceService {
  constructor(private http: HttpClient) { }

  url: string = 'http://localhost:8083/api/estudiantes';

  getEstudianteById(id: number): Observable<Estudiante> {
    return this.http.get<Estudiante>(`${this.url}/${id}/`);
  }
}
