import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Comment } from '@models/cecy/coordinator-cecy';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private apiUrl = `${environment.api2}/comments`;
  private loading = new BehaviorSubject<boolean>(true);
  public loading$: Observable<boolean> = this.loading.asObservable();

  constructor(private http: HttpClient) {}

  getCommentsAll() {
    return this.http.get<Comment[]>(`${this.apiUrl}`);
  }

  getCommentsById(id: number) {
    return this.http.get<Comment[]>(`${this.apiUrl}/${id}`);
  }

  createComment(comment: any) {
    return this.http.post(`${this.apiUrl}`, comment);
  }
  updateComment(id: number, comment: Comment) {
    return this.http.put(`${this.apiUrl}/${id}`, comment);
  }

  deleteComment(id: any) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
