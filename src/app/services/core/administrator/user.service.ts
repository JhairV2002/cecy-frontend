import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '@env/environment';
import { ServerResponse } from '@models/core';
import { User } from '@models/authentication';
import { BehaviorSubject, Observable, finalize } from 'rxjs';
import { TokenService } from '@services/auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.api2}/users`;
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  private user = new BehaviorSubject<ServerResponse>({});
  public users$ = this.user.asObservable();
  private loading = new BehaviorSubject<boolean>(true);
  public loading$: Observable<boolean> = this.loading.asObservable();

  getUsers() {
    this.loading.next(true);
    return this.http.get<User[]>(`${this.apiUrl}`).pipe(
      finalize(() => {
        this.loading.next(false);
      })
    );
  }

  getUserById(id: number) {
    this.loading.next(true);
    return this.http.get<User>(`${this.apiUrl}/${id}`).pipe(
      finalize(() => {
        this.loading.next(false);
      })
    );
  }

  getAssistants() {
    this.loading.next(true);
    return this.http.get<User[]>(`${this.apiUrl}/assistants-all`).pipe(
      finalize(() => {
        this.loading.next(false);
      })
    );
  }

  searchUsers(query: string) {
    this.loading.next(true);
    const params = new HttpParams().set('name', query);
    return this.http
      .get<any[]>(`${this.apiUrl}/search`, {
        params,
      })
      .pipe(
        finalize(() => {
          this.loading.next(false);
        })
      );
  }

  searchAssistants(query: string) {
    this.loading.next(true);
    const params = new HttpParams().set('name', query);
    return this.http
      .get<any[]>(`${this.apiUrl}/search-assistants`, {
        params,
      })
      .pipe(
        finalize(() => {
          this.loading.next(false);
        })
      );
  }

  addEditUser(data: any, selectedUser: any) {
    if (!selectedUser) {
      this.loading.next(true);
      return this.http.post(`${this.apiUrl}`, data).pipe(
        finalize(() => {
          this.loading.next(false);
        })
      );
    } else {
      this.loading.next(true);
      return this.http.put(`${this.apiUrl}/${selectedUser.id}`, data).pipe(
        finalize(() => {
          this.loading.next(false);
        })
      );
    }
  }

  removeUser(userId: any) {
    this.loading.next(true);
    return this.http.delete(`${this.apiUrl}/${userId}`).pipe(
      finalize(() => {
        this.loading.next(false);
      })
    );
  }

  updateByImage(id: any, image: any) {
    this.loading.next(true);
    return this.http.patch(`${this.apiUrl}/${id}/image`, { image }).pipe(
      finalize(() => {
        this.loading.next(false);
      })
    );
  }

  updateByName(id: any, names: any) {
    this.loading.next(true);
    return this.http.patch(`${this.apiUrl}/${id}/names`, { names }).pipe(
      finalize(() => {
        this.loading.next(false);
      })
    );
  }

  updateByLastNames(id: any, lastnames: any) {
    this.loading.next(true);
    return this.http
      .patch(`${this.apiUrl}/${id}/lastnames`, { lastnames })
      .pipe(
        finalize(() => {
          this.loading.next(false);
        })
      );
  }

  updateByEmail(id: any, email: any) {
    this.loading.next(true);
    return this.http.patch(`${this.apiUrl}/${id}/email`, { email }).pipe(
      finalize(() => {
        this.loading.next(false);
      })
    );
  }

  changePassword(currentPassword: any, newPassword: any) {
    this.loading.next(true);
    const token = this.tokenService.getToken();
    const payload = {
      currentPassword,
      newPassword,
    };
    return this.http
      .put(`${this.apiUrl}/change-password`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .pipe(
        finalize(() => {
          this.loading.next(false);
        })
      );
  }

  changePasswordByUserId(
    userId: number,
    currentPasswordHash: any,
    newPassword: string | undefined | null
  ) {
    this.loading.next(true);
    const url = `${this.apiUrl}/change-password/${userId}`;
    const requestBody = { currentPasswordHash, newPassword };
    return this.http.put(url, requestBody).pipe(
      finalize(() => {
        this.loading.next(false);
      })
    );
  }
}
