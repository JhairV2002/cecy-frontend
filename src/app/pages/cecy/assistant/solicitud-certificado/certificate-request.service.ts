import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, finalize } from 'rxjs';

import { environment } from '@env/environment';
import {
  Codes,
  Course,
  Firms,
  Report,
  Sponsor,
  TipoCertificado,
  UpdateCode,
  tipo,
} from './certificate';

@Injectable({
  providedIn: 'root',
})
export class CertificateRequestService {
  constructor(private http: HttpClient) {}

  tipoCertificado: TipoCertificado = {
    id: 0,
  };
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  private apiUrl = `${environment.api}/reporte`;
  private apiUrl1 = `${environment.api}/codigo`;
  private apiUrl2 = `${environment.api}/certificado`;
  private apiUrl3 = `${environment.api}`;
  private apiUrl4 = `${environment.api2}/courses`;
  private loading = new BehaviorSubject<boolean>(true);
  public loading$: Observable<boolean> = this.loading.asObservable();

  public findById(id: number): Observable<Report> {
    return this.http.get<Report>(
      this.apiUrl + '/' + id + '/',
      this.httpOptions
    );
  }

  public findByMatriculaId(id: number): Observable<Codes> {
    return this.http.get<Codes>(`${this.apiUrl1}/findByMatriculaId/${id}/`);
  }
  public saveCertificate(generarCertificado: Codes, id: number) {
    return this.http.put<Codes>(
      this.apiUrl1 + '/' + id + '/',
      generarCertificado,
      { observe: 'response' }
    );
  }

  public updateCode(
    generarCertificado: UpdateCode,
    id: number
  ): Observable<UpdateCode> {
    return this.http.patch<UpdateCode>(
      this.apiUrl1 + '/' + id + '/',
      generarCertificado
    );
  }

  public downloadCertificate(id: number) {
    return this.http.get(this.apiUrl2 + '/pdf/' + id + '/', {
      responseType: 'blob',
    });
  }

  uploadFile(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl3 + '/media/subir', formData);
  }

  public subirfirma(firmas: any): Observable<any> {
    return this.http.post(this.apiUrl3 + '/firma/', firmas);
  }

  public findAllFirms(): Observable<Firms[]> {
    return this.http.get<Firms[]>(this.apiUrl3 + '/firma/', this.httpOptions);
  }

  patchReport(report: any, id: number) {
    return this.http.patch(this.apiUrl + '/' + id + '/', report);
  }

  postTypeCertificate(tipoCertificado: TipoCertificado) {
    return this.http.post(
      this.apiUrl3 + '/tipo-certificado/',
      tipoCertificado,
      { observe: 'response' }
    );
  }

  public findByIdCourse(id: number): Observable<Course> {
    this.loading.next(true);
    return this.http
      .get<Course>(this.apiUrl4 + '/' + id, this.httpOptions)
      .pipe(
        finalize(() => {
          this.loading.next(false);
        })
      );
  }

  getSponsors(): Observable<Sponsor[]> {
    return this.http.get<Sponsor[]>(this.apiUrl4 + '/sponsor/all/');
  }
}
