import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Signature } from '@models/cecy/coordinator-cecy';
import { BehaviorSubject, Observable, finalize } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignatureService {
  private apiUrl = `${environment.api2}/signatures`;
  private loading = new BehaviorSubject<boolean>(true);
  public loading$: Observable<boolean> = this.loading.asObservable();

  constructor(private http: HttpClient) {}

  getSignaturesAll() {
    this.loading.next(true);
    return this.http.get<Signature[]>(`${this.apiUrl}`).pipe(
      finalize(() => {
        this.loading.next(false);
      })
    );
  }
  getSignatureById(id: number) {
    this.loading.next(true);
    return this.http.get<Signature>(`${this.apiUrl}/${id}`).pipe(
      finalize(() => {
        this.loading.next(false);
      })
    );
  }

  search(searchTerm: string) {
    this.loading.next(true);
    const params = new HttpParams().set('query', searchTerm);
    return this.http
      .get<any>(`${this.apiUrl}/search`, {
        params,
      })
      .pipe(
        finalize(() => {
          this.loading.next(false);
        })
      );
  }

  createSignature(signature: any) {
    this.loading.next(true);
    return this.http.post(`${this.apiUrl}`, signature).pipe(
      finalize(() => {
        this.loading.next(false);
      })
    );
  }

  updateByIdSignature(newSignature: any, id: number) {
    this.loading.next(true);
    return this.http.put(`${this.apiUrl}/${id}`, newSignature).pipe(
      finalize(() => {
        this.loading.next(false);
      })
    );
  }

  deleteByIdSignature(id: number) {
    this.loading.next(true);
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      finalize(() => {
        this.loading.next(false);
      })
    );
  }
}
