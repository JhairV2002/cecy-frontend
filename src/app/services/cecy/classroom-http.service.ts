import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '@env/environment';
import { ServerResponse } from '@models/core/server.response';
import { Handler } from '../../exceptions/handler';
import { ClassroomModel } from '@models/cecy';

@Injectable({
  providedIn: 'root'
})

export class ClassroomHttpService {
  private API_URL_PRIVATE: string = `${environment.API_URL_PRIVATE}/classrooms`;
  private API_URL_PUBLIC: string = `${environment.API_URL_PUBLIC}/classrooms`;

  private classroomsList: ServerResponse = {};
  private classrooms = new BehaviorSubject<ServerResponse>({});
  public classrooms$ = this.classrooms.asObservable();

  private classroomModel: ClassroomModel = {};
  private classroom = new BehaviorSubject<ClassroomModel>({});
  public classroom$ = this.classroom.asObservable();

  private loaded = new BehaviorSubject<boolean>(true);
  public loaded$ = this.loaded.asObservable();

  private paginator = new BehaviorSubject<any>({ current_page: 1, per_page: 25, total: 0 });
  public paginator$ = this.paginator.asObservable();

  constructor(private httpClient: HttpClient) {

  }

  getClassrooms(page: number = 1, search: string = ''): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}`;

    let params = new HttpParams()
      .set('sort', 'code')
      .append('per_page', '10')
      .append('page', page)
      .append('search', search);


    this.loaded.next(true);
    return this.httpClient.get<ServerResponse>(url, { params })
      .pipe(
        map(response => response),
        tap(response => {
          this.classroomsList = response as ServerResponse;
          this.classrooms.next(this.classroomsList);
          this.loaded.next(false);
          this.paginator.next(response.meta!);
        }),
        catchError(Handler.render)
      );
  }

  getClassroom(id: number): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${id}`;

    this.loaded.next(true);
    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => response),
        tap(response => {
          this.classroomModel = response.data;
          this.classroom.next(this.classroomModel);
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }

  storeClassroom(classroom: ClassroomModel): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}`;

    this.loaded.next(true);
    return this.httpClient.post<ServerResponse>(url, classroom)
      .pipe(
        map(response => response),
        tap(response => {
          this.classroomsList.data.push(response.data);
          this.classrooms.next(this.classroomsList);
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }

  updateClassroom(id: number | undefined, classroom: ClassroomModel): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${id}`;

    this.loaded.next(true);
    return this.httpClient.put<ServerResponse>(url, classroom)
      .pipe(
        map(response => response),
        tap(response => {
          const index = this.classroomsList.data.findIndex((classroom: ClassroomModel) => classroom.id === response.data.id);
          this.classroomsList.data[index] = response.data;
          this.classrooms.next(this.classroomsList);
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }

  deleteClassroom(id: number | undefined): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${id}`;

    this.loaded.next(true);
    return this.httpClient.delete<ServerResponse>(url)
      .pipe(
        map(response => response),
        tap(response => {
          this.classroomsList.data = this.classroomsList.data.filter((classroom: ClassroomModel) => classroom.id !== response.data.id);
          this.classrooms.next(this.classroomsList);
          this.loaded.next(false);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }

  deleteClassrooms(ids: (number | undefined)[]): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/destroys`;

    this.loaded.next(true);
    return this.httpClient.patch<ServerResponse>(url, { ids })
      .pipe(
        map(response => response),
        tap(response => {
          ids.forEach(classroomId => {
            this.classroomsList.data = this.classroomsList.data.filter((classroom: ClassroomModel) => classroom.id !== classroomId);
          })
          this.classrooms.next(this.classroomsList);
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }

  catalogue(search: string = '') {
    const url = `${this.API_URL_PRIVATE}/catalogue`;

    let params = new HttpParams()
      // .set('sort', 'code')
      .append('search', search);

    return this.httpClient.get<ServerResponse>(url, { params })
      .pipe(
        map(response => response),
        tap(response => {
        }),
        catchError(Handler.render)
      );
  }

  selectClassroom(classroom: ClassroomModel) {
    this.classroom.next(classroom);
  }
}

