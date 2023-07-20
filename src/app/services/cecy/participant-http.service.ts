import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '@env/environment';
import { Handler } from '../../exceptions/handler';
import { PaginatorModel } from '@models/core';
import {  } from '@models/cecy';

@Injectable({
  providedIn: 'root',
})
export class ParticipantHttpService {
  private API_URL_PRIVATE: string = `${environment.API_URL_PRIVATE}/participants`;
  private API_URL_PUBLIC: string = `${environment.API_URL_PUBLIC}/participants`;

  private usersList: any = {};
  private users = new BehaviorSubject<any>({});
  public users$ = this.users.asObservable();

  private participantsList: any = {};
  private participants = new BehaviorSubject<any>({});
  public participants$ = this.participants.asObservable();

  private participantModel: any = {};
  private participant = new BehaviorSubject<any>({});
  public participant$ = this.participant.asObservable();

  private loaded = new BehaviorSubject<boolean>(true);
  public loaded$ = this.loaded.asObservable();

  private paginator = new BehaviorSubject<PaginatorModel>({
    current_page: 1,
    per_page: 15,
    total: 0,
  });
  public paginator$ = this.paginator.asObservable();

  constructor(private httpClient: HttpClient) {}

  //Metodos básicos
  getParticipants(page: number = 1, search: string = ''): Observable<any> {
    const url = `${this.API_URL_PRIVATE}`;

    const params = new HttpParams()
      .set('sort', 'lastname') //optional
      .append('per_page', '10') //optional
      .append('page', page) // conditional
      .append('search', search); // conditional

    this.loaded.next(true);
    return this.httpClient.get<any>(url, { params }).pipe(
      map((response) => response),
      tap(
        (response) => {
          this.participantsList = response as any;
          this.participants.next(this.participantsList);
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

  getParticipant(id: number): Observable<any> {
    const url = `${this.API_URL_PRIVATE}/${id}`;

    this.loaded.next(true);
    return this.httpClient.get<any>(url).pipe(
      map((response) => response),
      tap(
        (response) => {
          this.loaded.next(false);
          this.participantModel = response.data;
          this.participant.next(this.participantModel);
        },
        (error) => {
          this.loaded.next(false);
        }
      ),
      catchError(Handler.render)
    );
  }

  storeParticipant(participant: any): Observable<any> {
    const url = `${this.API_URL_PRIVATE}/create-participant-user`;

    this.loaded.next(true);

    return this.httpClient.post<any>(url, participant).pipe(
      map((response) => response),
      tap(
        (response) => {
          this.loaded.next(false);
          this.participantsList.data.push(response.data);
          this.participants.next(this.participantsList);
        },
        (error) => {
          this.loaded.next(false);
        }
      ),
      catchError(Handler.render)
    );
  }

  declineParticipant(id: number): Observable<any> {
    const url = `${this.API_URL_PRIVATE}/${id}/decline-participant`;

    this.loaded.next(true);

    return this.httpClient.get<any>(url).pipe(
      map((response) => response),
      tap(
        (response) => {
          this.loaded.next(false);
          const index = this.participantsList.data.findIndex(
            (participant: any) =>
              participant.id === response.data.id
          );
          this.participantsList.data[index] = response.data;
          this.participants.next(this.participantsList);
        },
        (error) => {
          this.loaded.next(false);
        }
      ),
      catchError(Handler.render)
    );
  }

  deleteParticipant(id: number): Observable<any> {
    const url = `${this.API_URL_PRIVATE}/${id}/destroy-participant`;

    this.loaded.next(true);

    return this.httpClient.delete<any>(url).pipe(
      map((response) => response),
      tap(
        (response) => {
          this.loaded.next(false);
          this.participantsList.data = this.participantsList.data.filter(
            (participant: any) =>
              participant.id !== response.data.id
          );
          this.participants.next(this.participantsList);
        },
        (error) => {
          this.loaded.next(false);
        }
      ),
      catchError(Handler.render)
    );
  }

  deleteUsers(ids: (number | undefined)[]): Observable<any> {
    const url = `${this.API_URL_PRIVATE}/destroys`;

    this.loaded.next(true);
    return this.httpClient.patch<any>(url, { ids }).pipe(
      map((response) => response),
      tap(
        (response) => {
          this.loaded.next(false);
          ids.forEach((userId) => {
            this.participantsList.data = this.participantsList.data.filter(
              (participant: any) => participant.id !== userId
            );
          });
          this.participants.next(this.participantsList);
        },
        (error) => {
          this.loaded.next(false);
        }
      ),
      catchError(Handler.render)
    );
  }

  selectUser(participant: any) {
    this.participant.next(participant);
  }

  selectParticipant(participant: any) {
    this.participant.next(participant);
  }

  //Métodos custom

  storeParticipantUser(participantUser: any): Observable<any> {
    const url = `${this.API_URL_PUBLIC}/registration`;

    this.loaded.next(true);
    return this.httpClient.post<any>(url, participantUser).pipe(
      map((response) => response),
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

  updateParticipantUser(id: number, participant: any) {
    const url = `${this.API_URL_PRIVATE}/${id}/update-participant-user`;
    this.loaded.next(true);

    return this.httpClient.put<any>(url, participant).pipe(
      map((response) => response),
      tap((response) => {
        this.loaded.next(false);
        const index = this.participantsList.data.findIndex(
          (participant: any) => participant.id === response.data.id
        );
        this.participantsList.data[index] = response.data;
        this.participants.next(this.participantsList);
      }),
      catchError(Handler.render)
    );
  }

  destroyParticipant(id: number): Observable<any> {
    const url = `${this.API_URL_PRIVATE}/${id}`;

    this.loaded.next(true);
    return this.httpClient.delete<any>(url).pipe(
      map((response) => response),
      tap(
        (response) => {
          this.loaded.next(false);
          this.participantsList.data = this.participantsList.data.filter(
            (participant: any) =>
              participant.id !== response.data.id
          );
          this.participants.next(this.participantsList);
        },
        (error) => {
          this.loaded.next(false);
        }
      ),
      catchError(Handler.render)
    );
  }

  uploadFiles(
    userId: number,
    data: FormData,
    params = new HttpParams()
  ): Observable<any> {
    const url = `${this.API_URL_PRIVATE}/${userId}/files`;
    const headers = new HttpHeaders().set(
      'Content-Type',
      'multipart/form-data'
    );
    return this.httpClient.post<any>(url, data, { params, headers }).pipe(
      map((response) => response),
      catchError(Handler.render)
    );
  }

  uploadOtherFile(data: FormData, params = new HttpParams()): Observable<any> {
    const url = `${this.API_URL_PRIVATE}`;
    const headers = new HttpHeaders().set(
      'Content-Type',
      'multipart/form-data'
    );
    return this.httpClient.post<any>(url, data, { params, headers }).pipe(
      map((response) => response),
      catchError(Handler.render)
    );
  }

  getFiles(
    userId: number,
    paginator: PaginatorModel = {},
    filter: string = ''
  ): Observable<any> {
    const url = `${this.API_URL_PRIVATE}/${userId}/files`;
    let params = new HttpParams()
      .set('page', paginator.current_page!)
      .set('per_page', paginator.per_page!);
    // El filtro depende de los campos propios que sean cadenas de texto
    if (filter !== '') {
      params = params.append('name', filter).append('description', filter);
    }
    return this.httpClient.get<any>(url, { params }).pipe(
      map((response) => response),
      catchError(Handler.render)
    );
  }

  createParticipantUser(
    participantUser: any
  ): Observable<any> {
    const url = `${this.API_URL_PRIVATE}`;

    this.loaded.next(true);
    return this.httpClient.post<any>(url, participantUser).pipe(
      map((response) => response),
      tap((response) => {
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

    return this.httpClient.get<any>(url).pipe(
      map((response) => response),
      tap((response) => {
        this.loaded.next(false);
        const index = this.participantsList.data.findIndex(
          (participant: any) => participant.id === response.data.id
        );
        this.participantsList.data[index] = response.data;
        this.participants.next(this.participantsList);
      }),
      catchError(Handler.render)
    );
  }
}
