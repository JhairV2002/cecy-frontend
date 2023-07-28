import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Career, Carrera, PlanificationCursos } from '@models/cecy';
import { BehaviorSubject, Observable, finalize } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class CarrerasService {
  url: string = 'http://localhost:8083/api/carreras/findByName';
  urlAllCarreras: string = 'http://localhost:8083/api/carreras/all/';
  urlApiNode: string = 'http://localhost:3000/api/v1/careers';
  loading = new BehaviorSubject<boolean>(true);
  loading$: Observable<boolean> = this.loading.asObservable();

  constructor(private http: HttpClient) {}

  getCursosByCarrera(nombreCarrera: string): Observable<Carrera[]> {
    this.loading.next(true);
    return this.http
      .get<Carrera[]>(`${this.url}/carreras/findByName/${nombreCarrera}/`)
      .pipe(
        finalize(() => {
          this.loading.next(false);
        })
      );
  }

  getAllCarreras(): Observable<Career[]> {
    this.loading.next(true);
    return this.http.get<Career[]>(this.urlApiNode).pipe(
      finalize(() => {
        this.loading.next(false);
      })
    );
  }

  getCursosByCarreraId(id: number): Observable<Career[]> {
    this.loading.next(true);
    return this.http.get<Career[]>(this.urlApiNode).pipe(
      finalize(() => {
        this.loading.next(false);
      })
    );
  }
}
