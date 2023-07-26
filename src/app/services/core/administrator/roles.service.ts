import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@env/environment';
import { Roles } from '@models/authentication/roles.model';
import { BehaviorSubject, Observable, finalize } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  private apiUrl = `${environment.api2}/roles`;
  private loading = new BehaviorSubject<boolean>(true);
  public loading$: Observable<boolean> = this.loading.asObservable();

  constructor(private http: HttpClient) {}

  getRoles() {
    this.loading.next(true);
    return this.http.get<Roles[]>(`${this.apiUrl}`).pipe(
      finalize(() => {
        this.loading.next(false);
      })
    );
  }

  getRoleAssistant() {
    this.loading.next(true);
    return this.http.get<Roles[]>(`${this.apiUrl}/assistant`).pipe(
      finalize(() => {
        this.loading.next(false);
      })
    );
  }

  addEditRole(data: any, selectedRol: any) {
    if (!selectedRol) {
      this.loading.next(true);
      return this.http.post(`${this.apiUrl}`, data).pipe(
        finalize(() => {
          this.loading.next(false);
        })
      );
    } else {
      this.loading.next(true);
      return this.http.put(`${this.apiUrl}/${selectedRol.id}`, data).pipe(
        finalize(() => {
          this.loading.next(false);
        })
      );
    }
  }

  deleteRole(id: number) {
    this.loading.next(true);
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      finalize(() => {
        this.loading.next(false);
      })
    );
  }
}
