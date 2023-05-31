import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { PlanificationCoursesCoordinatorCecy } from '@models/cecy/coordinator-cecy';
import { PlanificationCourses } from '@models/cecy/coordinator-career';

@Injectable({
  providedIn: 'root',
})
export class PlanificationCareerService {
  private apiUrl = `${environment.api2}/planifications-courses`;
  statusAprooved: string = 'aprobado';
  statusProcess: string = 'proceso';
  constructor(private http: HttpClient) {}

  getCareerAndCourses() {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  filterByName(name: string) {
    return this.http.get<any>(`${this.apiUrl}/search/${name}`);
  }

  filterByStateAprooved() {
    return this.http.get(`${this.apiUrl}/state/${this.statusAprooved}`);
  }

  filterByStateProcess() {
    return this.http.get(`${this.apiUrl}/state/${this.statusProcess}`);
  }

  updatePlanification(id: number, state: string) {
    return this.http.patch(`${this.apiUrl}/${id}`, {
      state,
    });
  }
}
