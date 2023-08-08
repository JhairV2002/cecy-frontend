import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Matricula, Reporte } from './reporte';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class ReporteService {
  constructor(private http: HttpClient) {}
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  private apiUrl1 = `${environment.api}/matriculas`;
  private apiUrl2 = `${environment.api}/matriculas/cursoId/`;
  private apiUrl = `${environment.api}/reporte`;

  public findAll(): Observable<Reporte[]> {
    return this.http.get<Reporte[]>(this.apiUrl + '/', this.httpOptions);
  }

  public findAllMatricula(id: number): Observable<Matricula[]> {
    return this.http.get<Matricula[]>(
      this.apiUrl2 + id + '/',
      this.httpOptions
    );
  }

  public findById(id: number): Observable<Reporte> {
    return this.http.get<Reporte>(
      this.apiUrl + '/' + id + '/',
      this.httpOptions
    );
  }

  public save(generarReporte: Reporte){
    return this.http.post<Reporte>(this.apiUrl + '/', generarReporte,{observe: 'response'});
  }

  public descarga(id: number) {
    return this.http.get(this.apiUrl + '/xls/' + id + '/', {
      responseType: 'blob',
    });
  }

  public findAllReport(): Observable<Matricula[]> {
    return this.http.get<Matricula[]>(this.apiUrl1 + '/', this.httpOptions);
  }
}
