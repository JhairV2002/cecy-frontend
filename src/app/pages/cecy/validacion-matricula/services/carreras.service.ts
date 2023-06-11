import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Career, Carrera, PlanificationCursos } from '@models/cecy';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarrerasService {
  url: string = 'http://localhost:8083/api/carreras/findByName';
  urlAllCarreras: string = 'http://localhost:8083/api/carreras/all/';
  urlApiNode: string = 'http://localhost:3000/api/v1/careers';

  constructor(private http: HttpClient) {}

  getCursosByCarrera(nombreCarrera: string): Observable<Carrera[]> {
    return this.http.get<Carrera[]>(`${this.url}/${nombreCarrera}/`);
  }

  getAllCarreras(): Observable<Career[]> {
    return this.http.get<Career[]>(this.urlApiNode);
  }

  getCursosByCarreraId(id: number): Observable<Career[]> {
    return this.http.get<Career[]>(this.urlApiNode);
  }
}
