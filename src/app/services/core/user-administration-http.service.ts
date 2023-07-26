import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '@env/environment';
import { Handler } from '../../exceptions/handler';

@Injectable({
  providedIn: 'root',
})
export class UserAdministrationHttpService {
  private API_URL_PRIVATE: string = `${environment.API_URL_PRIVATE}`;
  private API_URL_PUBLIC: string = `${environment.API_URL_PUBLIC}`;

  private usersList: any = {};
  private users = new BehaviorSubject<any>({});
  public users$ = this.users.asObservable();

  private userModel: any = {};
  private user = new BehaviorSubject<any>({});
  public user$ = this.user.asObservable();

  private loaded = new BehaviorSubject<boolean>(true);
  public loaded$ = this.loaded.asObservable();

  private paginator = new BehaviorSubject<any>({
    current_page: 1,
    per_page: 15,
    total: 0,
  });
  public paginator$ = this.paginator.asObservable();

  constructor(private httpClient: HttpClient) {}

  getUsers(page: number = 1, search: string = ''): Observable<any> {
    const url = `${this.API_URL_PRIVATE}/users`;

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
          this.usersList = response as any;
          this.users.next(this.usersList);
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

  getUser(id: number): Observable<any> {
    const url = `${this.API_URL_PRIVATE}/users/${id}`;

    this.loaded.next(true);
    return this.httpClient.get<any>(url).pipe(
      map((response) => response),
      tap(
        (response) => {
          this.loaded.next(false);
          this.userModel = response.data;
          this.user.next(this.userModel);
        },
        (error) => {
          this.loaded.next(false);
        }
      ),
      catchError(Handler.render)
    );
  }

  storeUser(user: any): Observable<any> {
    const url = `${this.API_URL_PRIVATE}/users`;

    this.loaded.next(true);
    return this.httpClient.post<any>(url, user).pipe(
      map((response) => response),
      tap(
        (response) => {
          this.loaded.next(false);
          this.usersList.data.push(response.data);
          this.users.next(this.usersList);
        },
        (error) => {
          this.loaded.next(false);
        }
      ),
      catchError(Handler.render)
    );
  }

  updateUser(id: number, user: any): Observable<any> {
    const url = `${this.API_URL_PRIVATE}/users/${id}`;

    this.loaded.next(true);
    return this.httpClient.put<any>(url, user).pipe(
      map((response) => response),
      tap(
        (response) => {
          this.loaded.next(false);
          const index = this.usersList.data.findIndex(
            (user: any) => user.id === response.data.id
          );
          this.usersList.data[index] = response.data;
          this.users.next(this.usersList);
        },
        (error) => {
          this.loaded.next(false);
        }
      ),
      catchError(Handler.render)
    );
  }

  deleteUser(id: number): Observable<any> {
    const url = `${this.API_URL_PRIVATE}/users/${id}`;

    this.loaded.next(true);
    return this.httpClient.delete<any>(url).pipe(
      map((response) => response),
      tap(
        (response) => {
          this.loaded.next(false);
          this.usersList.data = this.usersList.data.filter(
            (user: any) => user.id !== response.data.id
          );
          this.users.next(this.usersList);
        },
        (error) => {
          this.loaded.next(false);
        }
      ),
      catchError(Handler.render)
    );
  }

  deleteUsers(ids: (number | undefined)[]): Observable<any> {
    const url = `${this.API_URL_PRIVATE}/user/destroys`;

    this.loaded.next(true);
    return this.httpClient.patch<any>(url, { ids }).pipe(
      map((response) => response),
      tap(
        (response) => {
          this.loaded.next(false);
          ids.forEach((userId) => {
            this.usersList.data = this.usersList.data.filter(
              (user: any) => user.id !== userId
            );
          });
          this.users.next(this.usersList);
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
    const url = `${this.API_URL_PRIVATE}/users/${userId}/files`;
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
    const url = `${this.API_URL_PRIVATE}/users`;
    const headers = new HttpHeaders().set(
      'Content-Type',
      'multipart/form-data'
    );
    return this.httpClient.post<any>(url, data, { params, headers }).pipe(
      map((response) => response),
      catchError(Handler.render)
    );
  }

  uploadOtherIdFile(
    id: number,
    data: FormData,
    params = new HttpParams()
  ): Observable<any> {
    const url = `${this.API_URL_PRIVATE}/users/${id}`;
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
    paginator: any = {},
    filter: string = ''
  ): Observable<any> {
    const url = `${this.API_URL_PRIVATE}/users/${userId}/files`;
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

  downloadFile(file: any) {
    this.getFile(file.id!).subscribe((response) => {
      const binaryData = [] as BlobPart[];
      binaryData.push(response as BlobPart);
      const filePath = URL.createObjectURL(
        new Blob(binaryData, { type: 'pdf' })
      );
      const downloadLink = document.createElement('a');
      downloadLink.href = filePath;
      downloadLink.setAttribute('download', file.fullName!);
      document.body.appendChild(downloadLink);
      downloadLink.click();
    });
  }

  getFile(fileId: number, params = new HttpParams()) {
    const url = `${this.API_URL_PRIVATE}/file/${fileId}/download`;
    return this.httpClient.get(url, { params, responseType: 'blob' as 'json' });
  }

  selectUser(user: any) {
    this.user.next(user);
  }

  getUsersArentInstructors() {
    const url = `${this.API_URL_PRIVATE}/user/users-arent-instructors`;

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

  getUsersAreInstructors() {
    const url = `${this.API_URL_PRIVATE}/user/users-are-instructors`;

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
}
