import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Matricula, Reporte } from './reporte';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  constructor(
    private http: HttpClient
  ) { }
  private httpOptions = {
    headers: new HttpHeaders({"Content-Type":"application/json"})
  }
  private url: string = "http://localhost:8080/api/reporte";
  private apiUrl = `${environment.api4}/api/matriculas`;

  public findAll(): Observable<Reporte[]> {
    return this.http.get<Reporte[]>(
      this.url + '/',
      this.httpOptions
    );
  }

  public findById(id: number): Observable<Reporte>{
    return this.http.get<Reporte>(this.url+"/"+id+"/", this.httpOptions);
  }

  public save(generarReporte: Reporte): Observable<Reporte>{
    return this.http.post<Reporte>(this.url+"/", generarReporte);
  }

  public descarga(id: number) {
    return this.http.get(this.url+"/xls/"+id+"/",{responseType:'blob'});
  }

  public findAllReport(): Observable<Matricula[]> {
    return this.http.get<Matricula[]>(
      this.apiUrl +'/',
      this.httpOptions
    );
  }
}
