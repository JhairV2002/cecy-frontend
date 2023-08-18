import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Documents } from '@models/cecy';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  constructor(private http: HttpClient) {}

  private httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })  ,
  };

  private url: string = 'http://localhost:8080/api/prerequisitos';

  public save(prerequisito: Documents): Observable<Documents> {
    return this.http.post<Documents>(this.url+"/", prerequisito, this.httpOptions);
  }
}
