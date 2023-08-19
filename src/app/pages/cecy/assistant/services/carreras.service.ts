import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Career, Carrera, PlanificationCursos } from '@models/cecy';
import { BehaviorSubject, Observable, finalize } from 'rxjs';
import { environment } from '@env/environment';
import { CourseApiNode } from '@models/cecy/cursos-model';
import { TokenService } from '@services/auth';

@Injectable({
  providedIn: 'root',
})
export class CarrerasService {
  url: string = 'http://localhost:8083/api/carreras/findByName';
  urlApiNode: string = 'http://localhost:3000/api/v1/careers';
  urlApiNodeCursos: string = `${environment.api2}/courses/state-course/aprobado`;
  urlNodejs: string = `${environment.api2}/courses`
  loading = new BehaviorSubject<boolean>(true);
  loading$: Observable<boolean> = this.loading.asObservable();

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getCursosByCarrera(nombreCarrera: string): Observable<Carrera[]> {
    this.loading.next(true);
    return this.http
      .get<Carrera[]>(`${this.url}/carreras/findByName/${nombreCarrera}/`)
      .pipe(
        finalize(() => {
          this.loading.next(false);
        }),
      );
  }

  getAllCarreras(): Observable<Career[]> {
    this.loading.next(true);
    return this.http.get<Career[]>(this.urlApiNode).pipe(
      finalize(() => {
        this.loading.next(false);
      }),
    );
  }

  getCursosByCarreraId(id: number): Observable<Career[]> {
    this.loading.next(true);
    return this.http.get<Career[]>(this.urlApiNodeCursos).pipe(
      finalize(() => {
        this.loading.next(false);
      }),
    );
  }

  getAllCoursesApproved() {
    this.loading.next(true);
    return this.http.get<Career[]>(this.urlApiNodeCursos).pipe(
      finalize(() => {
        this.loading.next(false);
      }),
    );
  }

  getAllCursosByAssistant(): Observable<CourseApiNode[]> {
    this.loading.next(true);
    const token = this.tokenService.getToken();
    return this.http.get<CourseApiNode[]>(`${this.urlNodejs}/assistant/all-courses`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).pipe(
      finalize(() => {
        this.loading.next(false);
      }),
    );
  }
}
