import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { SchoolYear } from '@models/cecy/coordinator-career';
@Injectable({
  providedIn: 'root',
})
export class SchoolYearService {
  private apiUrl = `${environment.api2}/school-years`;
  constructor(private http: HttpClient) {}

  getSchoolYear() {
    return this.http.get<SchoolYear[]>(`${this.apiUrl}`);
  }

  getSchoolYearById(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  addEditSchoolYear(data: any, selectedYearSchool: any) {
    if (!selectedYearSchool) {
      return this.http.post(`${this.apiUrl}`, data);
    } else {
      return this.http.put(`${this.apiUrl}/${selectedYearSchool.id}`, data);
    }
  }

  createSchoolYear(data: SchoolYear) {
    return this.http.post(`${this.apiUrl}`, data);
  }

  editSchoolYearById(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteSchoolYear(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
