import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap, tap } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Auth, User } from '@models/authentication';
import { TokenService } from './token.service';
import { BehaviorSubject, Observable, finalize } from 'rxjs';
import { Planification } from '@models/cecy/coordinator-career/careers.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.api2}/auth`;
  private apiUrl2 = `${environment.api2}/planifications`;

  user$ = new BehaviorSubject<User[] | null>(null);
  userProfile$ = new BehaviorSubject<User | null>(null);
  loading = new BehaviorSubject<boolean>(true);
  loading$: Observable<boolean> = this.loading.asObservable();

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  login(user: User) {
    return this.http.post<Auth>(`${this.apiUrl}/login`, user).pipe(
      tap((response) => {
        this.tokenService.saveToken(response.token);
      })
    );
  }

  logout(): void {
    this.tokenService.removeToken();
  }

  profile() {
    return this.http
      .get<User[]>(`${this.apiUrl}/profile`, {})
      .pipe(tap((user: any) => this.user$.next(user)));
  }

  loginAndGet(user: any) {
    return this.login(user).pipe(switchMap(() => this.profile()));
  }

  getPlanificationsbyUser() {
    return this.http.get<any[]>(`${this.apiUrl2}/my`);
  }

  getProfile() {
    this.loading.next(true);
    const token = this.tokenService.getToken();
    return this.http
      .get<User>(`${this.apiUrl}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .pipe(
        tap((user: any) => {
          this.user$.next(user);
          this.userProfile$.next(user);
        }),
        finalize(() => {
          this.loading.next(false);
        })
      );
  }
}
