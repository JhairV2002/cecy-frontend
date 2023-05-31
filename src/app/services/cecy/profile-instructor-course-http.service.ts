import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '@env/environment';
import { ServerResponse } from '@models/core/server.response';
import { Handler } from '../../exceptions/handler';
import { PaginatorModel } from '@models/core';
import { CourseProfileModel } from '@models/cecy';


@Injectable({
  providedIn: 'root'
})

export class ProfileInstructorCourseHttpService {
  private API_URL_PRIVATE: string = `${environment.API_URL_PRIVATE}/profileInstructorCourses`;
  private API_URL_PUBLIC: string = `${environment.API_URL_PUBLIC}/profileInstructorCourses`;

  private profileInstructorCourseList: ServerResponse = {};
  private profileInstructorCourses = new BehaviorSubject<ServerResponse>({});
  public profileInstructorCourses$ = this.profileInstructorCourses.asObservable();


  private profileInstructorCourseModel: CourseProfileModel = {};
  private profileInstructorCourse = new BehaviorSubject<CourseProfileModel>({});

  private loaded = new BehaviorSubject<boolean>(true);
  public loaded$ = this.loaded.asObservable();

  private paginator = new BehaviorSubject<PaginatorModel>({ current_page: 1, per_page: 15, total: 0 });
  public paginator$ = this.paginator.asObservable();

  constructor(private httpClient: HttpClient) {

  }

  getProfileInstructorCourses(page: number = 1, search: string = ''): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/profileInstructorCourses`;

    const params = new HttpParams()
      .set('sort', 'name') //optional
      .append('per_page', '10') //optional
      .append('page', page) // conditional
      .append('search', search); // conditional

    this.loaded.next(true);
    return this.httpClient.get<ServerResponse>(url, { params })
      .pipe(
        map(response => response),
        tap(response => {
          this.profileInstructorCourseList = response as ServerResponse;
          this.profileInstructorCourses.next(this.profileInstructorCourseList);
          this.loaded.next(false);
          this.paginator.next(response.meta!);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }

  getProfileInstructorCourse(id: number): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/profileInstructorCourses/${id}`;

    this.loaded.next(true);
    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
          this.profileInstructorCourseModel = response.data;
          this.profileInstructorCourse.next(this.profileInstructorCourseModel);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }

  storeProfileInstructorCourse(profileInstructorCourse: CourseProfileModel): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/profileInstructorCourses`;

    this.loaded.next(true);
    return this.httpClient.post<ServerResponse>(url, profileInstructorCourse)
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
          this.profileInstructorCourseList.data.push(response.data);
          this.profileInstructorCourses.next(this.profileInstructorCourseList);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }

  updateProfileInstructorCourse(id: number, profileInstructorCourse: CourseProfileModel): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/profileInstructorCourse/${id}`;

    this.loaded.next(true);
    return this.httpClient.put<ServerResponse>(url, profileInstructorCourse)
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
          const index = this.profileInstructorCourseList.data.findIndex((profileInstructorCourse: CourseProfileModel) => profileInstructorCourse.id === response.data.id);
          this.profileInstructorCourseList.data[index] = response.data;
          this.profileInstructorCourses.next(this.profileInstructorCourseList);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }

  deleteProfileInstructorCourse(id: number): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/profileInstructorCourse/${id}`;

    this.loaded.next(true);
    return this.httpClient.delete<ServerResponse>(url)
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
          this.profileInstructorCourseList.data = this.profileInstructorCourseList.data.filter((profileInstructorCourse: CourseProfileModel) => profileInstructorCourse.id !== response.data.id);
          this.profileInstructorCourses.next(this.profileInstructorCourseList);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }

  deleteProfileInstructorCourses(ids: (number | undefined)[]): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/profileInstructorCourse/destroys`;

    this.loaded.next(true);
    return this.httpClient.patch<ServerResponse>(url, { ids })
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
          ids.forEach(profileInstructorCourseId => {
            this.profileInstructorCourseList.data = this.profileInstructorCourseList.data.filter((profileInstructorCourse: CourseProfileModel) => profileInstructorCourse.id !== profileInstructorCourseId);
          })
          this.profileInstructorCourses.next(this.profileInstructorCourseList);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }

  selectProfileInstructorCourse(profileInstructorCourse: CourseProfileModel) {
    this.profileInstructorCourse.next(profileInstructorCourse);
  }

  assignInstructors(courseId: number, instructorsIds: (number | undefined)[]) {
    const url = `${environment.API_URL_PRIVATE}/courses/${courseId}/profile-instructors-assignment`;
    this.loaded.next(true);

    return this.httpClient.post<ServerResponse>(url, { ids: instructorsIds })
      .pipe(
        tap(response => {
          this.loaded.next(false);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      )
  }
}
