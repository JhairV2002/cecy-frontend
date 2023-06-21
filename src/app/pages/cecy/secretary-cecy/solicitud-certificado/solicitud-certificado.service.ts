import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Matricula } from './solicitud-certificado';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class SolicitudCertificadoService {
  constructor(private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  private apiUrl = `${environment.api}/api/matriculas`;

  public findAll(): Observable<Matricula[]> {
    return this.http.get<Matricula[]>(
      this.apiUrl + '/estadoCurso/Aprobado/',
      this.httpOptions
    );
  }
  public findById(id: number): Observable<Matricula> {
    return this.http.get<Matricula>(
      this.apiUrl + '/' + id + '/',
      this.httpOptions
    );
  }

  public findAllReport(): Observable<Matricula[]> {
    return this.http.get<Matricula[]>(
      this.apiUrl +'/',
      this.httpOptions
    );
  }
}
