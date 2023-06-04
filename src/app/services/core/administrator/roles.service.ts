import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@env/environment';
import { Roles } from '@models/authentication/roles.model';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  private apiUrl = `${environment.api2}/roles`;

  constructor(private http: HttpClient) {}

  getRoles() {
    return this.http.get<Roles[]>(`${this.apiUrl}`);
  }

  addEditRole(data: any, selectedRol: any) {
    if (!selectedRol) {
      return this.http.post(`${this.apiUrl}`, data);
    } else {
      return this.http.put(`${this.apiUrl}/${selectedRol.id}`, data);
    }
  }

  deleteRole(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
