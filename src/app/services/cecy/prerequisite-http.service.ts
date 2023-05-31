import { Injectable } from '@angular/core';
import { PrerequisiteModel } from '@models/cecy';
import { PaginatorModel } from '@models/cecy';
import { environment } from '@env/environment';
import { catchError, map } from 'rxjs/operators';
import { Handler } from '../../exceptions/handler';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ServerResponse } from '@models/cecy/server.response';

@Injectable({
  providedIn: 'root'
})

export class PrerequisiteHttpService {
  private API_URL_PRIVATE: string = `${environment.API_URL_PRIVATE}/courses`;
  private API_URL_PUBLIC: string = `${environment.API_URL_PUBLIC}/courses-guest`;

  private prerequisitesList: ServerResponse = {};
  private prerequisites = new BehaviorSubject<ServerResponse>({});
  public prerequisites$ = this.prerequisites.asObservable();

  private prerequisiteModel: PrerequisiteModel = {};
  private prerequisite = new BehaviorSubject<PrerequisiteModel>({});
  public prerequisite$ = this.prerequisites.asObservable();

  private loaded = new BehaviorSubject<boolean>(true);
  public loaded$ = this.loaded.asObservable();

  private paginator = new BehaviorSubject<PaginatorModel>({ current_page: 1, per_page: 25, total: 0 });
  public paginator$ = this.paginator.asObservable();

  constructor(private httpClient: HttpClient) {

  }

  getPrerequisites(page: number = 1, search: string = '', courseId: number): Observable<ServerResponse> {
    this.loaded.next(true);
    const url = `${this.API_URL_PRIVATE}/${courseId}/prerequisites`;
    let params = new HttpParams().set('sort', 'lastname')
      .append('per_page', '10')
      .append('page', page)
      .append('search', search);

    if (search) {
      // params = params.append('search', search);
    }
    return this.httpClient.get<ServerResponse>(url, { params })
      .pipe(
        map(response => response),
        tap(response => {
          this.prerequisitesList = response as ServerResponse;
          this.prerequisites.next(this.prerequisitesList);
          this.paginator.next(response.meta!);
          this.loaded.next(false);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }

  getPrerequisite(id: number, courseId: number): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${courseId}/prerequisites/${id}`;
    this.loaded.next(true);

    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => response),
        tap(response => {
          this.prerequisiteModel = response.data;
          this.prerequisite.next(this.prerequisiteModel);
          this.loaded.next(false);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }

  storePrerequisite(prerequisites: PrerequisiteModel[], courseId: number): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${courseId}/prerequisites`;
    this.loaded.next(true);
    return this.httpClient.post<ServerResponse>(url, { prerequisites })
      .pipe(
        map(response => response),
        tap(response => {
          this.prerequisitesList.data.push(response.data);
          this.prerequisites.next(this.prerequisitesList);
          this.loaded.next(false);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }

  updatePrerequisite(id: number | undefined, prerequisite: PrerequisiteModel, courseId: number): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${courseId}/prerequisites/${id}`;
    this.loaded.next(true);
    return this.httpClient.put<ServerResponse>(url, prerequisite)
      .pipe(
        map(response => response),
        tap(response => {
          const index = this.prerequisitesList.data.findIndex((prerequisite: PrerequisiteModel) => prerequisite.id === response.data.id);
          this.prerequisitesList.data[index] = response.data;
          this.prerequisites.next(this.prerequisitesList);
          this.loaded.next(false);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }

  destroyPrerequisite(id: number | undefined, courseId: number): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${courseId}/prerequisites/${id}`;
    this.loaded.next(true);
    return this.httpClient.delete<ServerResponse>(url)
      .pipe(
        map(response => response),
        tap(response => {
          this.prerequisitesList.data = this.prerequisitesList.data.filter((prerequisite: PrerequisiteModel) => prerequisite.id !== response.data.id);
          this.prerequisites.next(this.prerequisitesList);
          this.loaded.next(false);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }

  destroysPrerequisites(ids: (number | undefined)[], courseId: number): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${courseId}/prerequisites/destroys`;

    this.loaded.next(true);
    return this.httpClient.patch<ServerResponse>(url, { ids })
      .pipe(
        map(response => response),
        tap(response => {
          ids.forEach(prerequisiteId => {
            this.prerequisitesList.data = this.prerequisitesList.data.filter((prerequisite: PrerequisiteModel) => prerequisite.id !== prerequisiteId);
          })
          this.prerequisites.next(this.prerequisitesList);
          this.loaded.next(false);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }

  selectPrerequisite(prerequisite: PrerequisiteModel) {
    this.prerequisite.next(prerequisite);
  }

  getPrerequisitesPublic(page: number = 1, search: string = '', courseId: number): Observable<ServerResponse> {
    this.loaded.next(true);
    const url = `${this.API_URL_PUBLIC}/${courseId}/prerequisites`;
    let params = new HttpParams().set('sort', 'lastname')
      .append('per_page', '10')
      .append('page', page)
      .append('search', search);

    if (search) {
      // params = params.append('search', search);
    }
    return this.httpClient.get<ServerResponse>(url, { params })
      .pipe(
        map(response => response),
        tap(response => {
          this.prerequisitesList = response as ServerResponse;
          this.prerequisites.next(this.prerequisitesList);
          this.paginator.next(response.meta!);
          this.loaded.next(false);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }
}

