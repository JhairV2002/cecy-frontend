import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '@env/environment';
import { ServerResponse } from '@models/core/server.response';
import { Handler } from '../../exceptions/handler';
import { PaginatorModel, UserModel } from '@models/core';
import { CatalogueModel, CourseModel, CourseProfileModel, PlanificationModel } from '@models/cecy';

@Injectable({
  providedIn: 'root'
})

export class courseProfileHttpService {
  private API_URL_PRIVATE: string = `${environment.API_URL_PRIVATE}`;
  private API_URL_PUBLIC: string = `${environment.API_URL_PUBLIC}`;


  private courseProfileList: ServerResponse = {};
  private courseProfiles = new BehaviorSubject<ServerResponse>({});
  public courseProfiles$ = this.courseProfiles.asObservable();

  private courseProfileModel: CourseProfileModel = {};
  private courseProfile = new BehaviorSubject<CourseProfileModel>({});
  public courseProfile$ = this.courseProfile.asObservable()

  private loaded = new BehaviorSubject<boolean>(true);
  public loaded$ = this.loaded.asObservable();

  private paginator = new BehaviorSubject<PaginatorModel>({ current_page: 1, per_page: 25, total: 0 });
  public paginator$ = this.paginator.asObservable();

  constructor(private httpClient: HttpClient) {

  }

  //Básicos
  getCourseProfile(id: number): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/course-profiles/${id}`;
    this.loaded.next(true);
    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => response),
        tap(response => {
          this.courseProfileList = response as ServerResponse;
          this.courseProfiles.next(this.courseProfileList);
          this.loaded.next(false);
          this.paginator.next(response.meta!);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }
  updateCourseProfile(id: number,profile:CourseProfileModel): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/course-profiles/${id}`;
    this.loaded.next(true);
    return this.httpClient.put<ServerResponse>(url,profile)
      .pipe(
        map(response => response),
        tap(response => {
          this.courseProfileList = response as ServerResponse;
          this.courseProfiles.next(this.courseProfileList);
          this.loaded.next(false);
          this.paginator.next(response.meta!);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }
  deleteCourseProfile(id: number): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/course-profiles/${id}`;
    this.loaded.next(true);
    return this.httpClient.delete<ServerResponse>(url)
      .pipe(
        map(response => response),
        tap(response => {
          this.courseProfileList = response as ServerResponse;
          this.courseProfiles.next(this.courseProfileList);
          this.loaded.next(false);
          this.paginator.next(response.meta!);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }

  storeCourseProfile(type: any): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/course-profiles`;

    const params = new HttpParams()
      .append('type', type)

    this.loaded.next(true);
    return this.httpClient.post<ServerResponse>(url,type )
      .pipe(
        map(response => response),
        tap(response => {
          //this.courseProfileModel = response as ServerResponse;
          //this.courseProfile.next(this.courseProfileModel);
          this.loaded.next(false);
          this.paginator.next(response.meta!);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }


}

