import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = `${environment.api2}/planifications-courses`;
  constructor(
    private http:HttpClient
  ) { }

  getPlanifications(){
    return this.http.get<any>(`${this.apiUrl}`)
  }
}
