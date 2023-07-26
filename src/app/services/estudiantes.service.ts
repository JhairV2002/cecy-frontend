import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Estudiantes } from '@models/cecy';
import { EstudianteRegisterResponse } from '@models/cecy/estudianteRegister';
import { Observable, tap } from 'rxjs';
import { AuthEstudianteRequest } from './cecy/auth-estudiante-req';
import { TokenService } from './auth';

@Injectable({
  providedIn: 'root',
})
export class EstudiantesService {
  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
  ) { }

  registerUrl: string = 'http://localhost:8080/api/estudiantes/';
  authenticateUrl: string = 'http://localhost:8080/api/auth/authenticate/';

  public getEstudiantePorCedula(
    cedula: string,
    token: string,
  ): Observable<Estudiantes> {
    return this.http.get<Estudiantes>(this.registerUrl);
  }

  public registrarEstudiante(
    body: any,
  ): Observable<EstudianteRegisterResponse> {
    return this.http
      .post<EstudianteRegisterResponse>(this.registerUrl, body)
      .pipe(
        tap((res) => {
          console.log(res);
        }),
      );
  }

  public authenticateEstudiante(
    body: any,
  ): Observable<EstudianteRegisterResponse> {
    return this.http
      .post<EstudianteRegisterResponse>(this.authenticateUrl, body)
      .pipe(
        tap((res) => {
          this.tokenService.saveEstudianteTokenCedula(res);
          console.log(res);
        }),
      );
  }
}
