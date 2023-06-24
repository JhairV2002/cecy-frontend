import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@env/environment';
import { PlanificationCourses } from '@models/cecy/coordinator-career';
import { PlanificationCourseInitial } from '@models/cecy-v1/course.model';

@Injectable({
  providedIn: 'root',
})
export class PlanificationsCoursesService {
  private apiUrl = `${environment.api2}/planifications-courses`;

  constructor(private http: HttpClient) {}
  getPlanificationCourses() {
    return this.http.get<PlanificationCourses[]>(`${this.apiUrl}`);
  }

  getPlanificationById(id: number) {
    return this.http.get<PlanificationCourseInitial>(`${this.apiUrl}/${id}`);
  }

  searchPlanifications(query: string) {
    return this.http.get<any[]>(`${this.apiUrl}/search-name?name=${query}`);
  }

  planificationById(id: number) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createEdit(data: any, selectPlanification: any) {
    if (!selectPlanification) {
      return this.http.post(`${this.apiUrl}`, data);
    } else {
      return this.http.put(`${this.apiUrl}/${selectPlanification.id}`, data);
    }
  }

  editPlanificationById(data: any, id: number) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  removePlanificationCourse(planificationCourseId: number) {
    return this.http.delete<any>(`${this.apiUrl}/${planificationCourseId}`);
  }
}
