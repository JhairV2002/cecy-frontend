import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Careers } from '@models/cecy/coordinator-career';
import { environment } from '@env/environment';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CareersService {
  private apiUrl = `${environment.api2}/careers`;
  private planificationsSubject = new BehaviorSubject<any[]>([]);
  planifications$ = this.planificationsSubject.asObservable();

  constructor(private http: HttpClient) {}

  getCareers() {
    return this.http.get<Careers[]>(`${this.apiUrl}`);
  }

  getPlanificationsCareers(id: number) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addEditCareer(data: any, selectedCareer: any) {
    if (!selectedCareer) {
      return this.http.post(`${this.apiUrl}`, data);
    } else {
      return this.http.put(`${this.apiUrl}/${selectedCareer.id}`, data);
    }
  }

  deleteCareerById(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
