import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getCookie, setCookie, removeCookie } from 'typescript-cookie';

import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private http: HttpClient, private router: Router) {}

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
}
