import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Institution } from '@models/cecy';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstitutionService {
  constructor(private http: HttpClient) {}

  private httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })  ,
  };

  private url: string = 'http://localhost:8080/api/empresas';

  public save(institution: Institution): Observable<Institution> {
    return this.http.post<Institution>(this.url+"/", institution, this.httpOptions);
  }

  public findByid(id: number): Observable<Institution> {
    return this.http.get<Institution>(`${this.url}/${id}`, this.httpOptions);
  }

  /**
   * findByName
   */
  public findByName(term: string): Observable<Institution[]> {
    return this.http.get<Institution[]>(
      `${this.url}/findByName/${term}`,
      this.httpOptions
    );
  }

  /**
   * findAll
   */
  public findAll(): Observable<Institution[]> {
    return this.http.get<Institution[]>(`${this.url}/`, this.httpOptions);
  }
}
