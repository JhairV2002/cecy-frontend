import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import jwt_decode from 'jwt-decode';

import { Auth } from './../../models/authentication/'
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private http: HttpClient, private router: Router) {}

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    const token = localStorage.getItem('token');
    return token;
  }

  removeToken() {
    localStorage.removeItem('token');
  }

  redirectToLogin(){
    this.router.navigate(['/login']);
  }
}
