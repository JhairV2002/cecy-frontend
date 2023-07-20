import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '@env/environment';
import { Handler } from '../../exceptions/handler';
import { PaginatorModel } from '@models/core';
import { CatalogueModel, CourseModel, CourseProfileModel, PlanificationModel } from '@models/cecy';

@Injectable({
  providedIn: 'root'
})

export class courseProfileHttpService {
  private API_URL_PRIVATE: string = `${environment.API_URL_PRIVATE}`;
  private API_URL_PUBLIC: string = `${environment.API_URL_PUBLIC}`;


  private courseProfileList: any = {};
  private courseProfiles = new BehaviorSubject<any>({});
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
  getCourseProfile(id: number): Observable<any> {
    const url = `${this.API_URL_PRIVATE}/course-profiles/${id}`;
    this.loaded.next(true);
    return this.httpClient.get<any>(url)
      .pipe(
        map(response => response),
        tap(response => {
          this.courseProfileList = response as any;
          this.courseProfiles.next(this.courseProfileList);
          this.loaded.next(false);
          this.paginator.next(response.meta!);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }
  updateCourseProfile(id: number,profile:CourseProfileModel): Observable<any> {
    const url = `${this.API_URL_PRIVATE}/course-profiles/${id}`;
    this.loaded.next(true);
    return this.httpClient.put<any>(url,profile)
      .pipe(
        map(response => response),
        tap(response => {
          this.courseProfileList = response as any;
          this.courseProfiles.next(this.courseProfileList);
          this.loaded.next(false);
          this.paginator.next(response.meta!);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }
  deleteCourseProfile(id: number): Observable<any> {
    const url = `${this.API_URL_PRIVATE}/course-profiles/${id}`;
    this.loaded.next(true);
    return this.httpClient.delete<any>(url)
      .pipe(
        map(response => response),
        tap(response => {
          this.courseProfileList = response as any;
          this.courseProfiles.next(this.courseProfileList);
          this.loaded.next(false);
          this.paginator.next(response.meta!);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }

  storeCourseProfile(type: any): Observable<any> {
    const url = `${this.API_URL_PRIVATE}/course-profiles`;

    const params = new HttpParams()
      .append('type', type)

    this.loaded.next(true);
    return this.httpClient.post<any>(url,type )
      .pipe(
        map(response => response),
        tap(response => {
          //this.courseProfileModel = response as any;
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

