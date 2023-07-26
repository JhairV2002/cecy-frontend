import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '@env/environment';
import { PlanificationCourses } from '@models/cecy/coordinator-career';
import { PlanificationCourseInitial } from '@models/cecy-v1/course.model';
import { BehaviorSubject, Observable, finalize, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlanificationsCoursesService {
  private apiUrl = `${environment.api2}/planifications-courses`;
  private loading = new BehaviorSubject<boolean>(true);
  public loading$: Observable<boolean> = this.loading.asObservable();
  planification = new BehaviorSubject<PlanificationCourses[] | null>(null);
  planification$: Observable<any> = this.planification.asObservable();

  constructor(private http: HttpClient) {}
  getPlanificationCourses() {
    this.loading.next(true);
    return this.http.get<PlanificationCourses[]>(`${this.apiUrl}`).pipe(
      finalize(() => {
        this.loading.next(false);
      })
    );
  }

  getPlanificationById(id: number) {
    this.loading.next(true);
    return this.http
      .get<PlanificationCourseInitial>(`${this.apiUrl}/${id}`)
      .pipe(
        tap((planification: any) => {
          this.planification.next(planification);
        }),
        finalize(() => {
          this.loading.next(false);
        })
      );
  }

  searchPlanifications(query: string) {
    this.loading.next(true);
    return this.http
      .get<any[]>(`${this.apiUrl}/search-name?name=${query}`)
      .pipe(
        finalize(() => {
          this.loading.next(false);
        })
      );
  }

  searchPlanificationsByCareer(query: string, careerId: number) {
    this.loading.next(true);
    const params = new HttpParams()
      .set('name', query)
      .set('careerId', careerId);
    return this.http
      .get<any[]>(`${this.apiUrl}/search-name-career`, {
        params,
      })
      .pipe(
        finalize(() => {
          this.loading.next(false);
        })
      );
  }

  planificationById(id: number) {
    this.loading.next(true);
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      finalize(() => {
        this.loading.next(false);
      })
    );
  }

  paginator(page: number, size: number) {
    this.loading.next(true);
    return this.http
      .get(`${this.apiUrl}/pagination?page=${page}&size=${size}`)
      .pipe(
        finalize(() => {
          this.loading.next(false);
        })
      );
  }

  createEdit(data: any, selectPlanification: any) {
    if (!selectPlanification) {
      this.loading.next(true);
      return this.http.post(`${this.apiUrl}`, data).pipe(
        finalize(() => {
          this.loading.next(false);
        })
      );
    } else {
      this.loading.next(true);
      return this.http
        .put(`${this.apiUrl}/${selectPlanification.id}`, data)
        .pipe(
          finalize(() => {
            this.loading.next(false);
          })
        );
    }
  }

  editPlanificationById(data: any, id: number) {
    this.loading.next(true);
    return this.http.put(`${this.apiUrl}/${id}`, data).pipe(
      finalize(() => {
        this.loading.next(false);
      })
    );
  }

  removePlanificationCourse(planificationCourseId: number) {
    this.loading.next(true);
    return this.http
      .delete<any>(`${this.apiUrl}/${planificationCourseId}`)
      .pipe(
        finalize(() => {
          this.loading.next(false);
        })
      );
  }
}
