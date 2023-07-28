import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Asistencia } from './asistencia.model';
import { BehaviorSubject, Observable, finalize } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class AsistenciaService {
  private apiUrl = `${environment.api2}/attendances`;
  private matriculasUrl = 'http://localhost:8080/api/matriculas/';
  private loading = new BehaviorSubject<boolean>(true);
  public loading$: Observable<boolean> = this.loading.asObservable();

  constructor(private http: HttpClient) {}

  getAttendanceAll() {
    this.loading.next(true);
    return this.http.get<Asistencia[]>(`${this.apiUrl}`).pipe(
      finalize(() => {
        this.loading.next(false);
      })
    );
  }

  getAttendanceById(asistenciaId: number) {
    this.loading.next(true);
    return this.http.get<Asistencia[]>(`${this.apiUrl}/${asistenciaId}`).pipe(
      finalize(() => {
        this.loading.next(false);
      })
    );
  }

  getAttendanceByIdCourse(courseId: number) {
    this.loading.next(true);
    return this.http
      .get<Asistencia[]>(`${this.apiUrl}/courses/${courseId}`)
      .pipe(
        finalize(() => {
          this.loading.next(false);
        })
      );
  }

  createAttendance(attendance: any) {
    this.loading.next(true);
    return this.http.post<Asistencia>(`${this.apiUrl}`, attendance).pipe(
      finalize(() => {
        this.loading.next(false);
      })
    );
  }

  updateAttendance(newAttendance: any, asistenciaId: number) {
    this.loading.next(true);
    return this.http.put(`${this.apiUrl}/${asistenciaId}`, newAttendance).pipe(
      finalize(() => {
        this.loading.next(false);
      })
    );
  }

  deleteAttendanceById(id: number) {
    this.loading.next(true);
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      finalize(() => {
        this.loading.next(false);
      })
    );
  }
}
