import {Injectable} from '@angular/core';
import { TopicModel } from '@models/cecy';
import {PaginatorModel} from '@models/cecy';
import {environment} from '@env/environment';
import {catchError, map} from 'rxjs/operators';
import {Handler} from '../../exceptions/handler';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ServerResponse} from '@models/cecy/server.response';

@Injectable({
  providedIn: 'root'
})

export class CertificateHttpService {
  private API_URL_PRIVATE: string = `${environment.API_URL_PRIVATE}/topics`;
  private API_URL_PUBLIC: string = `${environment.API_URL_PUBLIC}/topics`;
  private topicsList: ServerResponse = {};
  private topics = new BehaviorSubject<ServerResponse>({});
  public topics$ = this.topics.asObservable();
  private topicModel: TopicModel = {};
  private topic = new BehaviorSubject<TopicModel>({});
  public topic$ = this.topic.asObservable();

  private loading = new BehaviorSubject<boolean>(true);
  public loading$ = this.loading.asObservable();

  private paginator = new BehaviorSubject<PaginatorModel>({current_page: 1, per_page: 25, total: 0});
  public paginator$ = this.paginator.asObservable();

  constructor(private httpClient: HttpClient) {

  }

  getTopics(page: number = 1, search: string = ''): Observable<ServerResponse> {
    this.loading.next(true);
    const url = `${this.API_URL_PRIVATE}`;
    let params = new HttpParams().set('sort', 'lastname')
      .append('per_page', '10')
      .append('page', page)
      .append('search', search);

    if (search) {
      // params = params.append('search', search);
    }
    return this.httpClient.get<ServerResponse>(url, {params})
      .pipe(
        map(response => response),
        tap(response => {
          this.topicsList = response as ServerResponse;
          this.topics.next(this.topicsList);
          this.loading.next(false);
          this.paginator.next(response.meta!);
        }, error => {
          this.loading.next(false);
        }),
        catchError(Handler.render)
      );
  }

  getTopic(id: number): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${id}`;
    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => response),
        tap(response => {
          this.topicModel = response.data;
          this.topic.next(this.topicModel);
        }),
        catchError(Handler.render)
      );
  }

  storeTopic(topic: TopicModel): Observable<ServerResponse> {
    const url = this.API_URL_PRIVATE + 'topics';
    return this.httpClient.post<ServerResponse>(url, topic)
      .pipe(
        map(response => response),
        tap(response => {
          this.topicsList.data.push(response.data);
          this.topics.next(this.topicsList);
        }),
        catchError(Handler.render)
      );
  }

  updateTopic(id: number | undefined, topic: TopicModel): Observable<ServerResponse> {
    const url = this.API_URL_PRIVATE + 'topics' + id;
    return this.httpClient.put<ServerResponse>(url, topic)
      .pipe(
        map(response => response),
        tap(response => {
          const index = this.topicsList.data.findIndex((topic: TopicModel) => topic.id === response.data.id);
          this.topicsList.data[index] = response.data;
          this.topics.next(this.topicsList);
        }),
        catchError(Handler.render)
      );
  }

  destroyTopic(id: number | undefined): Observable<ServerResponse> {
    const url = this.API_URL_PRIVATE + '/topics/' + id;
    return this.httpClient.delete<ServerResponse>(url)
      .pipe(
        map(response => response),
        tap(response => {
          this.topicsList.data = this.topicsList.data.filter((topic: TopicModel) => topic.id !== response.data.id);
          this.topics.next(this.topicsList);
        }),
        catchError(Handler.render)
      );
  }

  destroysTopics(ids: (number | undefined)[]): Observable<ServerResponse> {
    const url = this.API_URL_PRIVATE + '/topics/destroys';
    return this.httpClient.patch<ServerResponse>(url, {ids})
      .pipe(
        map(response => response),
        tap(response => {
          ids.forEach(topicId => {
            this.topicsList.data = this.topicsList.data.filter((topic: TopicModel) => topic.id !== topicId);
          })
          this.topics.next(this.topicsList);
        }),
        catchError(Handler.render)
      );
  }

  selectUser(topic: TopicModel) {
    this.topic.next(topic);
  }

  getFiles(userId: number, paginator: PaginatorModel = {}, filter: string = ''): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${userId}/file`;
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

  uploadFiles(userId: number, data: FormData, params = new HttpParams()): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${userId}/file`;
    const headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');
    return this.httpClient.post<ServerResponse>(url, data, {params, headers})
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }





}

