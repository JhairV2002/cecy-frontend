import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportCourseService {
  private apiUrl = `${environment.api3}`;


  constructor(private http: HttpClient) {}



  public generateReportNeed(id: number) {
    return this.http.get(this.apiUrl + '/api/cursos/xls/' + id + '/need', {
      responseType: 'blob',
    });
  }

  public generateReportDesign(id: number) {
    return this.http.get(this.apiUrl + '/api/cursos/xls/' + id + '/design', {
      responseType: 'blob',
    });
  }
}
