import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@env/environment';
import { PlanificationCoursesCoordinatorCecy } from '@models/cecy/coordinator-cecy';
import { PlanificationCourses } from '@models/cecy/coordinator-career';
import { BehaviorSubject, Observable, finalize } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlanificationCareerService {
  private apiUrl = `${environment.api2}/planifications-courses`;
  statusAprooved: string = 'aprobado';
  statusProcess: string = 'creado';
  private loading = new BehaviorSubject<boolean>(true);
  public loading$: Observable<boolean> = this.loading.asObservable();

  constructor(private http: HttpClient) {}

  getCareerAndCourses() {
    this.loading.next(true);
    return this.http.get<any>(`${this.apiUrl}`).pipe(
      finalize(() => {
        this.loading.next(false);
      })
    );
  }

  search(query: string) {
    this.loading.next(true);
    const params = new HttpParams().set('name', query);
    return this.http
      .get<any>(`${this.apiUrl}/search`, {
        params,
      })
      .pipe(
        finalize(() => {
          this.loading.next(false);
        })
      );
  }

  filterByStateAprooved() {
    this.loading.next(true);
    return this.http.get(`${this.apiUrl}/state/${this.statusAprooved}`).pipe(
      finalize(() => {
        this.loading.next(false);
      })
    );
  }

  filterByStateProcess() {
    this.loading.next(true);
    return this.http.get(`${this.apiUrl}/state/${this.statusProcess}`).pipe(
      finalize(() => {
        this.loading.next(false);
      })
    );
  }

  updatePlanification(id: number, state: string) {
    this.loading.next(true);
    return this.http
      .patch(`${this.apiUrl}/${id}`, {
        state,
      })
      .pipe(
        finalize(() => {
          this.loading.next(false);
        })
      );
  }
}
