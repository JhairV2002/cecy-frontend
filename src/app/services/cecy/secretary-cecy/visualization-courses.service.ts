import { Injectable } from '@angular/core';
import { Curso } from '@models/cecy/secretary-cecy';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class VisualizationCoursesService {
  constructor(private http: HttpClient) {}

  private apiUrl = `${environment.api}/api/curso`;

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  // public save(curso: Curso): Observable<Curso>{
  //   return this.http.post<Curso>(this.apiUrl+"/save", curso, this.httpOptions);
  // }

  //acceder al curso

  // GET SENCILLO
  getviewCourses() {
    return this.http.get(`${this.apiUrl}/edit/:id`);
  }

  public findById(id: number): Observable<Curso> {
    return this.http.get<Curso>(
      this.apiUrl + '/' + id + '/',
      this.httpOptions
    );
  }

  // public deleteById(id: number): Observable<Sugerencia>{
  //   return this.http.delete<Sugerencia>(this.apiUrl+"/deleteById/"+id, this.httpOptions);
  // }

  //Lista cursos
  public findAll(): Observable<Curso[]> {
    return this.http.get<Curso[]>(
      this.apiUrl + '/',
      this.httpOptions
    );
  }

  //search cursos
  public findByName(term: string): Observable<Curso[]> {
    return this.http.get<Curso[]>(
      this.apiUrl + '/findByName/' + term,
      this.httpOptions
    );
  }
}
