import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, finalize } from 'rxjs';

import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private http: HttpClient) {}
  private apiUrl = `${environment.api2}/notifications`;
  private loading = new BehaviorSubject<boolean>(true);
  public loading$: Observable<boolean> = this.loading.asObservable();

  markNotificationsAsRead(notificationIds: number[]) {
    console.log('IDS NOTIFICATIONS', notificationIds);
    return this.http.patch<any>(`${this.apiUrl}/markAsRead`, {
      notificationIds,
    });
  }
}
