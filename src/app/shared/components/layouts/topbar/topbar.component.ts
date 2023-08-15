import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from '@services/layout.service';
import { AuthService } from '@services/auth';
import { User } from '@models/authentication';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class TopbarComponent implements OnInit {
  @Output() notification = new EventEmitter<boolean>();
  display = false;
  visibleSidebar: boolean = false;
  showNav: boolean = true;
  items!: MenuItem[];
  user: User | null = null;

  notifications: [] = [];

  private _numberNotifications: number = 0;

  tieredItems: MenuItem[] = [];
  name: string | undefined = '';

  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;

  constructor(
    private authService: AuthService,
    public layoutService: LayoutService,
    private socket: Socket,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.authService.user$.subscribe({
      next: (data: any) => {
        if (data !== null) {
          this.user = data[0];
          this.name = this.user?.names;
          this.socket.emit('app:sendUser', data[0]);
        }
      },
      error: (error) => {
        console.error(error);
      },
    });

    if (this.socket.connect()) {
      this.socket.on('api:allNotificationByUser', (notification: any) => {
        this.notifications = notification;
        this.notifications.sort((a: any, b: any) => {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        });
      });
    }
  }

  get numeroNotificaciones(): string {
    return this._numberNotifications.toString();
  }

  updateNumberNotification(newNumber: number): void {
    console.log('NUMERO DE NOTIFICACIONES', newNumber);
    this._numberNotifications = newNumber;
    this.cdRef.detectChanges();
  }

  openNotification() {
    this.notification.emit(true);
  }
}
