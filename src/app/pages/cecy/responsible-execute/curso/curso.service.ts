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
import { TokenService } from '@services/auth';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class CursoService {
  private apiUrl = `${environment.api2}/courses`;
  //private url = 'http://localhost:3000/api/v1/courses/find/instructor/9';

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  // getCursos(): Observable<Curso[]> {
  //   const token = this.tokenService.getToken();
  //   return this.http.get<Curso[]>(`${this.url}`);
  // }
  getCursosByInstructor(instructorId: any): Observable<Curso[]> {
    return this.http.get<Curso[]>(
      `${this.apiUrl}/find/instructor/${instructorId}`
      // http://localhost:3000/api/v1/courses/find/instructor/12
    );
  }
}
