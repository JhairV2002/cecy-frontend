import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { Codes, Report } from './certificate';

@Injectable({
  providedIn: 'root',
})
export class CertificateRequestService {
  constructor(private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  private apiUrl = `${environment.api4}/api/reporte`;
  private apiUrl1 = `${environment.api4}/api/codigo`;
  private apiUrl2 = `${environment.api4}/api/certificado`;


  public findById(id: number): Observable<Report> {
    return this.http.get<Report>(
      this.apiUrl + '/' + id + '/',
      this.httpOptions
    );
  }
  public saveCertificate(generarCertificado:Codes, id: number): Observable<Codes> {
    return this.http.put<Codes>(this.apiUrl1+"/"+id+"/", generarCertificado);
  }

  public downloadCertificate(id: number) {
    return this.http.get(this.apiUrl2+"/pdf/"+id+"/",{responseType:'blob'});
  }
}
