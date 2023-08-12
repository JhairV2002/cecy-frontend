import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getCookie, setCookie, removeCookie } from 'typescript-cookie';

import { Router } from '@angular/router';
import { EstudianteRegisterResponse } from '@models/cecy/estudianteRegister';
@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private http: HttpClient, private router: Router) { }

  saveToken(token: string) {
    setCookie('token-cecy', token, { expires: 365, path: '/' });
  }

  getToken() {
    const token = getCookie('token-cecy');
    return token;
  }

  removeToken() {
    removeCookie('token-cecy');
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }

  saveEstudianteTokenCedula(estudiante: EstudianteRegisterResponse) {
    setCookie('token-estudiante', estudiante.token, { expires: 1, path: '/' });
    setCookie('cedula-estudiante', estudiante.student.cedula, {
      expires: 1,
      path: '/',
    });
  }

  saveEstudianteTokenGoogle(estudiante: any) {
    console.log('TOKEN DE GOOGLE', estudiante)
    setCookie('token-estudiante', estudiante.token.token, { expires: 1, path: '/' });
    setCookie('cedula-estudiante', estudiante.token.student.cedula, {
      expires: 1,
      path: '/',
    });
  }

  getEstudianteToken() {
    const token = getCookie('token-estudiante');
    return token;
  }

  getEstudianteCedula() {
    const cedula = getCookie('cedula-estudiante');
    return cedula;
  }

  removeEstudianteAuth() {
    removeCookie('token-estudiante');
    removeCookie('cedula-estudiante');
  }
}
