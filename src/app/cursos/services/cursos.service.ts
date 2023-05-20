import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carrera } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor(private http: HttpClient) { }

  all: string = "all";

  urlCarrera: string = "http://localhost:8083/api/carreras";

  urlCurso: string = "http://localhost:8083/api/carreras/findByName"

  getCursosByCarrera(endpoint: string): Observable<Carrera[]> {
    return this.http.get<Carrera[]>(`${this.urlCarrera}/${endpoint}/`);
  }

  getCursosByNombreCarrera(carreraNombre: string) {
    return this.http.get<Carrera[]>(`${this.urlCurso}/${carreraNombre}/`)

  }
}
