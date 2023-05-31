import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@env/environment';
import { Teacher } from './../../../models/cecy/coordinator-career';
import { User } from '@models/authentication';

@Injectable({
  providedIn: 'root',
})
export class TeachersService {
  responsible_course = 'responsible_course';
  coordinator_cecy = 'coordinator_cecy';

  private apiUrl = `${environment.api2}/users/role`;
  private apiUrlRoles = `${environment.api2}/roles`;
  private apiUrlRolesEspecific = `${environment.api2}/roles/especific`;
  private apiUrlCustomerByRole = `${environment.api2}/users/role-especific`;

  constructor(private http: HttpClient) {}

  getUserByRole() {
    return this.http.get<User[]>(`${this.apiUrl}/${this.responsible_course}`);
  }

  getUserByRoleEspecific() {
    return this.http.get<any>(
      `${this.apiUrlRolesEspecific}/${this.coordinator_cecy}`
    );
  }

  getRoles() {
    return this.http.get<any>(`${this.apiUrlRoles}`);
  }
}
