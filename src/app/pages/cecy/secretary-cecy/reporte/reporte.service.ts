import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reporte } from './reporte';

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
}
