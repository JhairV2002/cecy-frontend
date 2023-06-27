import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CodigoCertificado } from './codigos-certificado';

@Injectable({
  providedIn: 'root'
})
export class CodigosCertificadoService {

  constructor(
    private http: HttpClient
  ) { }
  private httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  }

  private url: string = "http://localhost:8089/api/codigo"
  public findById(id: number): Observable<CodigoCertificado> {
    return this.http.get<CodigoCertificado>(this.url + "/" + id + "/", this.httpOptions);
  }
  public findAll(): Observable<CodigoCertificado[]> {
    return this.http.get<CodigoCertificado[]>(this.url + "/", this.httpOptions);
  }
  public update(actualizarCodigo: CodigoCertificado): Observable<CodigoCertificado> {
    return this.http.post<CodigoCertificado>(this.url+"/", actualizarCodigo, this.httpOptions);
}
}
