import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Estudiantes } from '@models/cecy';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EstudiantesService {
  constructor(private http: HttpClient) { }

  url: string = 'http://localhost:8080/api/estudiantes/';

  obtenerEstudiantes(): Observable<Estudiantes[]> {
    return this.http.get<Estudiantes[]>(this.url);
  }
}
