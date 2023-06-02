import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@env/environment';
import { Roles } from '@models/authentication/roles.model';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  private apiUrl = `${environment.api2}`;

  constructor(private http: HttpClient) {}

  getRoles() {
    return this.http.get<Roles[]>(`${this.apiUrl}/roles`);
  }
}
