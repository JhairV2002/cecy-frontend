import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Courses } from '@models/cecy';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http: HttpClient) {}

  private apiUrl = `http://localhost:8080/api/courses`;

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  // public save(curso: Curso): Observable<Curso>{
  //   return this.http.post<Curso>(this.apiUrl+"/save", curso, this.httpOptions);
  // }

  //acceder al curso

  // GET SENCILLO
  getviewCourses(): Observable<Courses[]> {
    return this.http.get<Courses[]>(`${this.apiUrl}/state-course/aprobado`);
  }

  public findById(id: number): Observable<Courses> {
    return this.http.get<Courses>(
      this.apiUrl + '/' + id,
      this.httpOptions
    );
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
