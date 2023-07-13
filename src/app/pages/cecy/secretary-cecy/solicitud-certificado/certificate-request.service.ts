import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import {
  Codes,
  Firms,
  Report,
  TipoCertificado,
  UpdateCode,
  tipo, } from './certificate';
  import { Firmas } from './firma';

@Injectable({
  providedIn: 'root',
})
export class CertificateRequestService {
  constructor(
    private http: HttpClient
    ) { }


  tipoCertificado: TipoCertificado = {
    id: 0
  }
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  private apiUrl = `${environment.api4}/reporte`;
  private apiUrl1 = `${environment.api4}/codigo`;
  private apiUrl2 = `${environment.api4}/certificado`;
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
    return this.http.post(this.apiUrl3+'/media/subir', formData);
  }

  public subirfirma(firmas: Firmas): Observable<any>{
    return this.http.post(this.apiUrl3+'/firma/',firmas);
  }

  public findAllFirms(): Observable<Firms[]> {
    return this.http.get<Firms[]>(
      this.apiUrl3 + '/firma/',
      this.httpOptions
    );
  }

  postTypeCertificate(tipoCertificado:TipoCertificado): Observable<TipoCertificado>{
    return this.http.post(this.apiUrl3+'/tipo-certificado/',tipoCertificado);
  }
}
