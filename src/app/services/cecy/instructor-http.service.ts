import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '@env/environment';
import { ServerResponse } from '@models/core/server.response';
import { Handler } from '../../exceptions/handler';
import { PaginatorModel } from '@models/core';
import { InstructorModel } from '@models/cecy';


@Injectable({
  providedIn: 'root'
})

export class InstructorHttpService {
  private API_URL_PRIVATE: string = `${environment.API_URL_PRIVATE}/instructors`;
  private API_URL_PUBLIC: string = `${environment.API_URL_PUBLIC}/instructors`;

  private instructorsList: ServerResponse = {};
  private instructors = new BehaviorSubject<ServerResponse>({});
  public instructors$ = this.instructors.asObservable();


  private instructorModel: InstructorModel = {};
  private instructor = new BehaviorSubject<InstructorModel>({});
  public instructor$ = this.instructor.asObservable();

  private loaded = new BehaviorSubject<boolean>(true);
  public loaded$ = this.loaded.asObservable();

  private paginator = new BehaviorSubject<PaginatorModel>({ current_page: 1, per_page: 15, total: 0 });
  public paginator$ = this.paginator.asObservable();

  constructor(private httpClient: HttpClient) {

  }

  getInstructors(page: number = 1, search: string = ''): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}`;

    const params = new HttpParams()
      .set('sort', 'name')
      .append('per_page', '10')
      .append('page', page)
      .append('search', search);
    this.loaded.next(true);
    
    return this.httpClient.get<ServerResponse>(url, { params })
      .pipe(
        map(response => response),
        tap(response => {
          this.instructorsList = response as ServerResponse;
          this.instructors.next(this.instructorsList);
          this.loaded.next(false);
          this.paginator.next(response.meta!);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }

  getInstructor(id: number): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${id}`;

    this.loaded.next(true);
    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
          this.instructorModel = response.data;
          this.instructor.next(this.instructorModel);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }

  storeInstructor(instructor: InstructorModel): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/create`;

    this.loaded.next(true);
    return this.httpClient.post<ServerResponse>(url, instructor)
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
          this.instructorsList.data.push(response.data);
          this.instructors.next(this.instructorsList);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }

  updateInstructor(id: number, instructor: InstructorModel): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${id}/state-type`;

    this.loaded.next(true);
    return this.httpClient.put<ServerResponse>(url, instructor)
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
          const index = this.instructorsList.data.findIndex((instructor: InstructorModel) => instructor.id === response.data.id);
          this.instructorsList.data[index] = response.data;
          this.instructors.next(this.instructorsList);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }


  deleteInstructor(id: number): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${id}`;

    this.loaded.next(true);
    return this.httpClient.delete<ServerResponse>(url)
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
          this.instructorsList.data = this.instructorsList.data.filter((instructor: InstructorModel) => instructor.id !== response.data.id);
          this.instructors.next(this.instructorsList);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }

  deleteInstructors(ids: (number | undefined)[]): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/destroys`;

    this.loaded.next(true);
    return this.httpClient.patch<ServerResponse>(url, { ids })
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
          ids.forEach(instructorId => {
            this.instructorsList.data = this.instructorsList.data.filter((instructor: InstructorModel) => instructor.id !== instructorId);
          })
          this.instructors.next(this.instructorsList);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }

  storeInstructors(users: number[]) {
    const url = `${this.API_URL_PRIVATE}/create-instructors`;
    this.loaded.next(true);

    return this.httpClient.post<ServerResponse>(url, { ids: users })
      .pipe(
        tap(response => {
          this.loaded.next(false);
          const index = this.instructorsList.data
            .findIndex(
              (instructor: InstructorModel) => instructor.id === response.data.id);
          this.instructorsList.data[index] = response.data;
          this.instructors.next(this.instructorsList);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }

  getAuthorizedInstructorsOfCourse(id: number) {
    const url = `${this.API_URL_PRIVATE}/courses/${id}`;
    this.loaded.next(true);

    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        tap(response => {
          // this.instructorsList = response as ServerResponse;
          // this.instructors.next(this.instructorsList);
          this.loaded.next(false);
          // this.paginator.next(response.meta!);
        }),
        catchError(Handler.render)
      )
  }
  getInstructorsOfCourse() {
    const url = `${this.API_URL_PRIVATE}`;
    this.loaded.next(true);

    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        tap(response => {
          // this.instructorsList = response as ServerResponse;
          // this.instructors.next(this.instructorsList);
          this.loaded.next(false);
          // this.paginator.next(response.meta!);
        }),
        catchError(Handler.render)
      )
  }

  getAssignedInstructors(id: number) {
    const url = `${this.API_URL_PRIVATE}/detail-planifications/${id}`;
    this.loaded.next(true);

    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        tap(response => {
          // this.instructorsList = response as ServerResponse;
          // this.instructors.next(this.instructorsList);
          this.loaded.next(false);
          // this.paginator.next(response.meta!);
        }),
        catchError(Handler.render)
      )
  }

  getAssignedInstructorsOfProfile(id: number) {
    const url = `${this.API_URL_PRIVATE}/courses/${id}/instructors-assigned`;
    this.loaded.next(true);

    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        tap(response => {
          // this.instructorsList = response as ServerResponse;
          // this.instructors.next(this.instructorsList);
          this.loaded.next(false);
          // this.paginator.next(response.meta!);
        }),
        catchError(Handler.render)
      )
  }

  selectInstructor(instructor: InstructorModel) {
    this.instructor.next(instructor);
  }

  mapInstructors(instructors: InstructorModel[]) {
    return instructors.map(instructor => instructor.id);
  }
}
