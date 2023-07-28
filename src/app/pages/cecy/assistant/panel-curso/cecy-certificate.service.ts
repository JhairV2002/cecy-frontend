import { Injectable } from '@angular/core';
import { Course } from '@models/cecy/secretary-cecy';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, finalize } from 'rxjs';
import { environment } from '@env/environment';
import { ListReports, Planification } from './certificateReport';

@Injectable({
  providedIn: 'root',
})
export class CecyCertificateService {
  constructor(private http: HttpClient) {}

  private apiUrl = `${environment.api2}/courses`;
  private apiUrl2 = `${environment.api}/cursos`;
  private apiUrlReporte = `${environment.api}/reporte`;
  private apiUrlPlanification = `${environment.api2}/planifications-courses`;
  private loading = new BehaviorSubject<boolean>(true);
  public loading$: Observable<boolean> = this.loading.asObservable();

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  public getviewReports(): Observable<ListReports[]> {
    this.loading.next(true);
    return this.http.get<ListReports[]>(`${this.apiUrlReporte}/`).pipe(
      finalize(() => {
        this.loading.next(false);
      })
    );
  }

  public findById(id: number): Observable<Course> {
    return this.http.get<Course>(this.apiUrl + '/' + id, this.httpOptions);
  }

  public getPlanificationById(id: number) {
    return this.http.get<Planification>(`${this.apiUrlPlanification}/${id}`);
  }
}
