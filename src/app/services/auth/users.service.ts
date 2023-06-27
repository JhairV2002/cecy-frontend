import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { User } from '@models/authentication/';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = `${environment.api2}/customers`;
  constructor(private http: HttpClient) {}

  create(dto: any) {
    return this.http.post(this.apiUrl, dto);
  }

  getAll() {
    return this.http.get<any>(this.apiUrl);
  }
}
