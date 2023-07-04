/* import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curso } from './curso';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private url = 'http://localhost:8080/api/courses/state-course/aprobado/';

  constructor(private http: HttpClient) { }

  getCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.url);
  }
}
 */

// curso.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curso } from './curso';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private apiUrl = 'http://localhost:8080/api/courses/find/instructor/';

  constructor(private http: HttpClient) {}

  getCursosByInstructor(instructorId: number): Observable<Curso[]> {
    const url = `${this.apiUrl}${instructorId}`;

    return this.http.get<Curso[]>(url);
  }
}
