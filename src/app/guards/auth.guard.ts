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
    if (!token) {
      console.log('Se activo el token guard usuario global');
      this.router.navigate(['/cecy/login']);
      return false;
    }
    return true;
  }
}
