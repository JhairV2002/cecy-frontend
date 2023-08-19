import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportCourseService {
  private apiUrl = `${environment.api3}`;
  private apiUrl2 = `${environment.api2}/reporte`
  // http://localhost:3000/api/v1/reporte/design/5


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
  public testGetReport(id: number){
    return this.http.get(this.apiUrl2+`/all/${id}`)
  }
}
