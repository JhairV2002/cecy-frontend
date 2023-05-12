import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CreateCustomer } from './create.customer';
import { environment } from '@env/environment';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ServerResponse } from '@models/core';
import { User } from '@models/authentication';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.api2}`;
  constructor(private http: HttpClient) {}

  private user = new BehaviorSubject<ServerResponse>({});
  public users$ = this.user.asObservable();


  getUsers() {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  createEdit(data: any, selectedUser: CreateCustomer) {
    if (!selectedUser) {
      return this.http.post(`${this.apiUrl}/customers`, data);
    } else {
      return this.http.put(`${this.apiUrl}/customers/${selectedUser.id}`, data);
    }
  }
  removeUser(userId: any) {
    return this.http.delete(`${this.apiUrl}/customers/${userId}`);
  }
}
