import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@env/environment';
import { RecoveryUserDTO, ChangePassword } from './../../models/authentication';

@Injectable({
  providedIn: 'root',
})
export class RecoveryPasswordService {
  private apiUrl = `${environment.api2}/auth`;
  constructor(private http: HttpClient) {}

  recoveryPassword(user: any) {
    return this.http.post(`${this.apiUrl}/recovery`, user);
  }

  changePassword(data: ChangePassword) {
    return this.http.post(`${this.apiUrl}/change-password`, data);
  }
}
