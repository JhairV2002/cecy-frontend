import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import {
  Codes,
  Firms,
  Report,
  UpdateCode, } from './certificate';
  import { Firmas } from './firma';

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
  private apiUrl3 = `${environment.api4}`;



  public findById(id: number): Observable<Report> {
    return this.http.get<Report>(
      this.apiUrl + '/' + id + '/',
      this.httpOptions
    );
  }
  public saveCertificate(generarCertificado:Codes, id: number): Observable<Codes> {
    return this.http.put<Codes>(this.apiUrl1+"/"+id+"/", generarCertificado);
  }

  public updateCode(generarCertificado:UpdateCode, id: number): Observable<UpdateCode> {
    return this.http.patch<UpdateCode>(this.apiUrl1+"/"+id+"/", generarCertificado);
  }

  public downloadCertificate(id: number) {
    return this.http.get(this.apiUrl2+"/pdf/"+id+"/",{responseType:'blob'});
  }

  uploadFile(formData: FormData): Observable<any>{
    return this.http.post(this.apiUrl3+'/api/media/subir', formData);
  }

  public subirfirma(firmas: Firmas): Observable<any>{
    return this.http.post(this.apiUrl3+'/api/firma/',firmas);
  }

  public findAllFirms(): Observable<Firms[]> {
    return this.http.get<Firms[]>(
      this.apiUrl3 + '/api/firma/',
      this.httpOptions
    );
  }
}