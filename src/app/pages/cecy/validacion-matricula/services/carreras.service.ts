import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Carrera } from '@models/cecy';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';


@Injectable({
  providedIn: 'root',
})
export class CarrerasService {
  private url = `${environment.api}`
  constructor(private http: HttpClient) { }

  getCursosByCarrera(nombreCarrera: string): Observable<Carrera[]> {
    return this.http.get<Carrera[]>(`${this.url}/carreras/findByName/${nombreCarrera}/`);
  }

  getAllCarreras(): Observable<Carrera[]> {
    return this.http.get<Carrera[]>(`${this.url}/carreras/all/`);
  }
}
