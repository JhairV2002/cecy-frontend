import { Component } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent {

  showNotificationMenu = false;


  openNotification() {
      this.showNotificationMenu = !this.showNotificationMenu;
  }
}
