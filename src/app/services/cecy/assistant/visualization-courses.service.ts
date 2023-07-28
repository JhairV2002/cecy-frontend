import { Injectable } from '@angular/core';
import { Course } from '@models/cecy/secretary-cecy';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, finalize } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class VisualizationCoursesService {
  constructor(private http: HttpClient) {}

  private apiUrl = `${environment.api2}/courses/state-course/terminado`;
  private apiUrl1 = `${environment.api2}/courses`;
  private loading = new BehaviorSubject<boolean>(true);
  public loading$: Observable<boolean> = this.loading.asObservable();

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  // public save(curso: Curso): Observable<Curso>{
  //   return this.http.post<Curso>(this.apiUrl+"/save", curso, this.httpOptions);
  // }

  //acceder al curso

  // GET SENCILLO
  getviewCourses(): Observable<Course[]> {
    this.loading.next(true);
    return this.http.get<Course[]>(`${this.apiUrl}`).pipe(
      finalize(() => {
        this.loading.next(false);
      })
    );
  }

  public findById(id: number): Observable<Course> {
    this.loading.next(true);
    return this.http.get<Course>(this.apiUrl1 +"/"+ id, this.httpOptions).pipe(
      finalize(() => {
        this.loading.next(false);
      })
    );
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
