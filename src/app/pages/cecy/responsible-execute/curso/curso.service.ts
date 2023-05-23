import { Injectable } from '@angular/core';
import { Curso } from './curso';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@env/environment';
@Injectable({
  providedIn: 'root',
})
export class CursoService {
  constructor(private http: HttpClient) {}

  private apiUrl = `${environment.api3}`;

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  private url: string = 'http://localhost:8081/api/planificacion/cursos';


  //OJO ES LO MISMO CON EL APIURL
  getAll() {
    return this.http.get<Curso>(`${this.apiUrl}/api/planificacion/cursos`);
  }

  public findById(id: number): Observable<Curso> {
    return this.http.get<Curso>(this.url + '/' + id, this.httpOptions);
  }

  public findAll(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.url + '/', this.httpOptions);
  }

  public findByName(term: string): Observable<Curso[]> {
    return this.http.get<Curso[]>(
      this.url + '/findByName/' + term,
      this.httpOptions
    );
  }

  public findBySchoolPeriod(term: string): Observable<Curso[]> {
    return this.http.get<Curso[]>(
      this.url + '/findBySchoolPeriod/' + term,
      this.httpOptions
    );
  }
}
