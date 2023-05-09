import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { switchMap, tap } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Auth, User, ProfileCustomerDTO } from '@models/authentication';
import { TokenService } from './token.service';
import { checkTime } from './../../interceptors/time.interceptor';
import { BehaviorSubject } from 'rxjs';
import { Planification } from '@models/cecy/coordinator-career/careers.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.api2}/auth`;
  private apiUrl2 = `${environment.api2}/planifications`;

  private user = new BehaviorSubject<ProfileCustomerDTO[] | null>(null);
  user$ = this.user.asObservable();

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
      .get<ProfileCustomerDTO[]>(`${this.apiUrl}/profile`, {})
      .pipe(tap((user) => this.user.next(user)));
  }

  loginAndGet(user: any) {
    return this.login(user).pipe(switchMap(() => this.profile()));
  }

  getPlanificationsbyUser() {
    return this.http.get<Planification[]>(`${this.apiUrl2}/my`);
  }
}
