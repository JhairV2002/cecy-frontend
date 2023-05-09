import { Component, ElementRef, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { map, Observable } from 'rxjs';

import { MenuHttpService } from '@services/core/menu-http.service';
import { AuthService } from '@services/auth';
import { LayoutService } from '@services/layout.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  display = false;
  itemsAdmin: MenuItem[] = [
    {
      label: 'Admnistrador',
      items: [
        {
          label: 'Dashboard',
          icon: 'pi pi-chart-pie',
          routerLink: '/user-administration/dashboard',
        },
        {
          label: 'Usuarios',
          icon: 'pi pi-user',
          routerLink: ['/user-administration/admin'],
        },
      ],
    },
    {
      label: 'Coordinador de Carrera',
      items: [
        {
          label: 'Dashboard',
          icon: 'pi pi-chart-pie',
          routerLink: '/cecy/coordinator-career/dashboard',
        },
        {
          label: 'Cursos',
          icon: 'pi pi-check-square',
          routerLink: ['/cecy/coordinator-career/course'],
        },
      ],
    },
    {
      label: 'Coordinador del cecy',
      items: [
        {
          label: 'Cursos',
          icon: 'pi pi-check-square',
          routerLink: ['/cecy/coordinator-cecy/course'],
        },
      ],
    },
    {
      label: 'Docente responsable',
      items: [
        {
          label: 'Tus cursos',
          icon: 'pi pi-check-square',
          routerLink: ['/cecy/responsible-course'],
        },
      ],
    },
  ];
  itemsCoordinatorCareer: MenuItem[] = [
    {
      label: 'Coordinador de Carrera',
      items: [
        {
          label: 'Dashboard',
          icon: 'pi pi-chart-pie',
          routerLink: '/cecy/coordinator-career/dashboard',
        },
        {
          label: 'Cursos',
          icon: 'pi pi-check-square',
          routerLink: ['/cecy/coordinator-career/course'],
        },
      ],
    },
  ];
  itemsCoordinatorCecy: MenuItem[] = [
    {
      label: 'Coordinador del cecy',
      items: [
        {
          label: 'Cursos',
          icon: 'pi pi-check-square',
          routerLink: ['/cecy/coordinator-cecy/course'],
        },
      ],
    },
  ];
  itemsDocente: MenuItem[] = [
    {
      label: 'Docente responsable',
      items: [
        {
          label: 'Tus cursos',
          icon: 'pi pi-check-square',
          routerLink: ['/cecy/responsible-course'],
        },
      ],
    },
  ];
  showedMenu: boolean = false;
  closed: boolean = true;
  menu: MenuItem[] = [];

  constructor(
    private menuHttpService: MenuHttpService,
    public layoutService: LayoutService,
    public el: ElementRef,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  showSubMenu(id: number = 0) {
    this.showedMenu = !this.showedMenu;
    if (id != null) {
      document.getElementById(id?.toString())!.className = this.showedMenu
        ? 'showMenu'
        : '';
    }
  }

  closeSide() {
    this.closed = !this.closed;
  }

  userRoleIn(allowedRoles: any): Observable<boolean> {
    return this.authService.user$.pipe(
      map((user) => Boolean(user && allowedRoles.includes(user[0].role)))
    );
  }
}
