import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '@env/environment';
import {ServerResponse} from '@models/core/server.response';
import {Handler} from '../../exceptions/handler';
import {FileModel, PaginatorModel, UserModel} from '@models/core';
import {
  ParticipantModel,
  RegistrationStudentModel,
  SchoolPeriodModel
} from '@models/cecy';
import { PlanificationModel, RegistrationModel} from '@models/cecy';
import { MessageService } from "@services/core/message.service";


@Injectable({
  providedIn: 'root'
})

export class RegistrationHttpService {
  private API_URL_PRIVATE: string = `${environment.API_URL_PRIVATE}/registrations`;
  private API_URL_PRIVATE_PDF: string = `${environment.API_URL_PRIVATE}`;

  private API_URL_PUBLIC: string = `${environment.API_URL_PUBLIC}/registrations`;

  private registrationsList: ServerResponse = {};
  private registrations = new BehaviorSubject<ServerResponse>({});
  public registrations$ = this.registrations.asObservable();

  private registrationModel: RegistrationModel = {};
  private registration = new BehaviorSubject<RegistrationModel>({});
  public registration$ = this.registration.asObservable()

  private planificationsList: ServerResponse = {};
  private planifications = new BehaviorSubject<ServerResponse>({});
  public planifications$ = this.planifications.asObservable();

  private planificationModel: PlanificationModel = {};
  private planification = new BehaviorSubject<PlanificationModel>({});
  public planification$ = this.planification.asObservable()

  private participantsList: ServerResponse = {};
  private participants = new BehaviorSubject<ServerResponse>({});
  public participants$ = this.participants.asObservable();

  private participantModel: RegistrationModel = {};
  private participant = new BehaviorSubject<RegistrationModel>({});
  public participant$ = this.participant.asObservable();

  private loaded = new BehaviorSubject<boolean>(true);
  public loaded$ = this.loaded.asObservable();

  private paginator = new BehaviorSubject<PaginatorModel>({current_page: 1, per_page: 25, total: 0});
  public paginator$ = this.paginator.asObservable();

  private selectedRegister = new BehaviorSubject<RegistrationModel>({});
  public seletedRegister$ = this.selectedRegister.asObservable();

  constructor(private httpClient: HttpClient, private messageService: MessageService) {

  }

  //trae los curso del participante matriculado
  getCoursesByParticipant(page: number = 1): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/courses/participant`;

    const params = new HttpParams()
      .append('per_page', '8')
      .append('page', page)

    this.loaded.next(true);
    return this.httpClient.get<ServerResponse>(url, {params})
      .pipe(
        map(response => response),
        tap(response => {
          this.registrationsList = response as ServerResponse;
          this.registrations.next(this.registrationsList);
          this.loaded.next(false);
          this.paginator.next(response.meta!);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }

  //recuperar las matriculas
  recordsReturnedByRegistration(page: number = 1, search: string = ''): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}`;

    const params = new HttpParams()
      .set('sort', 'category')
      // .append('per_page', '10')
      .append('page', page)
      .append('search', search);

    this.loaded.next(true);
    return this.httpClient.get<ServerResponse>(url, {params})
      .pipe(
        map(response => response),
        tap(response => {
          this.registrationsList = response as ServerResponse;
          this.registrations.next(this.registrationsList);
          this.loaded.next(false);
          this.paginator.next(response.meta!);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }

  showParticipants(page: number = 1, search: string = ''): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}`;

    const params = new HttpParams()
      .set('sort', 'category')
      // .append('per_page', '10')
      .append('page', page)
      .append('search', search);

    this.loaded.next(true);
    return this.httpClient.get<ServerResponse>(url, {params})
      .pipe(
        map(response => response),
        tap(response => {
          this.registrationsList = response as ServerResponse;
          this.registrations.next(this.registrationsList);
          this.loaded.next(false);
          this.paginator.next(response.meta!);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }

  // downloadFile(catalogue: number, file: number): Observable<ServerResponse> {
  //   const url = `${this.API_URL_PRIVATE}/certificate/catalogue/${catalogue}/file/${file}`;

  //   this.loaded.next(true);
  //   return this.httpClient.get<ServerResponse>(url)
  //     .pipe(
  //       map(response => response),
  //       tap(response => {
  //         this.loaded.next(false);
  //       }, error => {
  //         this.loaded.next(false);
  //       }),
  //       catchError(Handler.render)
  //     );
  // }


  enrollParticipant
  (registrationID: number, registrationBody: any, page: number = 1, search: string = '')
    : Observable<ServerResponse> {
    // DDRC-C:Registra un participante inscrito a una incripción
    const url = `${this.API_URL_PRIVATE}/${registrationID}/register`;

    this.loaded.next(true);
    return this.httpClient.put<ServerResponse>(url, registrationBody)
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
          // const index = this.participantsList.data.findIndex((participant: ParticipantModel) => participant.id === response.data.id);
          // this.participantsList.data[index] = response.data;
          // this.participants.next(this.participantsList);
        }),
        catchError(Handler.render)
      );
  }

  getRegistration(registrationID: number)
    : Observable<ServerResponse> {
    // DDRC-C:obtiene el registro de un participante
    const url = `${this.API_URL_PRIVATE}/${registrationID}`;
    this.loaded.next(true);
    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
          // const index = this.participantsList.data.findIndex((participant: ParticipantModel) => participant.id === response.data.id);
          // this.participantsList.data[index] = response.data;
          // this.participants.next(this.participantsList);
        }),
        catchError(Handler.render)
      );
  }

  reEnroll(registrationID: number, reason: any, page: number = 1, search: string = ''): Observable<ServerResponse> {
    // DDRC-C: Vuelve a matricular a un participante
    const url = `${this.API_URL_PRIVATE}/${registrationID}/reenroll`;

    this.loaded.next(true);
    return this.httpClient.put<ServerResponse>(url, reason)
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
          // const index = this.participantsList.data?.findIndex((participant: ParticipantModel) => participant.id === response.data.id);
          // this.participantsList.data[index] = response.data;
          // this.participants.next(this.participantsList);
        }),
        catchError(Handler.render)
      );
  }

  eliminate(registrationID: number, page: number = 1, search: string = ''): Observable<ServerResponse> {
    // DDRC-C: Elimina una registro de la tabla registrations
    const url = `${this.API_URL_PRIVATE}/${registrationID}/eliminate`;

    this.loaded.next(true);
    return this.httpClient.delete<ServerResponse>(url)
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
          // this.participantsList.data = this.participantsList.data.filter((participant: ParticipantModel) => participant.id !== response.data.id);
          // this.participants.next(this.participantsList);
        }),
        catchError(Handler.render)
      );
  }

  setInReviewParticipantRegistration(registrationID: number, registrationBody: any, page: number = 1, search: string = ''): Observable<ServerResponse> {
    // DDRC-C:pone en estado de revición de la incripción de un participante
    const url = `${this.API_URL_PRIVATE}/${registrationID}/review`;

    this.loaded.next(true);
    console.log(registrationBody, 'datos enviados')
    return this.httpClient.put<ServerResponse>(url, registrationBody)
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
          // const index = this.participantsList.data.findIndex((participant: ParticipantModel) => participant.id === response.data.id);
          // this.participantsList.data[index] = response.data;
          // this.participants.next(this.participantsList);
        }),
        catchError(Handler.render)
      );
  }

  nullifyRegistration(registrationId: number, registrationBody: any): Observable<ServerResponse> {
    // DDRC-C:anulacion de una matricula
    const url = `${this.API_URL_PRIVATE}/${registrationId}/nullify-registration`;

    this.loaded.next(true);
    return this.httpClient.patch<ServerResponse>(url, registrationBody)
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
          // const index = this.registrationsList.data.findIndex((participant: ParticipantModel) => participant.id === response.data.id);
          // this.registrationsList.data[index] = response.data;
          // this.registrations.next(this.registrationsList);
        }),
        catchError(Handler.render)
      );
  }

  nullifyRegistrations(ids: any): Observable<ServerResponse> {
    // DDRC-C:anular varias matriculas
    const url = `${this.API_URL_PRIVATE}/nullify-registrations`;

    this.loaded.next(true);
    return this.httpClient.patch<ServerResponse>(url, ids)
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
          // ids.forEach(registrationId => {
          //   this.registrationsList.data = this.registrationsList.data.filter((user: UserModel) => user.id !== registrationId);
          // })
          // this.registrations.next(this.registrationsList);
        }),
        catchError(Handler.render)
      );
  }

  showRecordCompetitor(page: number = 1, search: string = ''): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}`;

    const params = new HttpParams()
      .set('sort', 'category')
      // .append('per_page', '10')
      .append('page', page)
      .append('search', search);

    this.loaded.next(true);
    return this.httpClient.get<ServerResponse>(url, {params})
      .pipe(
        map(response => response),
        tap(response => {
          this.registrationsList = response as ServerResponse;
          this.registrations.next(this.registrationsList);
          this.loaded.next(false);
          this.paginator.next(response.meta!);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }

  showParticipantGrades(page: number = 1, search: string = ''): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}`;

    const params = new HttpParams()
      .set('sort', 'category')
      // .append('per_page', '10')
      .append('page', page)
      .append('search', search);

    this.loaded.next(true);
    return this.httpClient.get<ServerResponse>(url, {params})
      .pipe(
        map(response => response),
        tap(response => {
          this.registrationsList = response as ServerResponse;
          this.registrations.next(this.registrationsList);
          this.loaded.next(false);
          this.paginator.next(response.meta!);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }

  uploadFile(id: number | undefined, registration: RegistrationModel): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${id}`;

    this.loaded.next(true);
    return this.httpClient.put<ServerResponse>(url, registration)
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
          const index = this.registrationsList.data.findIndex((registration: RegistrationModel) => registration.id === response.data.id);
          this.registrationsList.data[index] = response.data;
          this.registrations.next(this.registrationsList);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }

  /*downloadFileGrades(catalogue, file): Observable<ServerResponse> {
    const url = `${this.API_URL}/certificate/catalogue/${catalogue}/file/${file}`;

    this.loaded.next(true);
    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }*/

  showFile(id: number): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${id}`;

    this.loaded.next(true);
    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
          this.registrationModel = response.data;
          this.registration.next(this.registrationModel);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }

  destroyFile(ids: (number | undefined)[]): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/destroys`;

    this.loaded.next(true);
    return this.httpClient.patch<ServerResponse>(url, {ids})
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
          ids.forEach(registrationId => {
            this.registrationsList.data = this.registrationsList.data.filter((registration: UserModel) => registration.id !== registrationId);
          })
          this.registrations.next(this.registrationsList);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }

  loadDetail(id: number): Observable<RegistrationModel> {
    const url = `${this.API_URL_PRIVATE}/courses/participant/${id}`;
    this.loaded.next(true);
    return this.httpClient.get<RegistrationModel>(url)
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
          this.registrationModel = response;
          this.registration.next(this.registrationModel);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      )
  };

  loadGrade(id: number): Observable<RegistrationModel> {
    const url = `${this.API_URL_PRIVATE}/courses/participant/${id}`;
    this.loaded.next(true);
    return this.httpClient.get<RegistrationModel>(url)
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
          this.registrationModel = response;
          this.registration.next(this.registrationModel);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      )
  };

  loadParticipant(id: number): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/participant/${id}`;

    this.loaded.next(true);
    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
          this.registrationModel = response.data;
          this.registration.next(this.registrationModel);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }

  selectRegistration(registration: RegistrationModel) {
    this.registration.next(registration);
  }

  selectRegister(registration: RegistrationModel) {
    this.selectedRegister.next(registration);
  }

  getGradeByParticipant(id: number): Observable<RegistrationModel> {
    const url = `${this.API_URL_PRIVATE}/grade-by-participant/${id}`;
    this.loaded.next(true);
    return this.httpClient.get<RegistrationModel>(url)
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
          this.registrationModel = response;
          this.registration.next(this.registrationModel);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      )
  };


  updateGradesParticipant(id: number | undefined, registration: RegistrationModel): Observable<ServerResponse> {
    const url = this.API_URL_PRIVATE + '/participant-grades/' + id;
    return this.httpClient.put<ServerResponse>(url, registration)
      .pipe(
        map(response => response),
        tap(response => {
          const index = this.registrationsList.data.findIndex((registration: RegistrationModel) => registration.id === response.data.id);
          this.registrationsList.data[index] = response.data;
          this.registrations.next(this.registrationsList);
        }),
        catchError(Handler.render)
      );
  }

  downloadReportRecordCompetitors(detailPlanificationId: number) {
    this.getReportRecordCompetitors(detailPlanificationId).subscribe(response => {
      const binaryData = [] as BlobPart[];
      binaryData.push(response as BlobPart);
      const filePath = URL.createObjectURL(new Blob(binaryData, {type: 'pdf'}));
      const downloadLink = document.createElement('a');
      downloadLink.href = filePath;
      downloadLink.setAttribute('download', 'reportRecordCompetitors.pdf');
      document.body.appendChild(downloadLink);
      downloadLink.click();
    }, error => {
      /*       this.messageService.error(error);
       */
    });
  }

  getReportRecordCompetitors(id: number | undefined, params = new HttpParams()) {
    const url = `${this.API_URL_PRIVATE_PDF}/pdf/show-record-competitor/${id}`;
    return this.httpClient.get(url, {params, responseType: 'blob' as 'json'});
  }

  storeRegisterStudent(registrationStudent: RegistrationStudentModel): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/register-student`;
    return this.httpClient.post<ServerResponse>(url, registrationStudent)
      .pipe(
        map(response => {
          this.messageService.success(response);
          return response;
        }),
      );
  }

  getFiles(id: number, paginator: PaginatorModel = {}, filter: string = ''): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${id}/cecy-responsible/files`;
    let params = new HttpParams()
      .set('page', paginator.current_page!)
      .set('per_page', paginator.per_page!);
    // El filtro depende de los campos propios que sean cadenas de texto
    if (filter !== '') {
      params = params.append('name', filter).append('description', filter);
    }
    return this.httpClient.get<ServerResponse>(url, {params})
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }

  uploadFiles(id: number, data: FormData, params = new HttpParams()): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${id}/cecy-responsible/files`;
    const headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');
    return this.httpClient.post<ServerResponse>(url, data, {params, headers})
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }

  uploadOtherFile(data: FormData, params = new HttpParams()): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/cecy-responsible/files`;
    const headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');
    return this.httpClient.post<ServerResponse>(url, data, {params, headers})
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }

  uploadOtherIdFile(id: number, data: FormData, params = new HttpParams()): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${id}/cecy-responsible/files`;
    const headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');
    return this.httpClient.post<ServerResponse>(url, data, {params, headers})
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }
  downloadFile(file: FileModel) {
    this.getFile(file.id!).subscribe((response) => {
      const binaryData = [] as BlobPart[];
      binaryData.push(response as BlobPart);
      const filePath = URL.createObjectURL(new Blob(binaryData, {type: 'pdf'}));
      const downloadLink = document.createElement('a');
      downloadLink.href = filePath;
      downloadLink.setAttribute('download', file.fullName!);
      document.body.appendChild(downloadLink);
      downloadLink.click();
    });
  }

  getFile(id: number, params = new HttpParams()) {
    const url = `${this.API_URL_PRIVATE}/file/${id}/cecy-responsible/download`;
    return this.httpClient.get(url, {params, responseType: 'blob' as 'json'});
  }
  updateGrades(data: FormData,params = new HttpParams()): Observable<ServerResponse> {
    const url = `${environment.API_URL_PRIVATE}/registration/import`;
    const headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');
    return this.httpClient.post<ServerResponse>(url, data, {params, headers})
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }

  downloadRequirement(id: number,registrationRequirementId:number) {
    this.getRequirement(id!,registrationRequirementId!).subscribe(response => {
      const binaryData = [] as BlobPart[];
      binaryData.push(response as BlobPart);
      const filePath = URL.createObjectURL(new Blob(binaryData, {type: 'pdf'}));
      const downloadLink = document.createElement('a');
      downloadLink.href = filePath;
      downloadLink.setAttribute('download', 'requisito.pdf');
      document.body.appendChild(downloadLink);
      downloadLink.click();
    }, error => {
      this.messageService.error(error);
    });
  }

  getRequirement(id: number,registrationRequirementId:number, params = new HttpParams()) {
    const url = `${this.API_URL_PRIVATE}/${id}/cecy-responsible/files/${registrationRequirementId}/downloadRequirement`;
    return this.httpClient.get(url, {params, responseType: 'blob' as 'json'});
  }

  uploadDocumentRegistration(requistrationRequirementId: number, data: FormData, params = new HttpParams()): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${requistrationRequirementId}`;
    const headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');
    return this.httpClient.post<ServerResponse>(url, data, { params, headers })
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }

  getGrades(id:number, params = new HttpParams()) {
    const url = `${this.API_URL_PRIVATE}/excel/${id}`;
    return this.httpClient.get(url, {params, responseType: 'blob' as 'json'});
  }

  downloadGrades(id: number) {
    this.getGrades(id).subscribe(response => {
      const binaryData = [] as BlobPart[];
      binaryData.push(response as BlobPart);
      const filePath = URL.createObjectURL(new Blob(binaryData, {type: 'xlsx'}));
      const downloadLink = document.createElement('a');
      downloadLink.href = filePath;
      downloadLink.setAttribute('download', 'participant.xlsx');
      document.body.appendChild(downloadLink);
      downloadLink.click();
    }, error => {
      this.messageService.error(error);
    });
  }

  getRegistrationsByDetailPlanificationAndParticipant(detailPlanificationId:number=0): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/detail-planification/${detailPlanificationId}`;

    this.loaded.next(true);
    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => response),
        tap(response => {
          this.registrationsList = response as ServerResponse;
          this.registrations.next(this.registrationsList);
          this.loaded.next(false);
          this.paginator.next(response.meta!);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }
}
