import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '@env/environment';
import { LoginModel, ServerResponse } from '@models/core';
import { LoginResponse } from '@models/core/login.response';
import { AuthService } from './auth.service';
import { Handler } from "../../exceptions/handler";
import { PasswordResetModel } from "@models/authentication";
import { CoreService } from "@services/core/core.service";

@Injectable({
  providedIn: 'root'
})

export class AuthHttpService {
  private API_URL_PRIVATE: string = `${environment.API_URL_PRIVATE}/auth`;
  private API_URL_PUBLIC: string = `${environment.API_URL_PUBLIC}/auth`;


  constructor(private httpClient: HttpClient, private authService: AuthService, private coreService: CoreService) {

  }

  getCourses(){
    //http://localhost:3000/api/v1/courses
    return this.httpClient.get('/api/v1/courses').pipe(
      map(response => response),
      catchError(Handler.render)
    );
  }

  login(credentials: LoginModel): Observable<LoginResponse> {
    const url = `${this.API_URL_PUBLIC}/login`;
    return this.httpClient.post<LoginResponse>(url, credentials)
      .pipe(
        map(response => response),
        tap(
          response => {
            this.coreService.professional = response.data.professional;
            this.authService.token = response.token;
            this.authService.user = response.data.user;
            this.authService.roles = response.data.roles;
            this.authService.permissions = response.data.permissions;
          }
        ),
        catchError(error => {
          this.authService.removeLogin();
          return throwError(error);
        })
      );
  }

  resetPassword(credentials: PasswordResetModel): Observable<LoginResponse> {
    const url = `${this.API_URL_PRIVATE}/reset-password`;
    return this.httpClient.post<LoginResponse>(url, credentials)
      .pipe(
        map(response => response),
        catchError(error => {
          this.authService.removeLogin();
          return throwError(error);
        })
      );
  }

  verifyUser(username: string): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/verify-user/${username}`;
    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => response),
        catchError(error => {
          return throwError(error);
        })
      );
  }

  verifyEmail(email: string): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/verify-email/${email}`;
    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => response),
        catchError(error => {
          return throwError(error);
        })
      );
  }

  verifyPhone(phone: string): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/verify-phone/${phone}`;
    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => response),
        catchError(error => {
          return throwError(error);
        })
      );
  }

  logout(): Observable<LoginResponse> {
    const url = `${this.API_URL_PRIVATE}/logout`;
    return this.httpClient.get<LoginResponse>(url)
      .pipe(
        map(response => response),
        tap(
          response => {
            this.authService.removeLogin();
          }
        ),
        catchError(error => {
          this.authService.removeLogin();
          return throwError(error);
        })
      );
  }

  requestPasswordReset(username: string): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/request-password-reset`;
    return this.httpClient.post<ServerResponse>(url, { username })
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }



}
