import { Injectable } from '@angular/core';
import { Course } from '@models/cecy/secretary-cecy';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class VisualizationCoursesService {
  constructor(private http: HttpClient) {}

  private apiUrl = `${environment.api4}/api/courses`;

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  // public save(curso: Curso): Observable<Curso>{
  //   return this.http.post<Curso>(this.apiUrl+"/save", curso, this.httpOptions);
  // }

  //acceder al curso

  // GET SENCILLO
  getviewCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/state-course/Aprobado`);
  }

  public findById(id: number): Observable<Course> {
    return this.http.get<Course>(this.apiUrl + '/' + id, this.httpOptions);
  }

  // public deleteById(id: number): Observable<Sugerencia>{
  //   return this.http.delete<Sugerencia>(this.apiUrl+"/deleteById/"+id, this.httpOptions);
  // }

  //Lista cursos

  //search cursos
  public findByName(term: string): Observable<Course[]> {
    return this.http.get<Course[]>(
      this.apiUrl + '/findByName/' + term,
      this.httpOptions
    );
  }
}
