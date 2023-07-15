import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';

import { AuthService } from '@services/auth';
import { Notification } from '@models/core/notification';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {
  constructor(private authService: AuthService, private socket: Socket) {}

  sidebarVisible: boolean = false;
  notifications: Notification[] = [];
  loading$ = this.authService.loading$;
  notificationsUnread: [] = [];
  loading: boolean = true;

  ngOnInit(): void {
    this.socket.on('api:notificationReceived', (notification: any) => {
      console.log('ME LLEGO LA NOTIFICACION', notification);
      this.notifications = notification;
    });

    if (this.socket.connect()) {
      this.getAllNOtificationsByUser();
    }
    this.socket.on('api:notificationReceived', (notification: any) => {
      this.notificationsUnread = notification;
    });
  }

  getAllNOtificationsByUser() {
    this.socket.on('api:allNotificationByUser', (notification: any) => {
      this.notifications = notification;
    });
  }

  openNotification() {
    this.sidebarVisible = true;
    if (this.sidebarVisible) {
      this.markNotificationsAsRead();
      this.requestNotifications();
    }
  }

  markNotificationsAsRead(): void {
    const notificationsToMark = this.notifications.filter(
      (notification: any) => !notification.isRead
    );
    if (notificationsToMark.length === 0) {
      return;
    }
    console.log('PASO EL IF ?');
    const notificationIds = notificationsToMark.map(
      (notification) => notification.id
    );
    this.socket.emit(
      'app:updateNotificationsMarkAsRead',
      notificationIds,
      (response: any) => {
        this.notifications.forEach((notification: any) => {
          if (notification.isRead === false) {
            notification.isRead = true;
          }
        });
      }
    );
  }

  requestNotifications() {
    this.authService.user$.subscribe({
      next: (data: any) => {
        if (data !== null) {
          this.socket.emit('app:requestNotificationByUser', data[0]);
          this.socket.on('api:sendNotificationsByUser', (data: any) => {
            this.notifications = data;
            this.notifications.sort((a: any, b: any) => {
              return (
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
              );
            });
            this.loading = false;
          });
          this.socket.on('api:sendNotificationsMarkState', (data: any) => {
            this.notificationsUnread = data;
          });
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  showOptionsMenu(event: MouseEvent): void {
    console.log(event);
    event.stopPropagation();
    // notification.showOptions = !notification.showOptions;
  }

  deleteNotification(notification: any): void {
    // Lógica para eliminar la notificación
  }
}
