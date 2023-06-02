import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Carrera, Curso } from '@models/cecy/index';
import {
  CarrerasApi,
  Course,
  Matricula,
} from '@models/cecy/estudiantes/carreras';

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

  carrerasUrlCursosApi: string = 'http://localhost:3000/api/v1/careers/';

  cursosUrlCursosApi: string = 'http://localhost:3000/api/v1/courses/';

  urlMatriculas: string = 'http://localhost:8080/api/matriculas/';

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

  getCarreras() {
    return this.http.get<CarrerasApi[]>(this.carrerasUrlCursosApi);
  }

  getCarrerasById(id: number) {
    return this.http.get<CarrerasApi>(`${this.carrerasUrlCursosApi}/${id}`);
  }

  getCursoById(id: number) {
    return this.http.get<Course>(`${this.cursosUrlCursosApi}${id}`);
  }

  getMatriculasByCursoId(id: number) {
    return this.http.get<Matricula[]>(`${this.urlMatriculas}cursoId/${id}/`);
  }
}
