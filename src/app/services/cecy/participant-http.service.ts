import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '@env/environment';
import { ServerResponse } from '@models/core/server.response';
import { Handler } from '../../exceptions/handler';
import { PaginatorModel} from '@models/core';
import { ParticipantUserModel, ParticipantModel } from '@models/cecy';

@Injectable({
  providedIn: 'root'
})

export class ParticipantHttpService {

  private API_URL_PRIVATE: string = `${environment.API_URL_PRIVATE}/participants`;
  private API_URL_PUBLIC: string = `${environment.API_URL_PUBLIC}/participants`;

  private usersList: ServerResponse = {};
  private users = new BehaviorSubject<ServerResponse>({});
  public users$ = this.users.asObservable();

  private participantsList: ServerResponse = {};
  private participants = new BehaviorSubject<ServerResponse>({});
  public participants$ = this.participants.asObservable();

  private participantModel: ParticipantModel = {};
  private participant = new BehaviorSubject<ParticipantModel>({});
  public participant$ = this.participant.asObservable();

  private loaded = new BehaviorSubject<boolean>(true);
  public loaded$ = this.loaded.asObservable();

  private paginator = new BehaviorSubject<PaginatorModel>({ current_page: 1, per_page: 15, total: 0 });
  public paginator$ = this.paginator.asObservable();

  constructor(private httpClient: HttpClient) {
  }

  //Metodos básicos
  getParticipants(page: number = 1, search: string = ''): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}`;

    const params = new HttpParams()
      .set('sort', 'lastname') //optional
      .append('per_page', '10') //optional
      .append('page', page) // conditional
      .append('search', search); // conditional

    this.loaded.next(true);
    return this.httpClient.get<ServerResponse>(url, { params })
      .pipe(
        map(response => response),
        tap(response => {
          this.participantsList = response as ServerResponse;
          this.participants.next(this.participantsList);
          this.loaded.next(false);
          this.paginator.next(response.meta!);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }

  getParticipant(id: number): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${id}`;

    this.loaded.next(true);
    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
          this.participantModel = response.data;
          this.participant.next(this.participantModel);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }

  storeParticipant(participant: ParticipantModel): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/create-participant-user`;

    this.loaded.next(true);

    return this.httpClient.post<ServerResponse>(url, participant)
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
          this.participantsList.data.push(response.data);
          this.participants.next(this.participantsList);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }

  declineParticipant(id: number): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${id}/decline-participant`;

    this.loaded.next(true);

    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
          const index = this.participantsList.data.findIndex((participant: ParticipantModel) => participant.id === response.data.id);
          this.participantsList.data[index] = response.data;
          this.participants.next(this.participantsList);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }
  

  deleteParticipant(id: number): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${id}/destroy-participant`;

    this.loaded.next(true);
    
    return this.httpClient.delete<ServerResponse>(url)
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
          this.participantsList.data = this.participantsList.data.filter((participant: ParticipantModel) => participant.id !== response.data.id);
          this.participants.next(this.participantsList);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }

  deleteUsers(ids: (number | undefined)[]): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/destroys`;

    this.loaded.next(true);
    return this.httpClient.patch<ServerResponse>(url, { ids })
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
          ids.forEach(userId => {
            this.participantsList.data = this.participantsList.data.filter((participant: ParticipantModel) => participant.id !== userId);
          })
          this.participants.next(this.participantsList);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }

  selectUser(participant: ParticipantModel) {
    this.participant.next(participant);
  }

  selectParticipant(participant: ParticipantModel) {
    this.participant.next(participant);
  }

  //Métodos custom

  storeParticipantUser(participantUser: ParticipantUserModel): Observable<ServerResponse> {
    const url = `${this.API_URL_PUBLIC}/registration`;

    this.loaded.next(true);
    return this.httpClient.post<ServerResponse>(url, participantUser)
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
        },error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }

  

  updateParticipantUser(id: number, participant: ParticipantModel) {
    const url = `${this.API_URL_PRIVATE}/${id}/update-participant-user`;
    this.loaded.next(true);

    return this.httpClient.put<ServerResponse>(url, participant)
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
          const index = this.participantsList.data.findIndex((participant: ParticipantModel) => participant.id === response.data.id);
          this.participantsList.data[index] = response.data;
          this.participants.next(this.participantsList);
        }),
        catchError(Handler.render)
      );
  }

  destroyParticipant(id: number): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${id}`;

    this.loaded.next(true);
    return this.httpClient.delete<ServerResponse>(url)
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
          this.participantsList.data = this.participantsList.data.filter((participant: ParticipantModel) => participant.id !== response.data.id);
          this.participants.next(this.participantsList);
        }, error => {
          this.loaded.next(false);
        }),
        catchError(Handler.render)
      );
  }

  uploadFiles(userId: number, data: FormData, params = new HttpParams()): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${userId}/files`;
    const headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');
    return this.httpClient.post<ServerResponse>(url, data, {params, headers})
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }

  uploadOtherFile(data: FormData, params = new HttpParams()): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}`;
    const headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');
    return this.httpClient.post<ServerResponse>(url, data, {params, headers})
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }
  
  getFiles(userId: number, paginator: PaginatorModel = {}, filter: string = ''): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${userId}/files`;
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

  createParticipantUser(participantUser: ParticipantUserModel): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}`;

    this.loaded.next(true);
    return this.httpClient.post<ServerResponse>(url, participantUser)
      .pipe(
        map(response => response),
        tap(response => {
          console.log(response);
          this.loaded.next(false);
          this.usersList.data.push(response.data);
          this.users.next(this.usersList);
        }),
        catchError(Handler.render)
      );
  }
  
  updateParticipantState(id: number) {
    const url = `${this.API_URL_PRIVATE}/${id}/accept-participant`;
    this.loaded.next(true);

    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => response),
        tap(response => {
          this.loaded.next(false);
          const index = this.participantsList.data.findIndex((participant: ParticipantModel) => participant.id === response.data.id);
          this.participantsList.data[index] = response.data;
          this.participants.next(this.participantsList);
        }),
        catchError(Handler.render)
      );
  }
}

