import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '@env/environment';
import { Handler } from '../../exceptions/handler';
import { SchoolPeriodModel } from '@models/cecy';

@Injectable({
  providedIn: 'root',
})
export class SchoolPeriodHttpService {
  private API_URL_PRIVATE: string = `${environment.API_URL_PRIVATE}/school-periods`;
  private API_URL_PUBLIC: string = `${environment.API_URL_PUBLIC}/school-periods`;

  private schoolPeriodsList: any = {};
  private schoolPeriods = new BehaviorSubject<any>({});
  public schoolPeriods$ = this.schoolPeriods.asObservable();

  private schoolPeriodModel: SchoolPeriodModel = {};
  private schoolPeriod = new BehaviorSubject<any>({});
  public schoolPeriod$ = this.schoolPeriod.asObservable();

  private loaded = new BehaviorSubject<boolean>(true);
  public loaded$ = this.loaded.asObservable();

  private paginator = new BehaviorSubject<any>({
    current_page: 1,
    per_page: 15,
    total: 0,
  });
  public paginator$ = this.paginator.asObservable();

  constructor(private httpClient: HttpClient) {}

  getSchoolPeriods(page: number = 1, search: string = ''): Observable<any> {
    const url = `${this.API_URL_PRIVATE}`;

    const params = new HttpParams()
      .set('sort', 'code')
      .append('page', page)
      .append('search', search);
    this.loaded.next(true);
    return this.httpClient.get<any>(url, { params }).pipe(
      map((response) => response),
      tap(
        (response) => {
          this.schoolPeriodsList = response as any;
          this.schoolPeriods.next(this.schoolPeriodsList);
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

  getSchoolPeriod(id: number): Observable<any> {
    const url = `${this.API_URL_PRIVATE}/${id}`;

    this.loaded.next(true);
    return this.httpClient.get<any>(url).pipe(
      map((response) => response),
      tap(
        (response) => {
          this.loaded.next(false);
          this.schoolPeriodModel = response.data;
        },
        (error) => {
          this.loaded.next(false);
        }
      ),
      catchError(Handler.render)
    );
  }
  getCurrentSchoolPeriod(): Observable<any> {
    const url = `${this.API_URL_PRIVATE}/current`;

    this.loaded.next(true);
    return this.httpClient.get<any>(url).pipe(
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

  storeSchoolPeriod(schoolPeriod: SchoolPeriodModel): Observable<any> {
    const url = `${this.API_URL_PRIVATE}`;
    this.loaded.next(true);
    return this.httpClient.post<any>(url, schoolPeriod).pipe(
      map((response) => response),
      tap(
        (response) => {
          this.loaded.next(false);
          this.schoolPeriodsList.data.push(response.data);
          this.schoolPeriods.next(this.schoolPeriodsList);
        },
        (error) => {
          this.loaded.next(false);
        }
      ),
      catchError(Handler.render)
    );
  }

  updateSchoolPeriod(
    id: number,
    schoolPeriod: SchoolPeriodModel
  ): Observable<any> {
    const url = `${this.API_URL_PRIVATE}/${id}`;
    this.loaded.next(true);
    return this.httpClient.put<any>(url, schoolPeriod).pipe(
      map((response) => response),
      tap(
        (response) => {
          this.loaded.next(false);
          const index = this.schoolPeriodsList.data.findIndex(
            (schoolPeriod: SchoolPeriodModel) =>
              schoolPeriod.id === response.data.id
          );
          this.schoolPeriodsList.data[index] = response.data;
          this.schoolPeriods.next(this.schoolPeriodsList);
        },
        (error) => {
          this.loaded.next(false);
        }
      ),
      catchError(Handler.render)
    );
  }

  deleteSchoolPeriod(id: number): Observable<any> {
    const url = `${this.API_URL_PRIVATE}/${id}`;

    this.loaded.next(true);
    return this.httpClient.delete<any>(url).pipe(
      map((response) => response),
      tap(
        (response) => {
          this.loaded.next(false);
          this.schoolPeriodsList.data = this.schoolPeriodsList.data.filter(
            (schoolPeriod: SchoolPeriodModel) =>
              schoolPeriod.id !== response.data.id
          );
          this.schoolPeriods.next(this.schoolPeriodsList);
        },
        (error) => {
          this.loaded.next(false);
        }
      ),
      catchError(Handler.render)
    );
  }

  deleteSchoolPeriods(ids: (number | undefined)[]): Observable<any> {
    const url = `${this.API_URL_PRIVATE}/destroys`;

    this.loaded.next(true);
    return this.httpClient.patch<any>(url, { ids }).pipe(
      map((response) => response),
      tap(
        (response) => {
          this.loaded.next(false);
          ids.forEach((schoolPeriodId) => {
            this.schoolPeriodsList.data = this.schoolPeriodsList.data.filter(
              (schoolPeriod: SchoolPeriodModel) =>
                schoolPeriod.id !== schoolPeriodId
            );
          });
          this.schoolPeriods.next(this.schoolPeriodsList);
        },
        (error) => {
          this.loaded.next(false);
        }
      ),
      catchError(Handler.render)
    );
  }

  selectSchoolPeriod(schoolPeriod: any) {
    this.schoolPeriod.next(schoolPeriod);
  }
}
