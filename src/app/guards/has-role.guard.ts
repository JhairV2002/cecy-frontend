import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { map, Observable, tap } from 'rxjs';

import { AuthService } from '@services/auth';

@Injectable({
  providedIn: 'root',
})
export class HasRoleGuard implements CanLoad, CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.hasRole(route);
  }

  canLoad(route: Route): Observable<boolean> {
    return this.hasRole(route);
  }

  private hasRole(route: Route | ActivatedRouteSnapshot) {
    const allowedRoles = route.data?.['allowedRoles'];

    return this.authService.user$.pipe(
      map((user) => Boolean(user && allowedRoles.includes(user[0].role))),
      tap((hasRole) => hasRole === false && alert('acceso denegado'))
    );
  }
}
