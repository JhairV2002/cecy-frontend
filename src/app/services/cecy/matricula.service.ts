import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Matricula } from '@models/cecy/estudiantes/carreras';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MatriculaService {
  constructor(private http: HttpClient) { }

  url: string = 'http://localhost:8080/api/matriculas/';

  guardarMatricula(matricula: any): Observable<Matricula> {
    return this.http.post<Matricula>(this.url, matricula);
  }
}
