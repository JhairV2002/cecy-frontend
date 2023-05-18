import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '@env/environment';
import { ServerResponse } from '@models/core/server.response';
import { Handler } from '../../exceptions/handler';
import { PaginatorModel, DetailSchoolPeriodModel } from '@models/cecy';

@Injectable({
  providedIn: 'root'
})

export class DetailSchoolPeriodHttpService {
  private API_URL_PRIVATE: string = `${environment.API_URL_PRIVATE}/detail-school-periods`;
  private API_URL_PUBLIC: string = `${environment.API_URL_PUBLIC}/detail-school-periods`;

  private detailSchoolPeriodsList: ServerResponse = {};
  private detailSchoolPeriods = new BehaviorSubject<ServerResponse>({});
  public detailSchoolPeriods$ = this.detailSchoolPeriods.asObservable();

  private detailSchoolPeriodModel: DetailSchoolPeriodModel = {};
  private detailSchoolPeriod = new BehaviorSubject<DetailSchoolPeriodModel>({});
  public detailSchoolPeriod$ = this.detailSchoolPeriod.asObservable();

  private loaded = new BehaviorSubject<boolean>(true);
  public loaded$ = this.loaded.asObservable();

  private paginator = new BehaviorSubject<PaginatorModel>({ current_page: 1, per_page: 15, total: 0 });
  public paginator$ = this.paginator.asObservable();

  constructor(private httpClient: HttpClient) {

  }

  getDetailSchoolPeriods(page: number = 1): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}`;

    const params = new HttpParams()
      .append('page', page);

    this.loaded.next(true);
    return this.httpClient.get<ServerResponse>(url, { params })
      .pipe(
        map(response => response),
        tap(response => {
          this.detailSchoolPeriodsList = response as ServerResponse;
          this.detailSchoolPeriods.next(this.detailSchoolPeriodsList);
          this.loaded.next(false);
          this.paginator.next(response.meta!);
        }),
        catchError(Handler.render)
      );
  }

  getDetailSchoolPeriod(id: number): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${id}`;

    this.loaded.next(true);
    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
          this.detailSchoolPeriodModel = response.data;
          this.detailSchoolPeriod.next(this.detailSchoolPeriodModel);
        }),
        catchError(Handler.render)
      );
  }

  storeDetailSchoolPeriod(user: DetailSchoolPeriodModel): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}`;

    this.loaded.next(true);
    return this.httpClient.post<ServerResponse>(url, user)
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
          this.detailSchoolPeriodsList.data.push(response.data);
          this.detailSchoolPeriods.next(this.detailSchoolPeriodsList);
        }),
        catchError(Handler.render)
      );
  }

  updateDetailSchoolPeriod(id: number, detailSchoolPeriod: DetailSchoolPeriodModel): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${id}`;

    this.loaded.next(true);
    return this.httpClient.put<ServerResponse>(url, detailSchoolPeriod)
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
          const index = this.detailSchoolPeriodsList.data.findIndex((detailSchoolPeriod: DetailSchoolPeriodModel) => detailSchoolPeriod.id === response.data.id);
          this.detailSchoolPeriodsList.data[index] = response.data;
          this.detailSchoolPeriods.next(this.detailSchoolPeriodsList);
        }),
        catchError(Handler.render)
      );
  }

  deleteDetailSchoolPeriod(id: number): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${id}`;

    this.loaded.next(true);
    return this.httpClient.delete<ServerResponse>(url)
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
          this.detailSchoolPeriodsList.data = this.detailSchoolPeriodsList.data.filter((detailSchoolPeriod: DetailSchoolPeriodModel) => detailSchoolPeriod.id !== response.data.id);
          this.detailSchoolPeriods.next(this.detailSchoolPeriodsList);
        }),
        catchError(Handler.render)
      );
  }

  deleteDetailSchoolPeriods(ids: (number | undefined)[]): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/destroys`;

    this.loaded.next(true);
    return this.httpClient.patch<ServerResponse>(url, { ids })
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
          ids.forEach(detailSchoolPeriodId => {
            this.detailSchoolPeriodsList.data = this.detailSchoolPeriodsList.data.filter((detailSchoolPeriod: DetailSchoolPeriodModel) => detailSchoolPeriod.id !== detailSchoolPeriodId);
          })
          this.detailSchoolPeriods.next(this.detailSchoolPeriodsList);
        }),
        catchError(Handler.render)
      );
  }

  selectDetailSchoolPeriod(detailSchoolPeriod: DetailSchoolPeriodModel) {
    this.detailSchoolPeriod.next(detailSchoolPeriod);
  }
}
