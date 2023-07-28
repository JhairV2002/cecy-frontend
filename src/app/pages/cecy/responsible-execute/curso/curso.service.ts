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

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  getCursosByInstructor(instructorId: any): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.apiUrl}/find/instructor/${instructorId}`);
  }

  getCursoById(cursoId: number): Observable<Curso> {
    const url = `http://localhost:8080/api/cursos/${cursoId}`;
    return this.http.get<Curso>(url);
  }

  actualizarStatusCurso(cursoId: number, nuevoStatus: string): Observable<Curso> {
    const url = `http://localhost:3000/api/v1/courses/change-course/${cursoId}/state-change/${nuevoStatus}`;
    const body = { statusCourse: nuevoStatus };
    return this.http.patch<Curso>(url, body);
  }
}
