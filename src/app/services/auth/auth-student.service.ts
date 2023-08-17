import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, finalize, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from '@env/environment';
import { TokenService } from '@services/auth';
import { EstudianteRegisterResponse } from '@models/cecy/estudianteRegister';
import { Estudiantes } from '@models/cecy';

@Injectable({
  providedIn: 'root',
})
export class AuthStudentService {
  private apiUrl = `${environment.api2}/auth`;
  private javaUrl = `${environment.api}/estudiantes`;
  loading = new BehaviorSubject<boolean>(true);
  loading$: Observable<boolean> = this.loading.asObservable();
  student$ = new BehaviorSubject<Estudiantes | null>(null);
  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private router: Router
  ) {}

  login(body: any) {
    this.loading.next(true);
    return this.http
      .post<EstudianteRegisterResponse>(`${this.apiUrl}/student/login`, body)
      .pipe(
        tap((response) => {
          console.log('service', response);
          this.tokenService.saveEstudianteTokenCedula(response);
        })
      )
      .pipe(
        finalize(() => {
          this.loading.next(false);
        })
      );
  }

  register(register: any) {
    return this.http.post(`${this.apiUrl}/api/v1/auth/register`, {
      register,
    });
  }

  loginWithGoogle(userData: any) {
    return this.http.post<any>(`${this.apiUrl}/student/login/google`, userData);
  }

  registerWithGoogle(userData: any) {
    return this.http.post<any>(`${this.apiUrl}/google/register`, userData);
  }

  // registerAndLogin(name: string, email: string, password: string) {
  //   return this.register(name, email, password)
  //   .pipe(
  //     switchMap(() => this.login(email, password))
  //   )
  // }

  isAvailable(email: string) {
    return this.http.post<{ isAvailable: boolean }>(
      `${this.apiUrl}/api/v1/auth/is-available`,
      { email }
    );
  }

  //         .subscribe((res) => {
  //           console.log('SERVICE RES', res);
  //           this.tokenService.saveEstudianteTokenCedula(res);
  //           this.obtenerEstudiantePorCedula(res.student.cedula);
  //           console.log(res);
  //         });

  // profile(){
  //   return this.http.get(`${this}`)
  // }

  // loginAndGetProfileEstudent(login: any) {
  //   return this.login(login).pipe(switchMap(() => this.))

  // }

  logout() {
    this.tokenService.removeEstudianteAuth();
    this.student$.next(null);
  }

  getProfileStudent() {
    this.loading.next(true);
    const token = this.tokenService.getEstudianteToken();
    return this.http
      .get<Estudiantes>(`${this.apiUrl}/profile-student`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .pipe(
        switchMap((user: any) => {
          return this.http
            .get(`${this.javaUrl}/findByCedula/${user[0].cedula}/`)
            .pipe(
              tap((detailUser: any) => {
                console.log('profile servicee', detailUser);
                this.student$.next(detailUser);
              })
            );
        }),
        finalize(() => {
          this.loading.next(false);
        })
      );
  }
}
