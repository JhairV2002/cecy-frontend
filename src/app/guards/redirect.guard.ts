import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenService } from '@services/auth';
import jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root',
})
export class RedirectGuard implements CanActivate {
  constructor(private tokenService: TokenService, private router: Router) {}
  canActivate(): boolean {
    const token = this.tokenService.getToken();
    if (token) {
      const decodeToken = jwt_decode(token) as { [key: string]: any };
      console.log('token', decodeToken);

      const role = decodeToken['role'].name;
      if (role === 'admin') {
        this.router.navigate(['/administrator']);
      } else if (role === 'operator') {
        this.router.navigate(['/operator']);
      } else {
        console.log('error de redireccion de pagina');
      }
      return false;
    }
    return true;
  }
}
