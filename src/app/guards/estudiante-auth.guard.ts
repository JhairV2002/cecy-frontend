import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { EstudiantesService } from '@layout/estudiantes/estudiantes.service';
import { tap } from 'rxjs';

export const estudianteAuthGuard: CanMatchFn = () => {
    const estudiantesService: EstudiantesService = inject(EstudiantesService);
    const router: Router = inject(Router);

    return estudiantesService.isLogged() || router.navigateByUrl("/estudiante/cursos/login");
};
