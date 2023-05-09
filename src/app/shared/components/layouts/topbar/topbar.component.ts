import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuHttpService } from '@services/core/menu-http.service';
import { AuthHttpService, MessageService } from '@services/core';
import { Router } from '@angular/router';
//import { AuthService } from '@services/core';
import { LayoutService } from '@services/layout.service';
import { AuthService } from '@services/auth';
import { ProfileCustomerDTO, Roles } from '@models/authentication';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TopbarComponent implements OnInit {
  display = false;
  /* items: MenuItem[] = []; */
  visibleSidebar: boolean = false;
  showNav: boolean = true;
  items!: MenuItem[];
  customer: ProfileCustomerDTO[] | null = null;

  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;

  constructor(
    private menuHttpService: MenuHttpService,
    private authHttpService: AuthHttpService,
    private messageService: MessageService,
    private router: Router,
    private authService: AuthService,
    public layoutService: LayoutService
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe(data => {
      console.log('cliente global',data );
      this.customer = data;
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
  }

  logout() {
    this.messageService.showLoading();
    this.authHttpService.logout().subscribe({
      next: (response) => {
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
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
