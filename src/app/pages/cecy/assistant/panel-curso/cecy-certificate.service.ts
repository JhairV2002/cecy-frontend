import { Injectable } from '@angular/core';
import { Course } from '@models/cecy/secretary-cecy';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { ListReports, Planification } from './certificateReport';

@Injectable({
  providedIn: 'root',
})
export class CecyCertificateService {
  constructor(private http: HttpClient) { }

  private apiUrl = `${environment.api}/courses`;
  private apiUrl2 = `${environment.api}/cursos`;
  private apiUrlReporte= `${environment.api}/reporte`;
  private apiUrlPlanification = `${environment.api2}/planifications-courses`;

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  public getviewReports(): Observable<ListReports[]> {
    return this.http.get<ListReports[]>(`${this.apiUrlReporte}/`);
  }

  public findById(id: number): Observable<Course> {
    return this.http.get<Course>(this.apiUrl2 + '/' + id, this.httpOptions);
  }

  public getPlanificationById(id: number) {
    return this.http.get<Planification>(`${this.apiUrlPlanification}/${id}`);
  }
}
