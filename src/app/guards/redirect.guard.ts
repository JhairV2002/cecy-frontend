import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenService } from '@services/auth';
import jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root',
})
export class RedirectGuard implements CanActivate {
  constructor(private tokenService: TokenService, private router: Router) { }
  canActivate(): boolean {
    const token = this.tokenService.getToken();
    const tokenStudent = this.tokenService.getEstudianteToken()

    if (token) {
      const decodeToken = jwt_decode(token) as { [key: string]: any };
      console.log('TOKEN REDIRECT', decodeToken);

      const role = decodeToken['role'].name;
      if (role === 'admin') {
        this.router.navigate(['/administrator']);
      } else if (role === 'coordinator_career') {
        this.router.navigate(['/cecy/coordinator-career']);
      } else if (role === 'coordinator_cecy') {
        this.router.navigate(['/cecy/coordinator-cecy']);
      } else if (role === 'instructor_execute') {
        this.router.navigate(['/cecy/responsible-execute']);
      } else if (role === 'responsible_course') {
        this.router.navigate(['/cecy/responsible-course']);
      } else if (role === 'assistant_cecy') {
        this.router.navigate(['/cecy/coordinator-cecy']);
      } else {
        console.log('error de redireccion de pagina');
        this.router.navigate(['/common/access-denied']);
      }
      return false;
    }

    if (tokenStudent) {
      const decodeToken = jwt_decode(tokenStudent) as { [key: string]: any };
      console.log('TOKEN STUDENT', decodeToken)
      const role = decodeToken['role'];
      console.log('DECODE ROLE', role);
      if (role === 'estudiante') {
        this.router.navigate(['/estudiante'])
      } else {
        this.tokenService.removeEstudianteAuth();
        console.log('Error de direccion de pagina');
        this.router.navigate(['/login'])
      }
      return false;
    }
    return true;
  }
}
