import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '@env/environment';
import {ServerResponse} from '@models/core/server.response';
import {Handler} from '../../exceptions/handler';
import {CatalogueModel, DetailAttendanceModel} from '@models/cecy';
import {MessageService} from "@services/core";

@Injectable({
  providedIn: 'root'
})

export class DetailAttendanceHttpService {
  private API_URL_PRIVATE: string = `${environment.API_URL_PRIVATE}/detail-attendances`;
  private API_URL_PUBLIC: string = `${environment.API_URL_PUBLIC}/detail-attendances`;
  private detailAttendancesList: ServerResponse = {};
  private detailAttendances = new BehaviorSubject<ServerResponse>({});
  public detailAttendances$ = this.detailAttendances.asObservable();
  private detailAttendanceModel: DetailAttendanceModel = {};
  private detailAttendance = new BehaviorSubject<DetailAttendanceModel>({});
  public detailAttendance$ = this.detailAttendance.asObservable();

  private loaded = new BehaviorSubject<boolean>(true);
  public loaded$ = this.loaded.asObservable();


  private paginator = new BehaviorSubject<any>({current_page: 1, per_page: 25, total: 0});
  public paginator$ = this.paginator.asObservable();

  constructor(private httpClient: HttpClient,   private messageService: MessageService,) {

  }

  getAttendances(page: number = 1, search: string = ''): Observable<ServerResponse> {
    this.loaded.next(true);
    const url = this.API_URL_PRIVATE;
    let params = new HttpParams().set('sort', 'lastname')
      .append('per_page', '10')
      .append('page', page)
      .append('search', search);

    if (search) {
      // params = params.append('search', search);
    }
    return this.httpClient.get<ServerResponse>(url, {params})
      .pipe(
        map(response => response),
        tap(response => {
          this.detailAttendancesList = response as ServerResponse;
          this.detailAttendances.next(this.detailAttendancesList);
          this.loaded.next(false);
          this.paginator.next(response.meta!);
        }),
        catchError(Handler.render)
      );
  }

  getAttendance(id: number): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${id}`;
    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => response),
        tap(response => {
          this.detailAttendanceModel = response.data;
          this.detailAttendance.next(this.detailAttendanceModel);
        }),
        catchError(Handler.render)
      );
  }

  changeState(id: number | undefined, type: CatalogueModel): Observable<DetailAttendanceModel> {
    const url = `${this.API_URL_PRIVATE}/${id}/types/${type.id}`;
    return this.httpClient.patch<ServerResponse>(url, null)
      .pipe(
        map(response => {
          this.messageService.success(response);
       return response.data}),
      );
  }

  getDetailAttendancesByParticipant(page: number = 1, detailPlanificationId: number | undefined): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${detailPlanificationId}`;
    const params = new HttpParams()
      .append('per_page', '7')
      .append('page', page)

    this.loaded.next(true);
    return this.httpClient.get<ServerResponse>(url, {params})
      .pipe(
        map(response => response),
        tap(response => {
          this.detailAttendancesList = response as ServerResponse;
          this.detailAttendances.next(this.detailAttendancesList);
          this.loaded.next(false);
          this.paginator.next(response.meta!);
        }),
        catchError(Handler.render)
      );
  }

  updateType(detailAttendance: number, data: any): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${detailAttendance}/type`;

    console.log(data);
    console.log(detailAttendance);
    this.loaded.next(true);
    return this.httpClient.patch<ServerResponse>(url, data)
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }

  getCurrentDateDetailAttendance(detailPlanificationId: number | undefined): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${detailPlanificationId}/current-date`;

    this.loaded.next(true);
    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => response),
        tap(response => {
          this.detailAttendanceModel = response.data;
          this.detailAttendance.next(this.detailAttendanceModel);
        }),
        catchError(Handler.render)
      );
  }

  getByRegistration(detailPlanificationId: number | undefined): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${detailPlanificationId}/no-paginate`;

    this.loaded.next(true);
    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => response),
        tap(response => {
        }),
        catchError(Handler.render)
      );
  }

  getFiles(detailPlanificationId: number, paginator: any = {}, filter: string = ''): Observable<ServerResponse> {
    const url = `${environment.API_URL_PRIVATE}/detailPlanification/${detailPlanificationId}/file`;
    let params = new HttpParams()
      .set('page', paginator.current_page!)
      .set('per_page', paginator.per_page!);
    // El filtro depende de los campos propios que sean cadenas de texto
    if (filter !== '') {
      params = params.append('name', filter).append('description', filter);
    }
    return this.httpClient.get<ServerResponse>(url, { params })
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }

  uploadFiles(detailPlanificationId: number, data: FormData, params = new HttpParams()): Observable<ServerResponse> {
    const url = `${environment.API_URL_PRIVATE}/detailPlanification/${detailPlanificationId}/file`;
    const headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');
    return this.httpClient.post<ServerResponse>(url, data, { params, headers })
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }

}
