import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '@env/environment';
import { ServerResponse } from '@models/core/server.response';
import { Handler } from '../../exceptions/handler';
import { FileModel, PaginatorModel, UserModel } from '@models/core';
import { CertificateModel, RegistrationModel } from '@models/cecy';


@Injectable({
  providedIn: 'root'
})

export class CertificateService {
  private API_URL_PRIVATE: string = `${environment.API_URL_PRIVATE}/certificates`;
  private API_URL_PUBLIC: string = `${environment.API_URL_PUBLIC}/certificates`;

  private loaded = new BehaviorSubject<boolean>(true);
  public loaded$ = this.loaded.asObservable();
  private certificatesList: ServerResponse = {};
  private certificates = new BehaviorSubject<ServerResponse>({});
  public certificates$ = this.certificates.asObservable();

  private certificateModel: CertificateModel = {};
  private certificate = new BehaviorSubject<CertificateModel>({});
  public certificate$ = this.certificate.asObservable();
  private paginator = new BehaviorSubject<PaginatorModel>({ current_page: 1, per_page: 25, total: 0 });
  public paginator$ = this.paginator.asObservable();



  constructor(private httpClient: HttpClient) {

  }

  downloadFileCertificates(catalogue: any, file: any): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/certificate/catalogue/${catalogue}/file/${file}`;

    this.loaded.next(true);
    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }

  // downloadCertificateByParticipant(registration, catalogue, file): Observable<ServerResponse> {
  //   const url = `${this.API_URL}/certificate/registration/${registration}/catalogue/${catalogue}/file/${file}`;

  //   this.loaded.next(true);
  //   return this.httpClient.post<ServerResponse>(url, user)
  //     .pipe(
  //       map(response => response),
  //       tap(response => {
  //         this.loaded.next(false);
  //       }, error => {
  //         this.loaded.next(false);
  //       }),
  //       catchError(Handler.render)
  //     );
  // }

  // uploadFileCertificate(catalogue): Observable<ServerResponse> {
  //   const url = `${this.API_URL}/certificate/catalogue/${catalogue}`;

  //   this.loaded.next(true);
  //   return this.httpClient.post<ServerResponse>(url, user)
  //     .pipe(
  //       map(response => response),
  //       tap(response => {
  //         this.loaded.next(false);
  //       }, error => {
  //         this.loaded.next(false);
  //       }),
  //       catchError(Handler.render)
  //     );
  // }

  // uploadFileCertificateFirm(catalogue): Observable<ServerResponse> {
  //   const url = `${this.API_URL}/certificate/firm/catalogue/${catalogue}`;

  //   this.loaded.next(true);
  //   return this.httpClient.post<ServerResponse>(url, user)
  //     .pipe(
  //       map(response => response),
  //       tap(response => {
  //         this.loaded.next(false);
  //       }, error => {
  //         this.loaded.next(false);
  //       }),
  //       catchError(Handler.render)
  //     );
  // }



  getCertificate(): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/certificate/excel-dates`;
    const params = new HttpParams()
    this.loaded.next(true);
    return this.httpClient.get<ServerResponse>(url, { params })
      .pipe(
        map(response => response),
        tap(response => {
          this.certificatesList = response as ServerResponse;
          this.certificates.next(this.certificatesList);
          this.loaded.next(false);
          this.paginator.next(response.meta!);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }

  updateFile(file: FileModel, params = new HttpParams()): Observable<ServerResponse> {
    const url = this.API_URL_PRIVATE + '/certificate/excel-reading/' + file.id;
    return this.httpClient.put<ServerResponse>(url, file, { params })
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }



}

