import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Estudiantes } from '@models/cecy';
import { EstudianteRegisterResponse } from '@models/cecy/estudianteRegister';
import { TokenService } from '@services/auth';
import { BehaviorSubject, Observable, finalize, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EstudiantesService {
  loading = new BehaviorSubject<boolean>(true);
  loading$: Observable<boolean> = this.loading.asObservable();

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,

  ) { }

  url: string = 'http://localhost:8080/api/estudiantes/';
  authenticateUrl: string = 'http://localhost:3000/api/v1/auth/student/login';

  private estudianteActualSubject = new BehaviorSubject<Estudiantes | null>(
    null,
  );
  public readonly estudianteActual: Observable<Estudiantes | null> =
    this.estudianteActualSubject.asObservable();

  obtenerEstudiantes(): Observable<Estudiantes[]> {
    return this.http.get<Estudiantes[]>(this.url);
  }

  obtenerEstudiantePorId(id: number): Observable<Estudiantes> {
    return this.http.get<Estudiantes>(`${this.url}${id}/`);
  }

  obtenerEstudiantePorCedula(cedula: string) {
    return this.http
      .get<Estudiantes>(`${this.url}findByCedula/${cedula}/`)
      .subscribe((res) => {
        console.log(res);
        this.estudianteActualSubject.next(res);
      });
  }

  updateEstudiante(body: any): Observable<Estudiantes> {
    console.log('BODY SERVICE', body);
    return this.http.put<Estudiantes>(`${this.url}${body.id}/`, body);
  }


}
