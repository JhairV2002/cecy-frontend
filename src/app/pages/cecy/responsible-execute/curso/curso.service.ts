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
    const url = `http://localhost:8080/api/cursos/${cursoId}`;
    const body = { statusCourse: nuevoStatus };
    return this.http.put<Curso>(url, body);
  }
}