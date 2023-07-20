import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '@env/environment';
import { Handler } from '../../exceptions/handler';
import { CatalogueModel, PlanificationModel } from '@models/cecy';

@Injectable({
  providedIn: 'root',
})
export class CatalogueHttpService {
  private API_URL_PRIVATE: string = `${environment.API_URL_PRIVATE}`;
  private API_URL_PUBLIC: string = `${environment.API_URL_PUBLIC}`;

  private cataloguesList: any = {};
  private catalogues = new BehaviorSubject<any>({});
  public catalogues$ = this.catalogues.asObservable();

  private catalogueModel: CatalogueModel = {};
  private catalogue = new BehaviorSubject<PlanificationModel>({});
  public catalogue$ = this.catalogue.asObservable();

  private loaded = new BehaviorSubject<boolean>(true);
  public loaded$ = this.loaded.asObservable();

  private paginator = new BehaviorSubject<any>({
    current_page: 1,
    per_page: 25,
    total: 0,
  });
  public paginator$ = this.paginator.asObservable();

  constructor(private httpClient: HttpClient) {}

  //Básicos
  getCatalogues(type: string): Observable<any> {
    const url = `${this.API_URL_PUBLIC}/cecy-catalogue/catalogue`;

    const params = new HttpParams().append('type', type);

    this.loaded.next(true);
    return this.httpClient.get<any>(url, { params }).pipe(
      map((response) => response),
      tap(
        (response) => {
          this.cataloguesList = response as any;
          this.catalogues.next(this.cataloguesList);
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

  getPeriodCatalogues(type: string): Observable<any> {
    const url = `${this.API_URL_PRIVATE}/catalogue/catalogue`;

    const params = new HttpParams().append('type', type);

    this.loaded.next(true);
    return this.httpClient.get<any>(url, { params }).pipe(
      map((response) => response),
      tap(
        (response) => {
          this.cataloguesList = response as any;
          this.catalogues.next(this.cataloguesList);
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
}
