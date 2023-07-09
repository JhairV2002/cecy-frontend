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
import { AuthHttpService, MessageService } from '@services/core';
import { Router } from '@angular/router';
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
  /* items: MenuItem[] = []; */
  visibleSidebar: boolean = false;
  showNav: boolean = true;
  items!: MenuItem[];
  user: User | null = null;
  planifications: [] = [];
  private _numberNotifications: number = 0;

  tieredItems: MenuItem[] = [];
  name: string | undefined = '';

  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;

  constructor(
    private authHttpService: AuthHttpService,
    private messageService: MessageService,
    private router: Router,
    private authService: AuthService,
    public layoutService: LayoutService,
    private socket: Socket,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('ejecuta topbar');
    this.authService.getProfile().subscribe({
      next: (data: any) => {
        console.log('cliente global', data[0]);
        this.user = data[0];
        this.name = this.user?.names;
        this.socket.emit('app:sendUser', this.user);
      },
      error: (error) => {
        console.error(error);
      },
    });
    this.items = [
      {
        label: 'coNFIRMA',
        icon: 'pi pi-fw pi-user',
        items: [
          { label: 'Anderson asasas' },
          { label: 'Soy el rol de tu corazón' },
          {
            label: 'Mi Perfil',
            icon: 'pi pi-fw pi-users',
            // routerLink:['/footer']
          },
          {
            label: 'Cerrar Sesión',
            icon: 'pi pi-fw pi-sign-out',
            routerLink: ['javascript:void(0)'],
            command: () => {
              this.logout();
            },
          },
        ],
      },
    ];
    // this.socket.on('api:allNotificationByUser', (notification: any) => {
    //   console.log('SOCKET desde API', notification);
    //   this.planifications = notification;
    //   this.updateNumberNotification(this.planifications.length);
    // });
  }

  get numeroNotificaciones(): string {
    return this._numberNotifications.toString();
  }

  updateNumberNotification(newNumber: number): void {
    console.log('NUMERO DE NOTIFICACIONES', newNumber);
    this._numberNotifications = newNumber;
    this.cdRef.detectChanges();
  }

  logout() {
    this.messageService.showLoading();
    this.authHttpService.logout().subscribe({
      next: (response) => {
        localStorage.removeItem('careerSelected');
        this.messageService.success(response);
        this.messageService.hideLoading();
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.messageService.hideLoading();
        this.messageService.error(error);
        this.router.navigate(['/login']);
      },
    });
  }

  onlogout(): void {
    localStorage.removeItem('careerSelected');
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  openNotification() {
    this.notification.emit(true);
  }
}
