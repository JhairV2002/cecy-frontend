import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Curso } from 'src/app/cursos/models';

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  constructor(private http: HttpClient) { }

  url: string = 'http://localhost:8083/api/cursos/';

  getCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.url);
  }

  getCursoByName(nombreCurso: string): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.url}findByName/${nombreCurso}/`)
  }
}
