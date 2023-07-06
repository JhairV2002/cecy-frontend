import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Estudiantes } from '@models/cecy';
import { EstudianteRegisterResponse } from '@models/cecy/estudianteRegister';
import { TokenService } from '@services/auth';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EstudiantesService {
  constructor(private http: HttpClient, private tokenService: TokenService) { }

  url: string = 'http://localhost:8080/api/estudiantes/';
  authenticateUrl: string = 'http://localhost:3000/api/v1/auth/student/login';

  private estudianteActualSubject = new BehaviorSubject<Estudiantes | null>(
    null
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
        this.estudianteActualSubject.next(res);
      });
  }

  authenticateEstudiante(body: any) {
    return this.http
      .post<EstudianteRegisterResponse>(this.authenticateUrl, body)
      .subscribe((res) => {
        this.tokenService.saveEstudianteTokenCedula(res);
        this.obtenerEstudiantePorCedula(res.student.cedula);
        console.log(res);
      });
  }

  cerrarSesion() {
    this.tokenService.removeEstudianteAuth();
    this.estudianteActualSubject.next(null);
  }
}
