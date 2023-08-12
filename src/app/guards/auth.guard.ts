import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { TokenService } from '@services/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private tokenService: TokenService, private router: Router) { }
  canActivate(): boolean {
    const token = this.tokenService.getToken();
    const tokenStudent = this.tokenService.getEstudianteToken();
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    if (!tokenStudent) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
