import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  Careers,
} from '../../../models/cecy/coordinator-career';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class CareersService {
  private apiUrl = `${environment.api2}/careers`;

  constructor(private http: HttpClient) {}

  getCareers() {
    return this.http.get<Careers[]>(`${this.apiUrl}`);
  }

  getPlanificationsCareers(id: number) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}