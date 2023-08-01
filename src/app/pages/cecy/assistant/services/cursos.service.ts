import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Curso } from '@models/cecy';
import { Observable, finalize } from 'rxjs';
import { CarrerasService } from './carreras.service';

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  constructor(
    private http: HttpClient,
    private carrerasService: CarrerasService,
  ) { }

  url: string = 'http://localhost:8083/api/cursos/';

  getCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.url);
  }

  getCursoByName(nombreCurso: string): Observable<Curso[]> {
    this.carrerasService.loading.next(true);
    return this.http.get<Curso[]>(`${this.url}findByName/${nombreCurso}/`).pipe(
      finalize(() => {
        this.carrerasService.loading.next(false);
      }),
    );
  }
}
