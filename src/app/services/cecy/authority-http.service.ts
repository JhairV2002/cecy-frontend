import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '@env/environment';
import { Handler } from '../../exceptions/handler';
import { PaginatorModel } from '@models/core';

@Injectable({
  providedIn: 'root',
})
export class AuthorityHttpService {
  private API_URL_PRIVATE: string = `${environment.API_URL_PRIVATE}/authorities`;
  private API_URL_PUBLIC: string = `${environment.API_URL_PUBLIC}/authorities`;

  private authorityList: any = {};
  private authoritys = new BehaviorSubject<any>({});
  public authoritys$ = this.authoritys.asObservable();

  private authorityModel: any = {};
  private authority = new BehaviorSubject<any>({});

  private loaded = new BehaviorSubject<boolean>(true);
  public loaded$ = this.loaded.asObservable();

  private paginator = new BehaviorSubject<PaginatorModel>({
    current_page: 1,
    per_page: 15,
    total: 0,
  });
  public paginator$ = this.paginator.asObservable();

  constructor(private httpClient: HttpClient) {}

  catalogue(): Observable<any> {
    const url = this.API_URL_PRIVATE + '/catalogue';
    return this.httpClient.patch<any>(url, {});
  }

  getAuthoritys(page: number = 1, search: string = ''): Observable<any> {
    const url = `${this.API_URL_PRIVATE}`;

    const params = new HttpParams()
      .set('sort', 'name')
      .append('per_page', '10')
      .append('page', page)
      .append('search', search);

    this.loaded.next(true);
    return this.httpClient.get<any>(url, { params }).pipe(
      map((response) => response),
      tap(
        (response) => {
          this.authorityList = response as any;
          this.authoritys.next(this.authorityList);
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

  getauthority(id: number): Observable<any> {
    const url = `${this.API_URL_PRIVATE}/${id}`;

    this.loaded.next(true);
    return this.httpClient.get<any>(url).pipe(
      map((response) => response),
      tap(
        (response) => {
          this.loaded.next(false);
          this.authorityModel = response.data;
          this.authority.next(this.authorityModel);
        },
        (error) => {
          this.loaded.next(false);
        }
      ),
      catchError(Handler.render)
    );
  }

  storeAuthority(authority: any): Observable<any> {
    const url = `${this.API_URL_PRIVATE}`;

    this.loaded.next(true);
    return this.httpClient.post<any>(url, authority).pipe(
      map((response) => response),
      tap(
        (response) => {
          this.loaded.next(false);
          this.authorityList.data.push(response.data);
          this.authoritys.next(this.authorityList);
        },
        (error) => {
          this.loaded.next(false);
        }
      ),
      catchError(Handler.render)
    );
  }

  updateAuthority(id: number, authority: any): Observable<any> {
    const url = `${this.API_URL_PRIVATE}/${id}`;

    this.loaded.next(true);
    return this.httpClient.put<any>(url, authority).pipe(
      map((response) => response),
      tap(
        (response) => {
          this.loaded.next(false);
          const index = this.authorityList.data.findIndex(
            (authority: any) => authority.id === response.data.id
          );
          this.authorityList.data[index] = response.data;
          this.authoritys.next(this.authorityList);
        },
        (error) => {
          this.loaded.next(false);
        }
      ),
      catchError(Handler.render)
    );
  }

  deleteAuthority(id: number): Observable<any> {
    const url = `${this.API_URL_PRIVATE}/${id}`;

    this.loaded.next(true);
    return this.httpClient.delete<any>(url).pipe(
      map((response) => response),
      tap(
        (response) => {
          this.loaded.next(false);
          this.authorityList.data = this.authorityList.data.filter(
            (authority: any) => authority.id !== response.data.id
          );
          this.authoritys.next(this.authorityList);
        },
        (error) => {
          this.loaded.next(false);
        }
      ),
      catchError(Handler.render)
    );
  }

  deleteAuthoritys(ids: (number | undefined)[]): Observable<any> {
    const url = `${environment.API_URL_PRIVATE}/authority/destroys`;

    this.loaded.next(true);
    return this.httpClient.patch<any>(url, { ids }).pipe(
      map((response) => response),
      tap(
        (response) => {
          this.loaded.next(false);
          ids.forEach((authorityId) => {
            this.authorityList.data = this.authorityList.data.filter(
              (authority: any) => authority.id !== authorityId
            );
          });
          this.authoritys.next(this.authorityList);
        },
        (error) => {
          this.loaded.next(false);
        }
      ),
      catchError(Handler.render)
    );
  }

  selectAuthority(authority: any) {
    this.authority.next(authority);
  }
}
