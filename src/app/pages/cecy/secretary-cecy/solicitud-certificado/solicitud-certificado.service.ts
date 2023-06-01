import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SolicitudCertificado } from './solicitud-certificado';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class SolicitudCertificadoService {

  constructor(
    private http: HttpClient
  ) { }

  private httpOptions = {
    headers: new HttpHeaders({"Content-Type":"application/json"})
  }

  private apiUrl = `${environment.api4}/api/matriculas`;

  public findAll(): Observable<SolicitudCertificado[]>{
    return this.http.get<SolicitudCertificado[]>(this.apiUrl+"/estadoCurso/Aprobado/", this.httpOptions);
  }
  public findById(id: number): Observable<SolicitudCertificado>{
    return this.http.get<SolicitudCertificado>(this.apiUrl+"/"+id+"/", this.httpOptions);
  }
}
