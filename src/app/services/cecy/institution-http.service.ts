import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '@env/environment';
import {ServerResponse} from '@models/core/server.response';
import {Handler} from '../../exceptions/handler';
import {PaginatorModel} from '@models/core';
import {InstitutionModel} from '@models/cecy';


@Injectable({
  providedIn: 'root'
})

export class InstitutionHttpService {
  private API_URL_PRIVATE: string = `${environment.API_URL_PRIVATE}/institutions`;
  private API_URL_PUBLIC: string = `${environment.API_URL_PUBLIC}/institutions`;

  private institutionsList: ServerResponse = {};
  private institutions = new BehaviorSubject<ServerResponse>({});
  public institutions$ = this.institutions.asObservable();


  private institutionModel: InstitutionModel = {};
  private institution = new BehaviorSubject<InstitutionModel>({});

  private loaded = new BehaviorSubject<boolean>(true);
  public loaded$ = this.loaded.asObservable();

  private paginator = new BehaviorSubject<PaginatorModel>({current_page: 1, per_page: 15, total: 0});
  public paginator$ = this.paginator.asObservable();

  constructor(private httpClient: HttpClient) {

  }

  getInstitutions(page: number = 1, search: string = ''): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}`;

    const params = new HttpParams()
      .set('sort', 'name') //optional
      .append('per_page', '10') //optional
      .append('page', page) // conditional
      .append('search', search); // conditional

    this.loaded.next(true);
    return this.httpClient.get<ServerResponse>(url, {params})
      .pipe(
        map(response => response),
        tap(response => {
          this.institutionsList = response as ServerResponse;
          this.institutions.next(this.institutionsList);
          this.loaded.next(false);
          this.paginator.next(response.meta!);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }

  getInstitution(id: number): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${id}`;

    this.loaded.next(true);
    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
          this.institutionModel = response.data;
          this.institution.next(this.institutionModel);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }

  storeInstitution(institution: InstitutionModel): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}`;

    this.loaded.next(true);
    return this.httpClient.post<ServerResponse>(url, institution)
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
          this.institutionsList.data.push(response.data);
          this.institutions.next(this.institutionsList);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }

  updateInstitution(id: number, institution: InstitutionModel): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${id}`;

    this.loaded.next(true);
    return this.httpClient.put<ServerResponse>(url, institution)
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
          const index = this.institutionsList.data.findIndex((institution: InstitutionModel) => institution.id === response.data.id);
          this.institutionsList.data[index] = response.data;
          this.institutions.next(this.institutionsList);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }

  deleteInstitution(id: number): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${id}`;

    this.loaded.next(true);
    return this.httpClient.delete<ServerResponse>(url)
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
          this.institutionsList.data = this.institutionsList.data.filter((institution: InstitutionModel) => institution.id !== response.data.id);
          this.institutions.next(this.institutionsList);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }

  deleteInstitutions(ids: (number | undefined)[]): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/destroys`;

    this.loaded.next(true);
    return this.httpClient.patch<ServerResponse>(url, {ids})
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
          ids.forEach(institutionId => {
            this.institutionsList.data = this.institutionsList.data.filter((institution: InstitutionModel) => institution.id !== institutionId);
          })
          this.institutions.next(this.institutionsList);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }
}
