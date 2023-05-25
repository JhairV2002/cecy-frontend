import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Catalogue } from './catalogue';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {
  constructor(private http: HttpClient) {}
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json' })
  };

  private url: string = 'http://localhost:8082/api/catalogueCecy';

  public findById(id: number): Observable<Catalogue> {
    return this.http.get<Catalogue>(`${this.url}/${id}`, this.httpOptions);
  }

  public findAll(): Observable<Catalogue[]> {
    return this.http.get<Catalogue[]>(`${this.url}/`, this.httpOptions);
  }
}
