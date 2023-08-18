import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '@services/auth';

export const tokenStudentGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);


  const tokenStudent = tokenService.getEstudianteToken();
  if (!tokenStudent) {
    console.log('Se activo el guard student token');
    router.navigate(['/login']);
    return false;
  }
  return true;
};
