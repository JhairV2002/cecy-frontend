import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SelecRoleDTO } from '../../../models/authentication'
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  private apiUrl = `${environment.api2}`;

  constructor(private http: HttpClient) {}

  getRoles() {
    return this.http.get<SelecRoleDTO[]>(`${this.apiUrl}/roles`)
  }
}
