import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '@env/environment';
import { ServerResponse } from '@models/core/server.response';
import { Handler } from '../../exceptions/handler';
import { FileModel, PaginatorModel } from '@models/core';
import { CourseModel, PlanificationModel } from '@models/cecy';

@Injectable({
  providedIn: 'root'
})

export class CourseHttpService {

  private httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  }

  private API_URL_PRIVATE: string = `${environment.API_URL_PRIVATE}/courses`;
  private API_URL_PUBLIC: string = `${environment.API_URL_PUBLIC}/courses-guest`;

  private coursesList: ServerResponse = {};
  private courses = new BehaviorSubject<ServerResponse>({});
  public courses$ = this.courses.asObservable();

  private courseModel: CourseModel = {};
  private course = new BehaviorSubject<CourseModel>({});
  private selectedCourse = new BehaviorSubject<CourseModel>({});
  public seletedCourse$ = this.selectedCourse.asObservable();
  public course$ = this.course.asObservable();


  private planificationsList: ServerResponse = {};
  private planifications = new BehaviorSubject<ServerResponse>({});
  public planifications$ = this.planifications.asObservable();

  private planificationModel: PlanificationModel = {};
  private planification = new BehaviorSubject<PlanificationModel>({});
  public planification$ = this.planification.asObservable()

  private loaded = new BehaviorSubject<boolean>(true);
  public loaded$ = this.loaded.asObservable();

  private paginator = new BehaviorSubject<PaginatorModel>({ current_page: 1, per_page: 25, total: 0 });
  public paginator$ = this.paginator.asObservable();

  constructor(private httpClient: HttpClient) {

  }

  ///////////////////////////////
  getImages(id: number): Observable<any>{
    return this.httpClient.get<any>( this.API_URL_PRIVATE+'/images/'+ id, this.httpOptions)
  }

  ///////////////////////////////


  //Básicos

  getCourses(page: number = 1, search: string = '',): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}`;

    const params = new HttpParams()
      .append('per_page', '5')
      .append('page', page)
      .append('search', search);

    this.loaded.next(true);
    return this.httpClient.get<ServerResponse>(url, { params })
      .pipe(
        map(response => response),
        tap(response => {
          this.coursesList = response as ServerResponse;
          this.courses.next(this.coursesList);
          this.loaded.next(false);
          this.paginator.next(response.meta!);
        }),
        catchError(Handler.render)
      );
  }
  getCourseList(page: number = 1, search: string = '',): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/profile`;

    const params = new HttpParams()
      .append('per_page', '5')
      .append('page', page)
      .append('search', search);

    this.loaded.next(true);
    return this.httpClient.get<ServerResponse>(url, { params })
      .pipe(
        map(response => response),
        tap(response => {
          this.coursesList = response as ServerResponse;
          this.courses.next(this.coursesList);
          this.loaded.next(false);
          this.paginator.next(response.meta!);
        }),
        catchError(Handler.render)
      );
  }


  getCourse(id: number): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${id}`;

    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => response),
      );
  }


  storeCourseByCareer(id: number, course: CourseModel): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/careers/${id}`;
    this.loaded.next(true);

    return this.httpClient.post<ServerResponse>(url, course)
      .pipe(
        map(response => response),
        tap({
          next: response => {
            this.loaded.next(false);
            this.coursesList.data.push(response.data);
            this.courses.next(this.coursesList);
          },
          error: error => {
            this.loaded.next(false);
          }
        }),
        catchError(Handler.render)
      );
  }

  updateCourse(id: number, course: CourseModel): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${id}`;
    this.loaded.next(true);
    return this.httpClient.put<ServerResponse>(url, course)
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
          const index = this.coursesList.data.findIndex((course: CourseModel) => course.id === response.data.id);
          this.coursesList.data[index] = response.data;
          this.courses.next(this.coursesList);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }

  updateCourseNameAndDuration(id: number, course: CourseModel): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${id}/initial-course`;
    this.loaded.next(true);

    return this.httpClient.put<ServerResponse>(url, course)
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
          const index = this.coursesList.data.findIndex((course: CourseModel) => course.id === response.data.id);
          this.coursesList.data[index] = response.data;
          this.courses.next(this.coursesList);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }

  deleteCourse(id: number | undefined): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${id}`;

    this.loaded.next(true);
    return this.httpClient.delete<ServerResponse>(url)
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
          this.coursesList.data = this.coursesList.data.filter((course: CourseModel) => course.id !== response.data.id);
          this.courses.next(this.coursesList);
        }),
        catchError(Handler.render)
      );
  }

  destroyCourse(id: number | undefined): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${id}/initial-course`;

    this.loaded.next(true);
    return this.httpClient.delete<ServerResponse>(url)
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
          this.coursesList.data = this.coursesList.data.filter((course: CourseModel) => course.id !== response.data.id);
          this.courses.next(this.coursesList);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }

  deleteCourses(ids: (number | undefined)[]): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/initial-course`;

    this.loaded.next(true);
    return this.httpClient.patch<ServerResponse>(url, { ids })
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
          ids.forEach(courseId => {
            this.coursesList.data = this.coursesList.data.filter((course: CourseModel) => course.id !== courseId);
          })
          this.courses.next(this.coursesList);
        }),
        catchError(Handler.render)
      );
  }

  selectCourse(course: CourseModel) {
    this.selectedCourse.next(course);
    this.course.next(course);

  }

  //Metodos custom
  //Route::put('curricular-design', [CourseController::class, 'updateCurricularDesignCourse']);
  //Actualiza la informacion del diseño curricular (Done)
  updateCurricularDesignCourse(idCourse: number, course: CourseModel): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${idCourse}/curricular-design`;

    this.loaded.next(true);
    return this.httpClient.put<ServerResponse>(url, course)
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
          const index = this.coursesList.data.findIndex((course: CourseModel) =>
            course.id === response.data.id);
          this.coursesList.data[index] = response.data;
          this.courses.next(this.coursesList);
        }),
        catchError(Handler.render)
      );
  }

  //Route::patch('general-information', [CourseController::class, 'updateGeneralInformationCourse']);
  //actualiza datos generales de un curso seleccionado  (Done)
  updateGeneralInformationCourse(id: number, course: CourseModel): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${id}/general-information`;

    this.loaded.next(true);
    return this.httpClient.patch<ServerResponse>(url, course)
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
          // // const index = this.coursesList.data.
          // //   findIndex((course: CourseModel) => course.id === response.data.id);
          // // this.coursesList.data[index] = response.data;
          // this.courses.next(this.coursesList);
        }),
        catchError(Handler.render)
      );
  }

  //Route::patch('assign-code', [CourseController::class, 'assignCodeToCourse']);
  //Asignar código al curso (Done)
  assignCodeToCourse(id: number, course: CourseModel): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/assign-code/${id}`;

    this.loaded.next(true);
    return this.httpClient.patch<ServerResponse>(url, course)
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
          const index = this.coursesList.data.findIndex((course: CourseModel) => course.id === response.data.id);
          this.coursesList.data[index] = response.data;
          this.courses.next(this.coursesList);
        }),
        catchError(Handler.render)
      );
  }

  //Route::patch('not-approve-reason', [CourseController::class, 'notApproveCourseReason']);
  //Ingresar el motivo del por cual el curso no esta aprobado (Done)
  notApproveCourseReason(id: number, course: CourseModel): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/not-approve-reason/${id}`;

    this.loaded.next(true);
    return this.httpClient.patch<ServerResponse>(url, course)
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
          const index = this.coursesList.data.findIndex((course: CourseModel) => course.id === response.data.id);
          this.coursesList.data[index] = response.data;
          this.courses.next(this.coursesList);
        }),
        catchError(Handler.render)
      );
  }

  //Route::get('inform-course-needs', [CourseController::class, 'showInformCourseNeeds']);
  //Mostrar las necesidades de un curso (Done)
  showInformCourseNeeds(id: number | undefined): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/inform-course-needs/${id}`;

    this.loaded.next(true);
    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
          this.courseModel = response.data;
          this.course.next(this.courseModel);
        }),
        catchError(Handler.render)
      );
  }


  //Route::get('curricular-design', [CourseController::class, 'showCurricularDesign']);
  //Traer la informacion de diseño curricular (Done)
  showCurricularDesign(id: number): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/curricular-design/${id}`;

    this.loaded.next(true);
    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
          this.planificationModel = response.data;
          this.planification.next(this.planificationModel);
        }),
        catchError(Handler.render)
      );
  }

  //Route::get('final-report', [CourseController::class, 'showCourseFinalReport']);
  //Traer la informacion del informe final del curso (Done)
  showCourseFinalReport(id: number): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/final-report/${id}`;

    this.loaded.next(true);
    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
          this.courseModel = response.data;
          this.course.next(this.courseModel);
        }),
        catchError(Handler.render)
      );
  }

  //Route::get('public-courses', [CourseController::class, 'getPublicCourses']);
  //Obtiene los cursos públicos aprobados (Done)
  getPublicCourses(page: number = 1, search: string = ''): Observable<ServerResponse> {
    const url = `${this.API_URL_PUBLIC}/public-courses`;

    const params = new HttpParams()
      .append('per_page', '8')
      .append('page', page)
      .append('search', search)

    this.loaded.next(true);
    return this.httpClient.get<ServerResponse>(url, { params })
      .pipe(
        map(response => response),
        tap(response => {
          this.planificationsList = response as ServerResponse;
          this.planifications.next(this.planificationsList);
          this.loaded.next(false);
          this.paginator.next(response.meta!);
        }),
        catchError(Handler.render)
      );
  }

  //Route::get('public-courses-category/{category}', [CourseController::class, 'getPublicCoursesByCategory']);
  //Obtiene los cursos públicos aprobados por categoria (Done)
  getPublicCoursesByCategory(page: number = 1, category: number = 0): Observable<ServerResponse> {
    const url = `${this.API_URL_PUBLIC}/public-courses-category/${category}`;

    const params = new HttpParams()
      .append('per_page', '8')
      .append('page', page)

    this.loaded.next(true);
    return this.httpClient.get<ServerResponse>(url, { params })
      .pipe(
        map(response => response),
        tap(response => {
          this.planificationsList = response as ServerResponse;
          this.planifications.next(this.planificationsList);
          this.loaded.next(false);
          this.paginator.next(response.meta!);
        }),
        catchError(Handler.render)
      );
  }

  //Route::get('private-courses-participant', [CourseController::class, 'getPrivateCoursesByParticipantType']);
  // Obtiene los cursos privados aprobados por tipo de participante (Done)
  getPrivateCoursesByParticipantType(page: number = 1, search: string = ''): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/private-courses-participant`;

    const params = new HttpParams()
      .append('per_page', '8')
      .append('page', page)
      .append('search', search)

    this.loaded.next(true);
    return this.httpClient.get<ServerResponse>(url, { params })
      .pipe(
        map(response => response),
        tap(response => {
          this.planificationsList = response as ServerResponse;
          this.planifications.next(this.planificationsList);
          this.loaded.next(false);
          this.paginator.next(response.meta!);
        }),
        catchError(Handler.render)
      );
  }

  //Route::get('private-courses-category/{category}', [CourseController::class, 'getPrivateCoursesByCategory']);
  //Obtiene los cursos privados aprobados por tipo de participante y filtrados por categoria (Done)
  getPrivateCoursesByParticipantTypeAndCategory(page: number = 1, category: number = 0): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/private-courses-category/${category}`;

    const params = new HttpParams()
      .append('per_page', '8')
      .append('page', page)


    this.loaded.next(true);
    return this.httpClient.get<ServerResponse>(url, { params })
      .pipe(
        map(response => response),
        tap(response => {
          this.planificationsList = response as ServerResponse;
          this.planifications.next(this.planificationsList);
          this.loaded.next(false);
          this.paginator.next(response.meta!);
        }),
        catchError(Handler.render)
      );
  }

  //Route::get('by-responsible/{responsible}', [CourseController::class, 'getCoursesByResponsibleCourse']);
  //obtener los cursos asignados a un docente responsable logueado (Done)
  getCoursesByResponsibleCourse(page: number = 1, search: string = ''): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/by-responsible`;

    const params = new HttpParams()
      .append('per_page', '10')
      .append('page', page)
      .append('search', search)

    this.loaded.next(true);
    return this.httpClient.get<ServerResponse>(url, { params })
      .pipe(
        map(response => response),
        tap(response => {
          this.coursesList = response as ServerResponse;
          this.courses.next(this.coursesList);
          this.loaded.next(false);
          this.paginator.next(response.meta!);
        }),
        catchError(Handler.render)
      );
  }

  //Route::get('by-instructor/{instructor}', [CourseController::class, 'getCoursesByInstructor']);
  //Traer cursos de un docente instructor (Deberia estar en planificacion dice cursos pero trae planificaciones)(Done)
  getCoursesByInstructor(page: number = 1, instructor: number): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/by-instructor/${instructor}`;

    const params = new HttpParams()
      .append('per_page', '10')
      .append('page', page)

    this.loaded.next(true);
    return this.httpClient.get<ServerResponse>(url, { params })
      .pipe(
        map(response => response),
        tap(response => {
          this.coursesList = response as ServerResponse;
          this.courses.next(this.coursesList);
          this.loaded.next(false);
          this.paginator.next(response.meta!);
        }),
        catchError(Handler.render)
      );
  }

  //Route::get('by-coodinator/{coodinator}', [CourseController::class, 'getCoursesByCoordinator']);
  //Obtener cursos y Filtrarlos por peridos lectivos , carrera o estado (Done)
  //el que hizo esto debe cambiar lo que se envia por json a algo que se envia por params
  getCoursesByCoordinator(page: number = 1): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/by-coodinator`;

    const params = new HttpParams()
      .append('per_page', '10')
      .append('page', page)

    this.loaded.next(true);
    return this.httpClient.get<ServerResponse>(url, { params })
      .pipe(
        map(response => response),
        tap(response => {
          this.coursesList = response as ServerResponse;
          this.courses.next(this.coursesList);
          this.loaded.next(false);
          this.paginator.next(response.meta!);
        }),
        catchError(Handler.render)
      );
  }

  //Route::get('kpi', [CourseController::class, 'getCoursesKPI']);
  //Mostrar los KPI de cursos aprobados, por aprobar y en proceso (Done)
  getCoursesKPI(page: number = 1): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/kpi`;

    const params = new HttpParams()
      .append('per_page', '10')
      .append('page', page)

    this.loaded.next(true);
    return this.httpClient.get<ServerResponse>(url, { params })
      .pipe(
        map(response => response),
        tap(response => {
          this.coursesList = response as ServerResponse;
          this.courses.next(this.coursesList);
          this.loaded.next(false);
          this.paginator.next(response.meta!);
        }),
        catchError(Handler.render)
      );
  }

  //Route::get('year-schedule', [CourseController::class, 'showYearSchedule']);
  //Traer todos los cursos planificados de un año en especifico (Done)
  // el que usa esta ruta debe enviar el año en especifico bien por el url
  // o por params no por json
  showYearSchedule(page: number = 1): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/year-schedule`;

    const params = new HttpParams()
      .append('per_page', '10')
      .append('page', page)

    this.loaded.next(true);
    return this.httpClient.get<ServerResponse>(url, { params })
      .pipe(
        map(response => response),
        tap(response => {
          this.coursesList = response as ServerResponse;
          this.courses.next(this.coursesList);
          this.loaded.next(false);
          this.paginator.next(response.meta!);
        }),
        catchError(Handler.render)
      );
  }

  getCoursesByCareer(page: number = 1, search: string = '', id: number): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/careers/${id}`;
    this.loaded.next(true);

    const params = new HttpParams()
      .append('per_page', '10')
      .append('page', page)
      .append('search', search);


    return this.httpClient.get<ServerResponse>(url, { params })
      .pipe(
        map(response => response),
        tap(response => {
          this.coursesList = response as ServerResponse;
          this.courses.next(this.coursesList);
          this.loaded.next(false);
          this.paginator.next(response.meta!);
        }),
        catchError(Handler.render)
      );
  }

  getPlanifications(page: number, search: string = '', courseId: number): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${courseId}/planifications`;

    const params = new HttpParams()
      .append('per_page', '5')
      .append('page', page)
      .append('search', search);

    return this.httpClient.get<ServerResponse>(url, { params })
      .pipe(
        map(response => response),
        tap(response => {
          // this.planificationsList = response as ServerResponse;
          // this.planifications.next(this.planificationsList);
          this.loaded.next(false);
          this.paginator.next(response.meta!);
        }, e => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }

  downloadReportNeed(courseId: number) {
    this.getInformCourseNeeds(courseId).subscribe(response => {
      const binaryData = [] as BlobPart[];
      binaryData.push(response as BlobPart);
      const filePath = URL.createObjectURL(new Blob(binaryData, { type: 'pdf' }));
      const downloadLink = document.createElement('a');
      downloadLink.href = filePath;
      downloadLink.setAttribute('download', 'reportInformCourseNeeds.pdf');
      document.body.appendChild(downloadLink);
      downloadLink.click();
    });
  }

  getInformCourseNeeds(id: number | undefined, params = new HttpParams()) {
    const url = `${this.API_URL_PRIVATE}/${id}/inform-course-needs`;
    return this.httpClient.get(url, { params, responseType: 'blob' as 'json' });
  }

  getResponsibleCecyByCourses(page: number = 1): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/certificate/students`;

    const params = new HttpParams()
      .append('per_page', '10')
      .append('page', page)

    this.loaded.next(true);
    return this.httpClient.get<ServerResponse>(url, { params })
      .pipe(
        map(response => response),
        tap(response => {
          this.coursesList = response as ServerResponse;
          this.courses.next(this.coursesList);
          this.loaded.next(false);
          this.paginator.next(response.meta!);
        }),
        catchError(Handler.render)
      );
  }

  updateStateCourse(id: number, course: CourseModel): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${id}`;

    this.loaded.next(true);
    return this.httpClient.put<ServerResponse>(url, course)
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
          const index = this.coursesList.data.findIndex((course: CourseModel) => course.id === response.data.id);
          this.coursesList.data[index] = response.data;
          this.courses.next(this.coursesList);
        }),
        catchError(Handler.render)
      );
  }

  // getImageCourse(userId: number, paginator: PaginatorModel = {}, filter: string = ''): Observable<ServerResponse> {
  //   const url = `${this.API_URL}/users/${userId}/files`;
  //   let params = new HttpParams()
  //     .set('page', paginator.current_page!)
  //     .set('per_page', paginator.per_page!);
  //   // El filtro depende de los campos propios que sean cadenas de texto
  //   if (filter !== '') {
  //     params = params.append('name', filter).append('description', filter);
  //   }
  //   return this.httpClient.get<ServerResponse>(url, {params})
  //     .pipe(
  //       map(response => response),
  //       catchError(Handler.render)
  //     );
  // }

  uploadImageCourse(courseId: number, data: FormData, params = new HttpParams()): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${courseId}/images`;
    const headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');
    return this.httpClient.post<ServerResponse>(url, data, { params, headers })
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }

  approveCourse(id: number | undefined, course: CourseModel): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${id}/approve`;

    this.loaded.next(true);

    return this.httpClient.patch<ServerResponse>(url, course)
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
          const index = this.coursesList.data.findIndex((course: CourseModel) => course.id === response.data.id);
          this.coursesList.data[index] = response.data;
          this.courses.next(this.coursesList);
        }, e => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }

  declineCourse(id: number | undefined): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${id}/decline`;
    this.loaded.next(true);

    return this.httpClient.patch<ServerResponse>(url, {})
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
          const index = this.coursesList.data.findIndex((course: CourseModel) => course.id === response.data.id);
          this.coursesList.data[index] = response.data;
          this.courses.next(this.coursesList);
        }, e => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }

  getFiles(id: number, paginator: PaginatorModel = {}, filter: string = ''): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${id}/files`;
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

  uploadFiles(id: number, data: FormData, params = new HttpParams()): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${id}/files`;
    const headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');
    return this.httpClient.post<ServerResponse>(url, data, { params, headers })
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }

  uploadOtherFile(data: FormData, params = new HttpParams()): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/cecy-responsible/files`;
    const headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');
    return this.httpClient.post<ServerResponse>(url, data, { params, headers })
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }

  uploadOtherIdFile(id: number, data: FormData, params = new HttpParams()): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${id}/cecy-responsible/files`;
    const headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');
    return this.httpClient.post<ServerResponse>(url, data, { params, headers })
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }

  downloadFile(file: FileModel) {
    this.getFile(file.id!).subscribe((response) => {
      const binaryData = [] as BlobPart[];
      binaryData.push(response as BlobPart);
      const filePath = URL.createObjectURL(new Blob(binaryData, { type: 'pdf' }));
      const downloadLink = document.createElement('a');
      downloadLink.href = filePath;
      downloadLink.setAttribute('download', file.fullName!);
      document.body.appendChild(downloadLink);
      downloadLink.click();
    });
  }

  getFile(id: number, params = new HttpParams()) {
    const url = `${this.API_URL_PRIVATE}/file/${id}/cecy-responsible/download`;
    return this.httpClient.get(url, { params, responseType: 'blob' as 'json' });
  }
}

