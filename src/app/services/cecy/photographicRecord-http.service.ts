import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '@env/environment';
import { ServerResponse } from '@models/core/server.response';
import { Handler } from '../../exceptions/handler';
import { PhotographicRecordModel } from '@models/cecy/photographic-record.model';
import { MessageService } from '@services/core';

@Injectable({
  providedIn: 'root',
})
export class PhotographicRecordHttpService {
  private API_URL_PRIVATE: string = `${environment.API_URL_PRIVATE}/records`;
  private API_URL_PUBLIC: string = `${environment.API_URL_PUBLIC}/records`;

  private photographicRecordList: ServerResponse = {};
  private photographicRecords = new BehaviorSubject<ServerResponse>({});
  public photographicRecords$ = this.photographicRecords.asObservable();

  private photographicRecordModel: PhotographicRecordModel = {};
  private photographicRecord = new BehaviorSubject<PhotographicRecordModel>({});

  private loaded = new BehaviorSubject<boolean>(true);
  public loaded$ = this.loaded.asObservable();

  private paginator = new BehaviorSubject<any>({
    current_page: 1,
    per_page: 15,
    total: 0,
  });
  public paginator$ = this.paginator.asObservable();

  constructor(
    private httpClient: HttpClient,
    public messageService: MessageService
  ) {}

  getPhotographicRecords(): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/`;
    const params = new HttpParams();
    this.loaded.next(true);
    return this.httpClient.get<ServerResponse>(url, { params }).pipe(
      map((response) => response),
      tap(
        (response) => {
          this.photographicRecordList = response as ServerResponse;
          this.photographicRecords.next(this.photographicRecordList);
          this.loaded.next(false);
          this.paginator.next(response.meta!);
        },
        (error) => {
          this.loaded.next(false);
        }
      ),
      catchError(Handler.render)
    );
  }

  getPhotographicRecord(id: number): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/detail-record/${id}`;

    this.loaded.next(true);
    return this.httpClient.get<ServerResponse>(url).pipe(
      map((response) => response),
      tap(
        (response) => {
          this.loaded.next(false);
          this.photographicRecordModel = response.data;
          this.photographicRecord.next(this.photographicRecordModel);
        },
        (error) => {
          this.loaded.next(false);
        }
      ),
      catchError(Handler.render)
    );
  }

  storePhotographicRecord(
    photographicRecord: PhotographicRecordModel
  ): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}`;
    this.loaded.next(true);
    return this.httpClient.post<ServerResponse>(url, photographicRecord).pipe(
      map((response) => {
        this.messageService.success(response);
        return response;
      })
    );
  }

  updatePhotographicRecord(
    id: any,
    photographicRecord: any
  ): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${id}`;

    this.loaded.next(true);
    return this.httpClient.put<ServerResponse>(url, photographicRecord).pipe(
      map((response) => response),
      tap(
        (response) => {
          this.loaded.next(false);
          const index = this.photographicRecordList.data.findIndex(
            (photographicRecord: PhotographicRecordModel) =>
              photographicRecord.id === response.data.id
          );
          this.photographicRecordList.data[index] = response.data;
          this.photographicRecords.next(this.photographicRecordList);
        },
        (error) => {
          this.loaded.next(false);
        }
      ),
      catchError(Handler.render)
    );
  }

  deletePhotographicRecord(id: number): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${id}`;

    this.loaded.next(true);
    return this.httpClient.delete<ServerResponse>(url).pipe(
      map((response) => response),
      tap(
        (response) => {
          this.loaded.next(false);
          this.photographicRecordList.data =
            this.photographicRecordList.data.filter(
              (photographicRecord: PhotographicRecordModel) =>
                photographicRecord.id !== response.data.id
            );
          this.photographicRecords.next(this.photographicRecordList);
        },
        (error) => {
          this.loaded.next(false);
        }
      ),
      catchError(Handler.render)
    );
  }

  deletePhotographicRecords(
    ids: (number | undefined)[]
  ): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/destroys`;

    this.loaded.next(true);
    return this.httpClient.patch<ServerResponse>(url, { ids }).pipe(
      map((response) => response),
      tap(
        (response) => {
          this.loaded.next(false);
          ids.forEach((photographicRecordId) => {
            this.photographicRecordList.data =
              this.photographicRecordList.data.filter(
                (photographicRecord: PhotographicRecordModel) =>
                  photographicRecord.id !== photographicRecordId
              );
          });
          this.photographicRecords.next(this.photographicRecordList);
        },
        (error) => {
          this.loaded.next(false);
        }
      ),
      catchError(Handler.render)
    );
  }

  selectPhotographicRecord(photographicRecord: PhotographicRecordModel) {
    this.photographicRecord.next(photographicRecord);
  }

  //files

  getFiles(
    recordId: number,
    paginator: any = {},
    filter: string = ''
  ): Observable<ServerResponse> {
    const url = `${environment.API_URL_PRIVATE}/record/${recordId}/file`;
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

  uploadFiles(
    recordId: number,
    data: FormData,
    params = new HttpParams()
  ): Observable<ServerResponse> {
    const url = `${environment.API_URL_PRIVATE}/record/${recordId}/file`;
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

  uploadImageRecord(
    recordId: number,
    data: FormData,
    params = new HttpParams()
  ): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${recordId}/images`;
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
}
