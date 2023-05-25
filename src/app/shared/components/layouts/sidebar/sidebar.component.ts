import { Component, ElementRef, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { map, Observable } from 'rxjs';

import { MenuHttpService } from '@services/core/menu-http.service';
import { AuthService } from '@services/auth';
import { LayoutService } from '@services/layout.service';
import { User } from '@models/authentication';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  display = false;
  itemsAdmin: MenuItem[] = [
    {
      label: 'Administrador',
      items: [
        {
          label: 'Inicio',
          icon: 'fa-solid fa-house',
          routerLink: '/administrator/home',
        },
        {
          label: 'Usuarios',
          icon: 'fa-solid fa-users-line',
          routerLink: ['/administrator/users'],
        },
        {
          label: 'Roles',
          icon: 'fa-solid fa-users-gear',
          routerLink: ['/administrator/roles'],
        },
        {
          label: 'Carreras',
          icon: 'fa-solid fa-graduation-cap',
          routerLink: ['/administrator/careers'],
        },
      ],
    },
    {
      label: 'Coordinador de Carrera',
      items: [
        {
          label: 'Inicio',
          icon: 'fa-solid fa-house',
          routerLink: '/cecy/coordinator-career/home',
        },
        {
          label: 'Dashboard',
          icon: 'fa-solid fa-chart-line',
          routerLink: '/cecy/coordinator-career/dashboard',
        },
        {
          label: 'Cursos',
          icon: 'fa-sharp fa-solid fa-check-to-slot',
          routerLink: ['/cecy/coordinator-career/course'],
        },
      ],
    },
    {
      label: 'Coordinador del cecy',
      items: [
        {
          label: 'Inicio',
          icon: 'fa-solid fa-house',
          routerLink: '/cecy/coordinator-cecy/home',
        },
        {
          label: 'Cursos',
          icon: 'fa-sharp fa-solid fa-check-to-slot',
          routerLink: ['/cecy/coordinator-cecy/course'],
        },
      ],
    },
    {
      label: 'Docente responsable',
      items: [
        {
          label: 'Inicio',
          icon: 'fa-solid fa-house',
          routerLink: '/cecy/coordinator-career/home',
        },
        {
          label: 'Tus cursos',
          icon: 'fa-sharp fa-solid fa-check-to-slot',
          routerLink: ['/cecy/coordinator-career/course'],
        },
      ],
    },
  ];
  itemsCoordinatorCareer: MenuItem[] = [
    {
      label: 'Coordinador de Carrera',
      items: [
        {
          label: 'Inicio',
          icon: 'fa-solid fa-house',
          routerLink: '/cecy/coordinator-career/home',
        },
        {
          label: 'Dashboard',
          icon: 'fa-solid fa-chart-line',
          routerLink: '/cecy/coordinator-career/dashboard',
        },
        {
          label: 'Cursos',
          icon: 'fa-sharp fa-solid fa-check-to-slot',
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
          label: 'Inicio',
          icon: 'fa-solid fa-house',
          routerLink: '/cecy/coordinator-cecy/home',
        },
        {
          label: 'Cursos',
          icon: 'fa-sharp fa-solid fa-check-to-slot',
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
          label: 'Inicio',
          icon: 'fa-solid fa-house',
          routerLink: '/cecy/responsible-course/home',
        },
        {
          label: 'Tus cursos',
          icon: 'fa-sharp fa-solid fa-check-to-slot',
          routerLink: ['/cecy/responsible-course'],
        },
        {
          label: 'Mis cursos',
          icon: 'fa-sharp fa-solid fa-check-to-slot',
          routerLink: ['/cecy/responsible-course'],
        },
      ],
    },
  ];
  itemsInstructorExecute: MenuItem[] = [
    {
      label: 'Docente responsable ejecuta',
      items: [
        {
          label: 'Inicio',
          icon: 'fa-solid fa-house',
          routerLink: '/cecy/responsible-execute/home',
        },
        {
          label: 'Mis cursos',
          icon: 'fa-sharp fa-solid fa-check-to-slot',
          routerLink: ['/cecy/responsible-execute/mis-cursos'],
        },

      ],
    },
  ];
  showedMenu: boolean = false;
  closed: boolean = true;
  menu: MenuItem[] = [];
  user: User | null = null;
  model: MenuItem[] = [];

  constructor(
    private menuHttpService: MenuHttpService,
    public layoutService: LayoutService,
    public el: ElementRef,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getProfile().subscribe((user: any) => {
      console.log('SEDEIBAR USER', user[0]);
      this.user = user[0];
    });
  }

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
      map((user) => Boolean(user && allowedRoles.includes(user[0].role.name)))
    );
  }
}
