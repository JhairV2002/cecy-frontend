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
      icon: 'fa-solid fa-key',
      items: [
        {
          label: 'Dashboard',
          icon: 'fa-solid fa-house',
          routerLink: '/administrator/dashboard',
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

    this.model = [
      {
        label: 'Home',
        items: [
          { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
        ],
      },
      {
        label: 'UI Components',
        items: [
          {
            label: 'Form Layout',
            icon: 'pi pi-fw pi-id-card',
            routerLink: ['/uikit/formlayout'],
          },
          {
            label: 'Input',
            icon: 'pi pi-fw pi-check-square',
            routerLink: ['/uikit/input'],
          },
          {
            label: 'Float Label',
            icon: 'pi pi-fw pi-bookmark',
            routerLink: ['/uikit/floatlabel'],
          },
          {
            label: 'Invalid State',
            icon: 'pi pi-fw pi-exclamation-circle',
            routerLink: ['/uikit/invalidstate'],
          },
          {
            label: 'Button',
            icon: 'pi pi-fw pi-box',
            routerLink: ['/uikit/button'],
          },
          {
            label: 'Table',
            icon: 'pi pi-fw pi-table',
            routerLink: ['/uikit/table'],
          },
          {
            label: 'List',
            icon: 'pi pi-fw pi-list',
            routerLink: ['/uikit/list'],
          },
          {
            label: 'Tree',
            icon: 'pi pi-fw pi-share-alt',
            routerLink: ['/uikit/tree'],
          },
          {
            label: 'Panel',
            icon: 'pi pi-fw pi-tablet',
            routerLink: ['/uikit/panel'],
          },
          {
            label: 'Overlay',
            icon: 'pi pi-fw pi-clone',
            routerLink: ['/uikit/overlay'],
          },
          {
            label: 'Media',
            icon: 'pi pi-fw pi-image',
            routerLink: ['/uikit/media'],
          },
          {
            label: 'Menu',
            icon: 'pi pi-fw pi-bars',
            routerLink: ['/uikit/menu'],
            routerLinkActiveOptions: {
              paths: 'subset',
              queryParams: 'ignored',
              matrixParams: 'ignored',
              fragment: 'ignored',
            },
          },
          {
            label: 'Message',
            icon: 'pi pi-fw pi-comment',
            routerLink: ['/uikit/message'],
          },
          {
            label: 'File',
            icon: 'pi pi-fw pi-file',
            routerLink: ['/uikit/file'],
          },
          {
            label: 'Chart',
            icon: 'pi pi-fw pi-chart-bar',
            routerLink: ['/uikit/charts'],
          },
          {
            label: 'Misc',
            icon: 'pi pi-fw pi-circle',
            routerLink: ['/uikit/misc'],
          },
        ],
      },
      {
        label: 'Prime Blocks',
        items: [
          {
            label: 'Free Blocks',
            icon: 'pi pi-fw pi-eye',
            routerLink: ['/blocks'],
            badge: 'NEW',
          },
          {
            label: 'All Blocks',
            icon: 'pi pi-fw pi-globe',
            target: '_blank',
          },
        ],
      },
      {
        label: 'Utilities',
        items: [
          {
            label: 'PrimeIcons',
            icon: 'pi pi-fw pi-prime',
            routerLink: ['/utilities/icons'],
          },
          {
            label: 'PrimeFlex',
            icon: 'pi pi-fw pi-desktop',
            target: '_blank',
          },
        ],
      },
      {
        label: 'Pages',
        icon: 'pi pi-fw pi-briefcase',
        items: [
          {
            label: 'Landing',
            icon: 'pi pi-fw pi-globe',
            routerLink: ['/landing'],
          },
          {
            label: 'Auth',
            icon: 'pi pi-fw pi-user',
            items: [
              {
                label: 'Login',
                icon: 'pi pi-fw pi-sign-in',
                routerLink: ['/auth/login'],
              },
              {
                label: 'Error',
                icon: 'pi pi-fw pi-times-circle',
                routerLink: ['/auth/error'],
              },
              {
                label: 'Access Denied',
                icon: 'pi pi-fw pi-lock',
                routerLink: ['/auth/access'],
              },
            ],
          },
          {
            label: 'Crud',
            icon: 'pi pi-fw pi-pencil',
            routerLink: ['/pages/crud'],
          },
          {
            label: 'Timeline',
            icon: 'pi pi-fw pi-calendar',
            routerLink: ['/pages/timeline'],
          },
          {
            label: 'Not Found',
            icon: 'pi pi-fw pi-exclamation-circle',
            routerLink: ['/notfound'],
          },
          {
            label: 'Empty',
            icon: 'pi pi-fw pi-circle-off',
            routerLink: ['/pages/empty'],
          },
        ],
      },
    ];
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
