import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Carrera, Curso } from '../models';

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  constructor(private http: HttpClient) { }

  all: string = 'all';

  urlCarrera: string = 'http://localhost:8083/api/carreras';

  urlCurso: string = 'http://localhost:8083/api/carreras/findByName';

  urlAllCursos: string = 'http://localhost:8083/api/cursos/';

  urlCursoByName: string = 'http://localhost:8083/api/cursos/findByName/';

  getCursosByCarrera(endpoint: string): Observable<Carrera[]> {
    return this.http.get<Carrera[]>(`${this.urlCarrera}/${endpoint}/`);
  }

  getAllCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.urlAllCursos);
  }

  getCursosByNombreCarrera(carreraNombre: string) {
    return this.http
      .get<Carrera[]>(`${this.urlCurso}/${carreraNombre}/`)
      .pipe(map((res) => res[0].cursos));
  }

  getCursoByName(nombre: string) {
    return this.http.get<Curso[]>(`${this.urlCursoByName}${nombre}/`);
  }
}
