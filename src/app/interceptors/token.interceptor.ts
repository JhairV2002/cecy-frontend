import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { TokenService } from './../services/auth';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    /* let flag = false;
    let headers = request.headers ? request.headers : new HttpHeaders();
    let params = request.params ? request.params : new HttpParams();
    if (!params.get('page')) {
      params = params.append('page', '1');
    }
    if (!params.get('per_page')) {
      params = params.append('per_page', '15');
    }

    request.headers.getAll('Content-Type')?.forEach(header => {
      if (header == 'multipart/form-data') {
        flag = true;
      }
    });
    headers = headers.append('Accept', 'application/json');

    if (this.authService.token) {
      headers = headers.append('Authorization', 'Bearer ' + this.authService.token);
    }
    if (flag) {
      headers = headers.delete('Content-Type', 'multipart/form-data');
    } else {
      headers = headers.append('Content-Type', 'application/json');
    } */

    request = this.addToken(request);
    return next.handle(request);
  }

  private addToken(request: HttpRequest<unknown>) {
    let token: string | undefined = '';
    const tokenUser = this.tokenService.getToken();
    const tokenStudent = this.tokenService.getEstudianteToken();

    if (tokenUser) {
      const decode = jwt_decode(tokenUser) as { [key: string]: any };
      if (decode['role']) {
        console.log('se ejecuto 1 token user');
        token = this.tokenService.getToken();
      }
    } else if (tokenStudent) {
      console.log('se ejecuto 2 token student');
      token = this.tokenService.getEstudianteToken();
    }

    if (token) {
      const authReq = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`),
      });
      return authReq;
    }

    return request;
    // const token = this.tokenService.getToken();
    // if (token) {
    //   const authReq = request.clone({
    //     headers: request.headers.set('Authorization', `Bearer ${token}`),
    //   });
    //   return authReq;
    // }
    // return request;
  }
}
