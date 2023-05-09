import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '@env/environment';
import { ServerResponse } from '@models/core/server.response';
import { Handler } from '../../exceptions/handler';
import { PaginatorModel } from '@models/core';
import {RequirementModel, SchoolPeriodModel} from "@models/cecy";

@Injectable({
  providedIn: 'root'
})

export class RequirementHttpService {
  private API_URL_PRIVATE: string = `${environment.API_URL_PRIVATE}/requirements`;
  private API_URL_PUBLIC: string = `${environment.API_URL_PUBLIC}/requirements`;


  private requirementsList: ServerResponse = {};
  private requirements = new BehaviorSubject<ServerResponse>({});
  public requirements$ = this.requirements.asObservable();

  private requirementModel: RequirementModel = {};
  private requirement = new BehaviorSubject<RequirementModel>({});
  public requirement$ = this.requirement.asObservable();

  private loaded = new BehaviorSubject<boolean>(true);
  public loaded$ = this.loaded.asObservable();

  private paginator = new BehaviorSubject<PaginatorModel>({ current_page: 1, per_page: 15, total: 0 });
  public paginator$ = this.paginator.asObservable();

  constructor(private httpClient: HttpClient) {

  }

  getRequirements(page: number = 1, search: string = ''): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}`;

    const params = new HttpParams()
      .set('sort', 'code')
      .append('page', page)
      .append('search', search);
    this.loaded.next(true);
    return this.httpClient.get<ServerResponse>(url, { params })
      .pipe(
        map(response => response),
        tap(response => {
          this.requirementsList = response as ServerResponse;
          this.requirements.next(this.requirementsList);
          this.loaded.next(false);
          this.paginator.next(response.meta!);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }

  getRequirement(id: number): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${id}`;

    this.loaded.next(true);
    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
          this.requirementModel = response.data;
          this.requirement.next(this.requirementModel);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }

  storeRequirement(requirement: RequirementModel): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}`;
    this.loaded.next(true);
    return this.httpClient.post<ServerResponse>(url, requirement)
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
          this.requirementsList.data.push(response.data);
          this.requirements.next(this.requirementsList);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }

  updateRequirement(id: number, requirement: RequirementModel): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${id}`;
    this.loaded.next(true);
    return this.httpClient.put<ServerResponse>(url, requirement)
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
          const index = this.requirementsList.data.findIndex((requirement: RequirementModel) => requirement.id === response.data.id);
          this.requirementsList.data[index] = response.data;
          this.requirements.next(this.requirementsList);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }

  deleteRequirement(id: number): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${id}`;

    this.loaded.next(true);
    return this.httpClient.delete<ServerResponse>(url)
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
          this.requirementsList.data = this.requirementsList.data.filter((requirement: RequirementModel) => requirement.id !== response.data.id);
          this.requirements.next(this.requirementsList);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }

  deleteRequirements(ids: (number | undefined)[]): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/destroys`;

    this.loaded.next(true);
    return this.httpClient.patch<ServerResponse>(url, { ids })
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
          ids.forEach(requirementId => {
            this.requirementsList.data = this.requirementsList.data.filter((requirement: RequirementModel) => requirement.id !== requirementId);
          })
          this.requirements.next(this.requirementsList);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }

  selectRequirement(requirement: RequirementModel) {
    this.requirement.next(requirement);
  }
}
