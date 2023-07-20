import { Injectable } from '@angular/core';
import { TopicModel } from '@models/cecy';
import { PaginatorModel } from '@models/cecy';
import { environment } from '@env/environment';
import { catchError, map } from 'rxjs/operators';
import { Handler } from '../../exceptions/handler';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ServerResponse } from '@models/cecy/server.response';
import { MessageService } from '@services/core';

@Injectable({
  providedIn: 'root',
})
export class TopicHttpService {
  private API_URL_PRIVATE: string = `${environment.API_URL_PRIVATE}/courses`;
  private API_URL_PUBLIC: string = `${environment.API_URL_PUBLIC}/courses-guest`;

  private topicsList: ServerResponse = {};

  private topics = new BehaviorSubject<ServerResponse>({});
  public topics$ = this.topics.asObservable();

  private topicModel: TopicModel = {};
  private topic = new BehaviorSubject<TopicModel>({});
  public topic$ = this.topic.asObservable();

  private loaded = new BehaviorSubject<boolean>(true);
  public loaded$ = this.loaded.asObservable();

  private paginator = new BehaviorSubject<PaginatorModel>({
    current_page: 1,
    per_page: 25,
    total: 0,
  });
  public paginator$ = this.paginator.asObservable();

  constructor(
    private httpClient: HttpClient,
    private messageService: MessageService
  ) {}

  getTopics(
    page: number = 1,
    search: string = '',
    courseId: number
  ): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${courseId}/topics`;
    this.loaded.next(true);

    let params = new HttpParams()
      .append('per_page', '15')
      .append('page', page)
      .append('search', search);

    return this.httpClient.get<ServerResponse>(url, { params }).pipe(
      map((response) => response),
      tap(
        (response) => {
          this.topicsList = response as ServerResponse;
          this.topics.next(this.topicsList);
          this.paginator.next(response.meta!);
          this.loaded.next(false);
        },
        (error) => {
          this.loaded.next(false);
        }
      ),
      catchError(Handler.render)
    );
  }

  getTopic(id: number, courseId: number): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${courseId}/topics/${id}`;
    this.loaded.next(true);
    return this.httpClient.get<ServerResponse>(url).pipe(
      map((response) => response),
      tap(
        (response) => {
          this.topicModel = response.data;
          this.topic.next(this.topicModel);
          this.loaded.next(false);
        },
        (error) => {
          this.loaded.next(false);
        }
      ),
      catchError(Handler.render)
    );
  }

  storeTopic(
    topics: TopicModel[],
    courseId: number
  ): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${courseId}/topics`;
    this.loaded.next(true);
    return this.httpClient.post<ServerResponse>(url, { topics }).pipe(
      map((response) => response),
      tap(
        (response) => {
          this.topicsList.data.push(response.data);
          this.topics.next(this.topicsList);
          this.loaded.next(false);
        },
        (error) => {
          this.loaded.next(false);
        }
      ),
      catchError(Handler.render)
    );
  }

  updateTopic(
    id: number | undefined,
    topic: TopicModel[],
    courseId: number
  ): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${courseId}/topics/${id}`;
    this.loaded.next(true);
    return this.httpClient.put<ServerResponse>(url, topic).pipe(
      map((response) => response),
      tap(
        (response) => {
          const index = this.topicsList.data.findIndex(
            (topic: TopicModel) => topic.id === response.data.id
          );
          this.topicsList.data[index] = response.data;
          this.topics.next(this.topicsList);
          this.loaded.next(false);
        },
        (error) => {
          this.loaded.next(false);
        }
      ),
      catchError(Handler.render)
    );
  }

  updateTopics(
    topic: TopicModel[],
    courseId: number
  ): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${courseId}/topics/`;
    this.loaded.next(true);
    return this.httpClient.put<ServerResponse>(url, topic).pipe(
      map((response) => response),
      tap(
        (response) => {
          const index = this.topicsList.data.findIndex(
            (topic: TopicModel) => topic.id === response.data.id
          );
          this.topicsList.data[index] = response.data;
          this.topics.next(this.topicsList);
          this.loaded.next(false);
        },
        (error) => {
          this.loaded.next(false);
        }
      ),
      catchError(Handler.render)
    );
  }

  destroyTopic(
    id: number | undefined,
    courseId: number
  ): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${courseId}/topics/${id}`;
    this.loaded.next(true);
    return this.httpClient.delete<ServerResponse>(url).pipe(
      map((response) => response),
      tap(
        (response) => {
          this.topicsList.data = this.topicsList.data.filter(
            (topic: TopicModel) => topic.id !== response.data.id
          );
          this.topics.next(this.topicsList);
        },
        (error) => {
          this.loaded.next(false);
        }
      ),
      catchError(Handler.render)
    );
  }

  destroysTopics(
    ids: (number | undefined)[],
    courseId: number
  ): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${courseId}/topics/destroys`;
    this.loaded.next(true);
    return this.httpClient.patch<ServerResponse>(url, { ids }).pipe(
      map((response) => response),
      tap(
        (response) => {
          ids.forEach((topicId) => {
            this.topicsList.data = this.topicsList.data.filter(
              (topic: TopicModel) => topic.id !== topicId
            );
          });
          this.topics.next(this.topicsList);
          this.loaded.next(false);
        },
        (error) => {
          this.loaded.next(false);
        }
      ),
      catchError(Handler.render)
    );
  }

  selectTopic(topic: TopicModel) {
    this.topic.next(topic);
  }
  getFiles(
    topicId: number,
    paginator: PaginatorModel = {},
    filter: string = ''
  ): Observable<ServerResponse> {
    const url = `${environment.API_URL_PRIVATE}/topic/${topicId}/file`;
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
    topicId: number,
    data: FormData,
    params = new HttpParams()
  ): Observable<ServerResponse> {
    const url = `${environment.API_URL_PRIVATE}/topic/${topicId}/file`;
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

  getTopicsPublic(
    page: number = 1,
    search: string = '',
    courseId: number
  ): Observable<ServerResponse> {
    const url = `${this.API_URL_PUBLIC}/${courseId}/topics`;
    this.loaded.next(true);

    let params = new HttpParams()
      .append('per_page', '15')
      .append('page', page)
      .append('search', search);

    return this.httpClient.get<ServerResponse>(url, { params }).pipe(
      map((response) => response),
      tap(
        (response) => {
          this.topicsList = response as ServerResponse;
          this.topics.next(this.topicsList);
          this.paginator.next(response.meta!);
          this.loaded.next(false);
        },
        (error) => {
          this.loaded.next(false);
        }
      ),
      catchError(Handler.render)
    );
  }
}
