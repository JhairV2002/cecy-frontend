import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Careers } from '@models/cecy/coordinator-career';
import { environment } from '@env/environment';
import { BehaviorSubject, Observable, finalize, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CareersService {
  private apiUrl = `${environment.api2}/careers`;
  private planificationsSubject = new BehaviorSubject<any[]>([]);
  planifications$ = this.planificationsSubject.asObservable();
  private loading = new BehaviorSubject<boolean>(true);
  public loading$: Observable<boolean> = this.loading.asObservable();

  constructor(private http: HttpClient) {}

  getCareers() {
    this.loading.next(true);
    return this.http.get<Careers[]>(`${this.apiUrl}`).pipe(
      finalize(() => {
        this.loading.next(false);
      })
    );
  }

  getCareeryByIdAndAproovedCourses(idCareer: number) {
    this.loading.next(true);
    return this.http
      .get<Careers[]>(`${this.apiUrl}/state-course/aprobado/career/${idCareer}`)
      .pipe(
        finalize(() => {
          this.loading.next(false);
        })
      );
  }

  getPlanificationsCareers(id: number) {
    this.loading.next(true);
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      finalize(() => {
        this.loading.next(false);
      })
    );
  }

  addEditCareer(data: any, selectedCareer: any) {
    if (!selectedCareer) {
      this.loading.next(true);
      return this.http.post(`${this.apiUrl}`, data).pipe(
        finalize(() => {
          this.loading.next(false);
        })
      );
    } else {
      this.loading.next(true);
      return this.http.put(`${this.apiUrl}/${selectedCareer.id}`, data).pipe(
        finalize(() => {
          this.loading.next(false);
        })
      );
    }
  }

  deleteCareerById(id: number) {
    this.loading.next(true);
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.loading.next(false);
      })
    );
  }
}
