import { Injectable } from '@angular/core';
import * as themes from '../../../assets/themes/themes.json';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { ServerResponse } from '@models/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Handler } from '../../exceptions/handler';
import { environment } from '@env/environment';
import { MessageService } from '@services/core/message.service';

@Injectable({
  providedIn: 'root',
})
export class CoreHttpService {
  private API_URL_PRIVATE: string = `${environment.API_URL_PRIVATE}`;
  private API_URL_PUBLIC: string = `${environment.API_URL_PUBLIC}`;

  constructor(
    private httpClient: HttpClient,
    private messageService: MessageService
  ) {}

  getCatalogues(type: string | undefined): Observable<ServerResponse> {
    const params = new HttpParams().append('type', String(type));
    const url = this.API_URL_PUBLIC + '/core-catalogue/catalogue';
    return this.httpClient.get<ServerResponse>(url, { params }).pipe(
      map((response) => response),
      catchError(Handler.render)
    );
  }

  getInstitutions(): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/institution/catalogue`;
    return this.httpClient.get<ServerResponse>(url).pipe(
      map((response) => response),
      catchError(Handler.render)
    );
  }

  getCareers(): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/career/catalogue`;
    return this.httpClient.get<ServerResponse>(url).pipe(
      map((response) => response),
      catchError(Handler.render)
    );
  }

  getCareersByInstitution(institutionId: number): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/institution/${institutionId}/careers`;
    return this.httpClient.get<ServerResponse>(url).pipe(
      map((response) => response),
      catchError(Handler.render)
    );
  }

  getCareersByCoordinatorCareer(): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/career/coordinator-career`;
    return this.httpClient.get<ServerResponse>(url).pipe(
      map((response) => response),
      catchError(Handler.render)
    );
  }

  getCatalogues2(
    type: string | undefined,
    paginator: any
  ): Observable<ServerResponse> {
    const params = new HttpParams()
      .append('type', String(type))
      .append('page', paginator.current_page!)
      .append('per_page', paginator.per_page!);
    const url = this.API_URL_PRIVATE + '/catalogue/all';
    return this.httpClient.get<ServerResponse>(url, { params }).pipe(
      map((response) => response),
      catchError(Handler.render)
    );
  }

  getLocations(
    type: string | undefined,
    parentId: number = 0
  ): Observable<ServerResponse> {
    const params = new HttpParams()
      .append('type', String(type))
      .append('parent', parentId);

    const url = this.API_URL_PUBLIC + '/locations/catalogue';
    return this.httpClient.get<ServerResponse>(url, { params }).pipe(
      map((response) => response),
      catchError(Handler.render)
    );
  }

  uploadFiles(
    url: string,
    data: FormData,
    params = new HttpParams()
  ): Observable<ServerResponse> {
    url = this.API_URL_PRIVATE + url;
    const headers = new HttpHeaders().set(
      'Content-Type',
      'multipart/form-data'
    );
    return this.httpClient
      .post<ServerResponse>(url, data, { params, headers })
      .pipe(
        map((response) => response),
        catchError(Handler.render)
      );
  }

  downloadFile(file: any) {
    this.getFile(file.id!).subscribe(
      (response) => {
        const binaryData = [] as BlobPart[];
        binaryData.push(response as BlobPart);
        const filePath = URL.createObjectURL(
          new Blob(binaryData, { type: 'pdf' })
        );
        const downloadLink = document.createElement('a');
        downloadLink.href = filePath;
        downloadLink.setAttribute('download', file.fullName!);
        document.body.appendChild(downloadLink);
        downloadLink.click();
      },
      (error) => {
        this.messageService.error(error);
      }
    );
  }

  downloadRequirement(id: number) {
    this.getRequirement(id!).subscribe(
      (response) => {
        const binaryData = [] as BlobPart[];
        binaryData.push(response as BlobPart);
        const filePath = URL.createObjectURL(
          new Blob(binaryData, { type: 'pdf' })
        );
        const downloadLink = document.createElement('a');
        downloadLink.href = filePath;
        downloadLink.setAttribute('download', 'nombre.pdf');
        document.body.appendChild(downloadLink);
        downloadLink.click();
      },
      (error) => {
        this.messageService.error(error);
      }
    );
  }

  getFiles(
    url: string,
    paginator: any,
    filter: string = ''
  ): Observable<ServerResponse> {
    url = this.API_URL_PRIVATE + url;
    let params = new HttpParams()
      .set('page', paginator.current_page!)
      .set('per_page', paginator.per_page!);
    // El filtro depende de los campos propios que sean cadenas de texto
    if (filter !== '') {
      params = params.append('name', filter).append('description', filter);
    }
    return this.httpClient.get<ServerResponse>(url, { params }).pipe(
      map((response) => response),
      catchError(Handler.render)
    );
  }

  getFile(fileId: number, params = new HttpParams()) {
    const url = `${this.API_URL_PRIVATE}/files/${fileId}/download`;
    return this.httpClient.get(url, { params, responseType: 'blob' as 'json' });
  }

  getRequirement(id: number, params = new HttpParams()) {
    const url = `${this.API_URL_PRIVATE}/requirements/${id}/download`;
    return this.httpClient.get(url, { params, responseType: 'blob' as 'json' });
  }

  updateFile(file: any, params = new HttpParams()): Observable<ServerResponse> {
    const url = this.API_URL_PRIVATE + '/files/' + file.id;
    return this.httpClient.put<ServerResponse>(url, file, { params }).pipe(
      map((response) => response),
      catchError(Handler.render)
    );
  }

  deleteFiles(
    ids: (number | undefined)[],
    params = new HttpParams()
  ): Observable<ServerResponse> {
    const url = this.API_URL_PRIVATE + '/files/destroys';
    return this.httpClient.patch<ServerResponse>(url, { ids }, { params }).pipe(
      map((response) => response),
      catchError(Handler.render)
    );
  }
}
