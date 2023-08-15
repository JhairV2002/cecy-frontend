import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { Courses } from '@models/cecy';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor(private http: HttpClient) {}

  private apiUrl = `${environment.api}/courses`; //api java
  private apiUrl2 = `${environment.api2}/courses`; //api nodejs

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  // public save(curso: Curso): Observable<Curso>{
  //   return this.http.post<Curso>(this.apiUrl+"/save", curso, this.httpOptions);
  // }

  //acceder al curso

  // GET SENCILLO
  getviewCourses(): Observable<Courses[]> {
    return this.http.get<Courses[]>(`${this.apiUrl}/state-course/aprobado/`);
  }

  public findById(id: number): Observable<Courses> {
    return this.http.get<Courses>(this.apiUrl + '/' + id, this.httpOptions);
  }

  // public deleteById(id: number): Observable<Sugerencia>{
  //   return this.http.delete<Sugerencia>(this.apiUrl+"/deleteById/"+id, this.httpOptions);
  // }

  //Lista cursos

  //search cursos
  public findByName(term: string): Observable<Courses[]> {
    return this.http.get<Courses[]>(
      this.apiUrl + '/findByName/' + term,
      this.httpOptions
    );
  }
}
