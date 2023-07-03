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
  private url = `${environment.api2}/courses`
  //private url = 'http://localhost:3000/api/v1/courses/find/instructor/9';

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  getCursos(): Observable<Curso[]> {
    const token = this.tokenService.getToken();
    return this.http.get<Curso[]>(`${this.url}`);
  }
}
