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
  }
}
