import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '@env/environment';
import {ServerResponse} from '@models/core/server.response';
import {Handler} from '../../exceptions/handler';
import {AttendanceModel} from '@models/cecy';
import {DetailAttendanceModel} from '../../models/cecy/detail-attendance.model';
import {MessageService} from "@services/core";


@Injectable({
  providedIn: 'root'
})

export class AttendanceHttpService {
  private API_URL_PRIVATE: string = `${environment.API_URL_PRIVATE}/attendances`;
  private API_URL_PUBLIC: string = `${environment.API_URL_PUBLIC}/attendances`;
  private API_URL_PRIVATE_PDF: string = `${environment.API_URL_PRIVATE}`;



  private attendanceList: ServerResponse = {};
  private attendances = new BehaviorSubject<ServerResponse>({});
  public attendances$ = this.attendances.asObservable();


  private attendanceModel: AttendanceModel = {};
  private attendance = new BehaviorSubject<AttendanceModel>({});
  public attendance$ = this.attendance.asObservable()

  private loaded = new BehaviorSubject<boolean>(true);
  public loaded$ = this.loaded.asObservable();

  private paginator = new BehaviorSubject<any>({current_page: 1, per_page: 15, total: 0});
  public paginator$ = this.paginator.asObservable();

  constructor(private httpClient: HttpClient, public messageService: MessageService) {

  }

  getAttendances(): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}`;
    const params = new HttpParams()
    this.loaded.next(true);
    return this.httpClient.get<ServerResponse>(url, {params})
      .pipe(
        map(response => response),
        tap(response => {
          this.attendanceList = response as ServerResponse;
          this.attendances.next(this.attendanceList);
          this.loaded.next(false);
          this.paginator.next(response.meta!);
        }),
        catchError(Handler.render)
      );
  }

  //asistencias por el id
  getAttendance(id: number): Observable<ServerResponse> {
    // const url = `${this.API_URL_PRIVATE}/${id}`;
    const url = `${environment.API_URL_PRIVATE}/detail-attendances/attendances/${id}`;

    this.loaded.next(true);
    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
          this.attendanceModel = response.data;
          this.attendance.next(this.attendanceModel);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }

  //asistencias por el detalle de planifiacion
  getAttendanceDetailPlanification(id: number): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/detail-planifications/${id}`;

    this.loaded.next(true);
    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
          this.attendanceModel = response.data;
          this.attendance.next(this.attendanceModel);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }

  storeAttendance(attendance: AttendanceModel): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}`;
    this.loaded.next(true);
    return this.httpClient.post<ServerResponse>(url, attendance)
      .pipe(
        map(response =>{
          this.messageService.success(response);
          return response;
        })
      );
  }
  storeAttendanceDetail(attendance: AttendanceModel): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/detail-attendance`;
    this.loaded.next(true);
    return this.httpClient.post<ServerResponse>(url, attendance)
      .pipe(
        map(response =>{
          this.messageService.success(response);
          return response;
        })
      );
  }

  updateAttendance(id: number, attendance: AttendanceModel): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${id}`;

    this.loaded.next(true);
    return this.httpClient.put<ServerResponse>(url, attendance)
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
          const index = this.attendanceList.data.findIndex((attendance: AttendanceModel) => attendance.id === response.data.id);
          this.attendanceList.data[index] = response.data;
          this.attendances.next(this.attendanceList);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }

  deleteAttendance(id: number): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/detail-planifications/${id}`;
    this.loaded.next(true);
    return this.httpClient.delete<ServerResponse>(url)
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
          this.attendanceList.data = this.attendanceList.data.filter((attendance: AttendanceModel) => attendance.id !== response.data.id);
          this.attendances.next(this.attendanceList);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }

  deleteAttendances(ids: (number | undefined)[]): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/destroys`;

    this.loaded.next(true);
    return this.httpClient.patch<ServerResponse>(url, {ids})
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
          ids.forEach(attendanceId => {
            this.attendanceList.data = this.attendanceList.data.filter((attendance: AttendanceModel) => attendance.id !== attendanceId);
          })
          this.attendances.next(this.attendanceList);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }

  /*getAttendancesByParticipant(id: number): Observable<ServerResponse> {
    const url = `${this.API_URL}/attendance/attendances-by-participant`;

    this.loaded.next(true);
    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
          this.attendanceModel = response.data;
          this.attendance.next(this.attendanceModel);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }*/


  /*getAttendancesByParticipant(id: number | undefined ): Observable<AttendanceModel> {
    const url = `${this.API_URL}/attendance/attendances-by-participant/${id}`;
    this.loaded.next(true);
    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => response),
        tap(response => {
          console.error(response)
          this.attendanceList = response as ServerResponse;
          this.attendances.next(this.attendanceList);
          this.loaded.next(false);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      )
  };*/

  selectAttendance(attendance: AttendanceModel) {
    this.attendance.next(attendance);
  }

  downloadPhotographicRecord(courseId: number) {
    this.getPhotographicRecord(courseId).subscribe(response => {
      const binaryData = [] as BlobPart[];
      binaryData.push(response as BlobPart);
      const filePath = URL.createObjectURL(new Blob(binaryData, {type: 'pdf'}));
      const downloadLink = document.createElement('a');
      downloadLink.href = filePath;
      downloadLink.setAttribute('download', 'reportPhotographicRecord.pdf');
      document.body.appendChild(downloadLink);
      downloadLink.click();
    }, error => {
      /*       this.messageService.error(error);
       */
    });
  }

  getPhotographicRecord(id: number | undefined, params = new HttpParams()) {
    const url = `${this.API_URL_PRIVATE_PDF}/pdf/photographic-record/${id}`;
    return this.httpClient.get(url, {params, responseType: 'blob' as 'json'});
  }

  downloadatendanceEvaluation(courseId: number) {
    this.getatendanceEvaluation(courseId).subscribe(response => {
      const binaryData = [] as BlobPart[];
      binaryData.push(response as BlobPart);
      const filePath = URL.createObjectURL(new Blob(binaryData, {type: 'pdf'}));
      const downloadLink = document.createElement('a');
      downloadLink.href = filePath;
      downloadLink.setAttribute('download', 'asistencia-evaluacion.pdf');
      document.body.appendChild(downloadLink);
      downloadLink.click();
    }, error => {
      /*       this.messageService.error(error);
       */
    });
  }

  getatendanceEvaluation(id: number | undefined, params = new HttpParams()) {
    const url = `${this.API_URL_PRIVATE_PDF}/pdf/attendance-evaluation/${id}`;
    return this.httpClient.get(url, {params, responseType: 'blob' as 'json'});
  }
}
