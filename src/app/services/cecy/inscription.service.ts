import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Inscription } from '@models/cecy';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {
  constructor(private http: HttpClient) {}

  private httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })  ,
  };

  private url: string = 'http://localhost:8080/api/formInscription';

  public save(inscription: Inscription): Observable<Inscription> {
    return this.http.post<Inscription>(this.url+"/", inscription, this.httpOptions);
  }

  public findByid(id: number): Observable<Inscription> {
    return this.http.get<Inscription>(`${this.url}/${id}/`, this.httpOptions);
  }

  /**
   * findByName
   */
  public findByName(term: string): Observable<Inscription[]> {
    return this.http.get<Inscription[]>(
      `${this.url}/findByName/${term}`,
      this.httpOptions
    );
  }

  public findByUser(term: number): Observable<Inscription[]> {
    return this.http.get<Inscription[]>(
      `${this.url}/findByUser/${term}`,
      this.httpOptions
    );
  }

  /**
   * findAll
   */
  public findAll(): Observable<Inscription[]> {
    return this.http.get<Inscription[]>(`${this.url}/`, this.httpOptions);
  }
  /**
   * deleteByid
   */
  public deleteByid(id: number): Observable<Inscription> {
    return this.http.delete<Inscription>(
      `${this.url}/deleteById/${id}`,
      this.httpOptions
    );
  }
}

