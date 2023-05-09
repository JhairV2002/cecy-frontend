import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '@env/environment';
import { ServerResponse } from '@models/core/server.response';
import { Handler } from '../../exceptions/handler';
import { PaginatorModel } from '@models/core';
import { PlanificationModel } from "@models/cecy/planification.model";
import { AuthService } from '@services/core';

@Injectable({
  providedIn: 'root'
})

export class PlanificationHttpService {

  private API_URL_PRIVATE: string = `${environment.API_URL_PRIVATE}/planifications`;
  private API_URL_PUBLIC: string = `${environment.API_URL_PUBLIC}/planifications`;
  private API_URL_PRIVATE_PDF: string = `${environment.API_URL_PRIVATE}`;


  private planificationsList: ServerResponse = {};
  private planifications = new BehaviorSubject<ServerResponse>({});
  public planifications$ = this.planifications.asObservable();

  private planificationModel: PlanificationModel = {};
  private planification = new BehaviorSubject<PlanificationModel>({});
  public planification$ = this.planification.asObservable();

  private loaded = new BehaviorSubject<boolean>(true);
  public loaded$ = this.loaded.asObservable();

  private paginator = new BehaviorSubject<PaginatorModel>({ current_page: 1, per_page: 25, total: 0 });
  public paginator$ = this.paginator.asObservable();

  constructor(private httpClient: HttpClient, private authService: AuthService) {

  }

  getDetailPlanifications(page: number = 1, search: string = '', planificationId: number): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${planificationId}/detail-planifications`;
    this.loaded.next(true);

    let params = new HttpParams().set('sort', 'lastname')
      .append('per_page', '5')
      .append('page', page)
      .append('search', search);

    return this.httpClient.get<ServerResponse>(url,{params})
      .pipe(
        map(response => response),
        tap(response => {
          this.paginator.next(response.meta!);
        }),
        catchError(Handler.render)
      );
  }

  getPlanifications(page: number = 1, search: string = ''): Observable<ServerResponse> {
    this.loaded.next(true);
    const url = `${this.API_URL_PRIVATE}`;
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
          this.planificationsList = response as ServerResponse;
          this.planifications.next(this.planificationsList);
          this.loaded.next(false);
          this.paginator.next(response.meta!);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }
  //    Route::get('{planification}', [PlanificationController::class, 'getPlanitifications']);

  getPlanification(id: number): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${id}`;
    this.loaded.next(true);

    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => response),
        tap({
          next: response => {
            this.loaded.next(false);
            this.planificationModel = response.data;
            this.planification.next(this.planificationModel);
          },
          error: () => this.loaded.next(false)
        }),
        catchError(Handler.render)
      );
  }

  getPlanificationsByCourse(page: number = 1, search: string = '', courseId: number): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/courses/${courseId}`;

    const params = new HttpParams()
      .append('per_page', '10')
      .append('page', page)
      .append('search', search);

    return this.httpClient.get<ServerResponse>(url, { params })
      .pipe(
        map(response => response),
        tap(response => {
          this.planificationsList = response as ServerResponse;
          this.planifications.next(this.planificationsList);
          this.loaded.next(false);
          this.paginator.next(response.meta!);
          // this.setKpi();
        }),
        catchError(Handler.render)
      );
  }

  getPlanificationsByPeriodState(): Observable<ServerResponse> {
    // DDRC-C: obtiene una lista de planificaciones asignadas, las cuales esten activas en el periodo lectivo actual
    const url = `${this.API_URL_PRIVATE}/current-period-state`;
    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => response),
        tap(response => {
          this.planificationsList = response as ServerResponse;
          this.planifications.next(this.planificationsList);
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }
  
  getPreviousPlanifications(): Observable<ServerResponse> {
    // DDRC-C: obtiene una lista de planificaciones, de periodos lectivos anteriores
    const url = `${this.API_URL_PRIVATE}/previous-period-states`;
    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => response),
        tap(response => {
          this.planificationsList = response as ServerResponse;
          this.planifications.next(this.planificationsList);
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }

  //Route::get('course_parallels-works/{instructor}', [PlanificationController::class, 'getCoursesParallelsWorkdays']); no recepta el id
  getCoursesParallelsWorkdays(responsibleCourse: number): Observable<ServerResponse> {
    const url = this.API_URL_PRIVATE + '/planification/course_parallels-works' + responsibleCourse;
    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => response),
        tap(response => {
          this.planificationModel = response.data;
          this.planification.next(this.planificationModel);
        }),
        catchError(Handler.render)
      );
  }

  storePlanificationByCourse(courseId: number, planification: PlanificationModel): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/courses/${courseId}`;

    return this.httpClient.post<ServerResponse>(url, planification)
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
          this.planificationsList.data.push(response.data);
          this.planifications.next(this.planificationsList);
        }, e => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }

  deletePlanification(id: number): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${id}`;
    this.loaded.next(true);

    return this.httpClient.delete<ServerResponse>(url)
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
          this.planificationsList.data = this.planificationsList.data.filter((planification: PlanificationModel) => planification.id !== response.data.id);
          this.planifications.next(this.planificationsList);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }

  //  Route::put('dates-and-needs-planifications', [PlanificationController::class, 'updateDatesAndNeedsInPlanification']);
  updateDatesAndNeedsInPlanification(id: number | undefined, planification: PlanificationModel): Observable<ServerResponse> {
    const url = this.API_URL_PRIVATE + id + '/needs';
    return this.httpClient.put<ServerResponse>(url, planification)
      .pipe(
        map(response => response),
        tap(response => {
          console.log(response);
          // const index = this.planificationsList.data
          // .findIndex((planification: PlanificationModel) => planification.id === response.data.id);
          // this.planificationsList.data[index] = response.data;
          // this.planifications.next(this.planificationsList);
        }),
        catchError(Handler.render)
      );
  }
  //Route::put('planifications-cecy', [PlanificationController::class, 'updatePlanificationByCecy']); //falta por probar
  updatePlanificationByCecy(id: number | undefined, planification: PlanificationModel): Observable<ServerResponse> {
    const url = this.API_URL_PRIVATE + '/planifications/' + id + 'planifications-cecy';
    return this.httpClient.put<ServerResponse>(url, planification)
      .pipe(
        map(response => response),
        tap(response => {
          const index = this.planificationsList.data.findIndex((planification: PlanificationModel) => planification.id === response.data.id);
          this.planificationsList.data[index] = response.data;
          this.planifications.next(this.planificationsList);
        }),
        catchError(Handler.render)
      );
  }
  //Route::put('assign-code-planification', [PlanificationController::class, 'assignCodeToPlanification']); // si vale
  assignCodeToPlanification(id: number | undefined, planification: PlanificationModel): Observable<ServerResponse> {
    const url = this.API_URL_PRIVATE + '/planifications/' + id + 'assign-code-planification';
    return this.httpClient.put<ServerResponse>(url, planification)
      .pipe(
        map(response => response),
        tap(response => {
          const index = this.planificationsList.data.findIndex((planification: PlanificationModel) => planification.id === response.data.id);
          this.planificationsList.data[index] = response.data;
          this.planifications.next(this.planificationsList);
        }),
        catchError(Handler.render)
      );
  }
  // Route::put('approve-planification', [PlanificationController::class, 'approvePlanification']); // no vale
  approvePlanification(id: number | undefined, planification: PlanificationModel): Observable<ServerResponse> {
    const url = this.API_URL_PRIVATE + '/planifications/' + id + 'approve-planification';
    return this.httpClient.put<ServerResponse>(url, planification)
      .pipe(
        map(response => response),
        tap(response => {
          const index = this.planificationsList.data.findIndex((planification: PlanificationModel) => planification.id === response.data.id);
          this.planificationsList.data[index] = response.data;
          this.planifications.next(this.planificationsList);
        }),
        catchError(Handler.render)
      );
  }

  selectPlanification(planification: PlanificationModel) {
    this.planification.next(planification);
  }

  verifyResponsibleCourse(): boolean {
    const loggedInUser = this.authService.user;
    return this.planificationModel.responsibleCourse?.user?.id === loggedInUser.id;
  }

  updateStatePlanification(id: number, planification: PlanificationModel): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${id}/state-planification`;

    this.loaded.next(true);
    return this.httpClient.put<ServerResponse>(url, planification)
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
          /* const index = this.planificationsList.data.findIndex((planification: PlanificationModel) => planification.id === response.data.id);
          this.planificationsList.data[index] = response.data;
          this.planifications.next(this.planificationsList); */
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );

  }
  //descargar diseño curricular
  downloadcurricularDesign(planificationId: number) {
    this.getcurricularDesign(planificationId).subscribe(response => {
      const binaryData = [] as BlobPart[];
      binaryData.push(response as BlobPart);
      const filePath = URL.createObjectURL(new Blob(binaryData, { type: 'pdf' }));
      const downloadLink = document.createElement('a');
      downloadLink.href = filePath;
      downloadLink.setAttribute('download', 'curricularDesign.pdf');
      document.body.appendChild(downloadLink);
      downloadLink.click();
    }, error => {
/*       this.messageService.error(error);
 */    });
  }
  getcurricularDesign(id: number | undefined, params = new HttpParams()) {
    const url = `${this.API_URL_PRIVATE_PDF}/pdf/curricular-design/${id}`;
    return this.httpClient.get(url, { params, responseType: 'blob' as 'json' });
  }

  //descargar informe final
  downloadinformeFinal(planificationId: number) {
    this.getinformeFinal(planificationId).subscribe(response => {
      const binaryData = [] as BlobPart[];
      binaryData.push(response as BlobPart);
      const filePath = URL.createObjectURL(new Blob(binaryData, { type: 'pdf' }));
      const downloadLink = document.createElement('a');
      downloadLink.href = filePath;
      downloadLink.setAttribute('download', 'informeFinal.pdf');
      document.body.appendChild(downloadLink);
      downloadLink.click();
    }, error => {
/*       this.messageService.error(error);
 */    });
  }
  getinformeFinal(id: number | undefined, params = new HttpParams()) {
    const url = `${this.API_URL_PRIVATE_PDF}/pdf/informe-final/${id}`;
    return this.httpClient.get(url, { params, responseType: 'blob' as 'json' });
  }

  getFiles(userId: number, paginator: PaginatorModel = {}, filter: string = ''): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/catalogue/${userId}/file`;
    let params = new HttpParams()
      .set('page', paginator.current_page!)
      .set('per_page', paginator.per_page!);
    // El filtro depende de los campos propios que sean cadenas de texto
    if (filter !== '') {
      params = params.append('name', filter).append('description', filter);
    }
    return this.httpClient.get<ServerResponse>(url, { params })
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }

  uploadFiles(userId: number, data: FormData, params = new HttpParams()): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/catalogue/${userId}/file`;
    const headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');
    return this.httpClient.post<ServerResponse>(url, data, { params, headers })
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }

  assignResponsibleCecy(id: number | undefined, planification: PlanificationModel): Observable<ServerResponse> {
    const url = this.API_URL_PRIVATE + '/' + id + '/responsible-cecy';
    return this.httpClient.patch<ServerResponse>(url, planification)
      .pipe(
        map(response => response),
        tap(response => {
        }),
        catchError(Handler.render)
      );
  }

  updatePlanificationByCourse(id: number, planification: PlanificationModel): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${id}/initial-planification`;
    this.loaded.next(true);

    return this.httpClient.put<ServerResponse>(url, planification)
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
          const index = this.planificationsList.data.findIndex((planification: PlanificationModel) => planification.id === response.data.id);
          this.planificationsList.data[index] = response.data;
          this.planifications.next(this.planificationsList);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }

  destroyPlanification(ids: (number | undefined)[]): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/destroys`;

    this.loaded.next(true);
    return this.httpClient.patch<ServerResponse>(url, { ids })
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
          ids.forEach(planificationId => {
            this.planificationsList.data = this.planificationsList.data.filter((planification: PlanificationModel) => planification.id !== planificationId);
          })
          this.planifications.next(this.planificationsList);
        }),
        catchError(Handler.render)
      );
  }
}

