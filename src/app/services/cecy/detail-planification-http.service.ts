import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '@env/environment';
import { ServerResponse } from '@models/core/server.response';
import { Handler } from '../../exceptions/handler';
import { DetailPlanificationModel } from '@models/cecy';

@Injectable({
  providedIn: 'root',
})
export class DetailPlanificationHttpService {
  private API_URL_PRIVATE: string = `${environment.API_URL_PRIVATE}/detail-planifications`;
  private API_URL_PUBLIC: string = `${environment.API_URL_PUBLIC}/detail-planifications`;

  private detailPlanificationsList: ServerResponse = {};
  private detailPlanifications = new BehaviorSubject<ServerResponse>({});
  public detailPlanifications$ = this.detailPlanifications.asObservable();

  private detailPlanificationModel: DetailPlanificationModel = {};
  private detailPlanification = new BehaviorSubject<DetailPlanificationModel>(
    {}
  );
  public detailPlanification$ = this.detailPlanification.asObservable();

  private participantsList: ServerResponse = {};
  private participants = new BehaviorSubject<ServerResponse>({});
  public participants$ = this.participants.asObservable();

  private participantModel: DetailPlanificationModel = {};
  private participant = new BehaviorSubject<DetailPlanificationModel>({});
  public participant$ = this.participant.asObservable();

  private loaded = new BehaviorSubject<boolean>(true);
  public loaded$ = this.loaded.asObservable();

  private paginator = new BehaviorSubject<any>({
    current_page: 1,
    per_page: 25,
    total: 0,
  });
  public paginator$ = this.paginator.asObservable();

  constructor(private httpClient: HttpClient) {}

  //  Route::get('/detail-course/{course}', [DetailPlanificationController::class, 'getDetailPlanificationsByCourse']);

  getDetailPlanificationsByCourse(
    page: number = 1,
    search: string = '',
    id: number
  ): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/detail-course/${id}`;
    this.loaded.next(true);

    let params = new HttpParams()
      .set('sort', 'lastname')
      .append('per_page', '10')
      .append('page', page)
      .append('search', search);

    return this.httpClient.get<ServerResponse>(url, { params }).pipe(
      map((response) => response),
      tap((response) => {
        this.detailPlanificationsList = response as ServerResponse;
        this.detailPlanifications.next(this.detailPlanificationsList);
        this.loaded.next(false);
        this.paginator.next(response.meta!);
      }),
      catchError(Handler.render)
    );
  }

  //Route::get('responsible', [DetailPlanificationController::class, 'getDetailPlanificationsByResponsibleCourse']);

  getDetailPlanificationsByResponsibleCourse(
    page: number = 1,
    search: string = ''
  ): Observable<ServerResponse> {
    this.loaded.next(true);
    const url = `${this.API_URL_PRIVATE}/responsible`;
    let params = new HttpParams()
      .set('sort', 'lastname')
      .append('per_page', '10')
      .append('page', page)
      .append('search', search);
    return this.httpClient.get<ServerResponse>(url).pipe(
      map((response) => response),
      tap((response) => {
        this.detailPlanificationsList = response.data;
        this.detailPlanifications.next(this.detailPlanificationsList);
        this.loaded.next(false);
        this.paginator.next(response.meta!);
      }),
      catchError(Handler.render)
    );
  }

  //Route::get('', [DetailPlanificationController::class, 'getDetailPlanificationsByPlanification']);

  //  Route::post('', [DetailPlanificationController::class, 'registerDetailPlanification']);

  storeDetailPlanification(
    detailPlanification: DetailPlanificationModel
  ): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}`;
    this.loaded.next(true);

    return this.httpClient.post<ServerResponse>(url, detailPlanification).pipe(
      map((response) => response),
      tap({
        next: (response) => {
          this.loaded.next(false);
          // this.detailPlanificationsList.data.push(response.data);
          // this.detailPlanifications.next(this.detailPlanificationsList);
          // console.log('ok')
        },
        error: (e) => {
          this.loaded.next(false);
          // console.log('por q?')
        },
      }),
      catchError(Handler.render)
    );
  }

  // Route::get('', [DetailPlanificationController::class, 'showDetailPlanification']);

  showDetailPlanification(id: number): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${id}`;
    this.loaded.next(true);

    return this.httpClient.get<ServerResponse>(url).pipe(
      map((response) => response),
      tap((response) => {
        this.loaded.next(false);
        this.detailPlanificationModel = response.data;
        this.detailPlanification.next(this.detailPlanificationModel);
      }),
      catchError(Handler.render)
    );
  }

  // Route::put('', [DetailPlanificationController::class, 'updateDetailPlanification']);

  updateDetailPlanification(
    id: number,
    detailPlanification: DetailPlanificationModel
  ): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${id}`;
    this.loaded.next(true);

    return this.httpClient.put<ServerResponse>(url, detailPlanification).pipe(
      map((response) => response),
      tap(
        (response) => {
          this.loaded.next(false);
          // const index = this.detailPlanificationsList.data.findIndex((detailPlanification: DetailPlanificationModel) => {
          //   return detailPlanification.id === response.data.id
          // });
          // this.detailPlanificationsList.data[index] = response.data;
          // this.detailPlanifications.next(this.detailPlanificationsList);
        },
        (e) => {
          this.loaded.next(false);
        }
      ),
      catchError(Handler.render)
    );
  }

  // Route::put('/cecy', [DetailPlanificationController::class, 'updatedetailPlanificationByCecy']);

  updatedetailPlanificationByCecy(
    id: number | undefined,
    detailPlanification: DetailPlanificationModel
  ): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/cecy/${id}`;
    this.loaded.next(true);

    return this.httpClient.put<ServerResponse>(url, detailPlanification).pipe(
      map((response) => response),
      tap((response) => {
        this.loaded.next(false);
        const index = this.detailPlanificationsList.data.findIndex(
          (detailPlanification: DetailPlanificationModel) =>
            detailPlanification.id === response.data.id
        );
        this.detailPlanificationsList.data[index] = response.data;
        this.detailPlanifications.next(this.detailPlanificationsList);
      }),
      catchError(Handler.render)
    );
  }

  // Route::delete('', [DetailPlanificationController::class, 'deleteDetailPlanification']);

  deleteDetailPlanification(id: number): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${id}`;
    this.loaded.next(true);

    return this.httpClient.delete<ServerResponse>(url).pipe(
      map((response) => response),
      tap(
        (response) => {
          this.loaded.next(false);
          this.detailPlanifications.next(this.detailPlanificationsList);
        },
        (e) => this.loaded.next(false)
      ),
      catchError(Handler.render)
    );
  }

  // Route::patch('', [DetailPlanificationController::class, 'destroysDetailPlanifications']);

  destroysDetailPlanifications(
    ids: (number | undefined)[]
  ): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/destroys`;
    this.loaded.next(true);

    return this.httpClient.patch<ServerResponse>(url, { ids }).pipe(
      map((response) => response),
      tap({
        next: (reponse) => {
          this.loaded.next(false);
          // ids.forEach(detailPlanificationId => {
          //   this.detailPlanificationsList.data = this.detailPlanificationsList.data.filter((detailPlanification: DetailPlanificationModel) => detailPlanification.id != detailPlanificationId);
          // })
          // this.detailPlanifications.next(this.detailPlanificationsList);
        },
        error: (e) => this.loaded.next(false),
      }),
      catchError(Handler.render)
    );
  }

  getInstructorByCourses(
    page: number = 1,
    search: string = ''
  ): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/instructor-courses`;

    const params = new HttpParams()
      .append('per_page', '10')
      .append('page', page)
      .append('search', search);

    this.loaded.next(true);
    return this.httpClient.get<ServerResponse>(url, { params }).pipe(
      map((response) => response),
      tap(
        (response) => {
          this.detailPlanificationsList = response as ServerResponse;
          this.detailPlanifications.next(this.detailPlanificationsList);
          this.loaded.next(false);
          this.paginator.next(response.meta!);
        },
        (error) => {
          this.loaded.next(false);
        }
      ),
      catchError(Handler.render)
    );
  }

  assignInstructorToDetailPlanification(
    id: number,
    instructorsIds: (number | undefined)[]
  ) {
    const url = `${this.API_URL_PRIVATE}/${id}/instructors-assignment`;
    this.loaded.next(true);

    return this.httpClient
      .post<ServerResponse>(url, { ids: instructorsIds })
      .pipe(
        tap(
          (response) => {
            this.loaded.next(false);
          },
          (error) => {
            this.loaded.next(false);
          }
        ),
        catchError(Handler.render)
      );
  }

  assignInstructors(id: number, instructorsIds: (number | undefined)[]) {
    const url = `${this.API_URL_PRIVATE}/${id}/instructors-assignment`;
    this.loaded.next(true);

    return this.httpClient
      .post<ServerResponse>(url, { ids: instructorsIds })
      .pipe(
        tap(
          (response) => {
            this.loaded.next(false);
          },
          (error) => {
            this.loaded.next(false);
          }
        ),
        catchError(Handler.render)
      );
  }

  selectDetailPlanification(detailPlanification: DetailPlanificationModel) {
    this.detailPlanification.next(detailPlanification);
  }

  getFiles(
    userId: number,
    paginator: any = {},
    filter: string = ''
  ): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/catalogue/${userId}/file`;
    let params = new HttpParams()
      .set('page', paginator.current_page!)
      .set('per_page', paginator.per_page!);
    // El filtro depende de los campos propios que sean cadenas de texto
    if (filter !== '') {
      params = params.append('name', filter).append('description', filter);
    }
    return this.httpClient.get<ServerResponse>(url, { params }).pipe(
      map((response) => response),
      catchError(Handler.render)
    );
  }

  uploadFiles(
    userId: number,
    data: FormData,
    params = new HttpParams()
  ): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/catalogue/${userId}/file`;
    const headers = new HttpHeaders().set(
      'Content-Type',
      'multipart/form-data'
    );
    return this.httpClient
      .post<ServerResponse>(url, data, { params, headers })
      .pipe(
        map((response) => response),
        catchError(Handler.render)
      );
  }

  // DDRC-C:metodo para obtener la lista de participantes dado el detalle de planificacion
  getParticipantsByDetailPlanification(
    detailPlanificationID: number,
    page: number = 1,
    search: string = ''
  ): Observable<ServerResponse> {
    const params = new HttpParams()
      .set('sort', 'username') //optional
      .append('per_page', '10') //optional
      .append('page', page) // conditional
      .append('search', search); // conditional

    const url = `${this.API_URL_PRIVATE}/${detailPlanificationID}/participants`;
    this.loaded.next(true);

    return this.httpClient.get<ServerResponse>(url, { params }).pipe(
      map((response) => response),
      tap((response) => {
        this.participantsList = response as ServerResponse;
        this.participants.next(this.participantsList);
        this.loaded.next(false);
        this.paginator.next(response.meta!);
      }),
      catchError(Handler.render)
    );
  }
}
