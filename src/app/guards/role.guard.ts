import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

import { AuthService, TokenService } from '@services/auth';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private tokenService: TokenService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectRole = route.data['expectedRole'];
    const token = localStorage.getItem('token');
    const helper = new JwtHelperService();
    const decodeToken = helper.decodeToken(token);
    console.log('Token decodificado:', decodeToken.role);
    if (decodeToken.role !== expectRole) {
      console.log('Usuario no autorizado para la vista');
      return false;
    }
    return true;
  }
}
