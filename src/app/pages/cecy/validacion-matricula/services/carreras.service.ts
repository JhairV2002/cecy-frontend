import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Carrera } from '@models/cecy';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarrerasService {
  url: string = 'http://localhost:8083/api/carreras/findByName';
  urlAllCarreras: string = 'http://localhost:8083/api/carreras/all/';

  constructor(private http: HttpClient) { }

  getCursosByCarrera(nombreCarrera: string): Observable<Carrera[]> {
    return this.http.get<Carrera[]>(`${this.url}/${nombreCarrera}/`);
  }

  getAllCarreras(): Observable<Carrera[]> {
    return this.http.get<Carrera[]>(this.urlAllCarreras);
  }
}
