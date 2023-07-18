import { Component, ElementRef, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { map, Observable } from 'rxjs';

import { AuthService } from '@services/auth';
import { LayoutService } from '@services/layout.service';
import { User } from '@models/authentication';
import { CarrerasService } from 'src/app/pages/cecy/validacion-matricula/services/carreras.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  display = false;
  // carreras$ = this.carreraService.getAllCarreras().pipe(
  //   map((res) => {
  //     let routes: any[] = [];
  //     res.forEach((it) => {
  //       routes = [
  //         ...routes,
  //         {
  //           items: [
  //             {
  //               label: it.nombre,
  //               icon: '',
  //               routerLink: `/cecy/validacion-matricula/delegado/${it.nombre}`,
  //             },
  //           ],
  //         },
  //       ];
  //     });
  //     return routes;
  //   })
  // );
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
        {
          label: 'Estudiantes',
          icon: 'fa-solid fa-school',
          routerLink: ['/administrator/students'],
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
          label: 'Planificacion cursos',
          icon: 'fa-sharp fa-solid fa-check-to-slot',
          routerLink: ['/cecy/coordinator-career/planification'],
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
          routerLink: '/cecy/responsible-course/home',
        },
        {
          label: 'Tus cursos',
          icon: 'fa-sharp fa-solid fa-check-to-slot',
          routerLink: ['/cecy/responsible-course/my-courses'],
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
          label: 'Planificacion de cursos',
          icon: 'fa-sharp fa-solid fa-check-to-slot',
          routerLink: ['/cecy/coordinator-career/planification'],
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
        {
          label: 'Periodo lectivo',
          icon: 'fa-solid fa-school',
          routerLink: ['/cecy/coordinator-cecy/school-year'],
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
          label: 'Mis cursos',
          icon: 'fa-sharp fa-solid fa-check-to-slot',
          routerLink: ['/cecy/responsible-course/my-courses'],
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
  itemsSecretary: MenuItem[] = [
    {
      label: 'Secretaria del Cecy',
      items: [
        {
          label: 'Inicio',
          icon: 'fa-solid fa-house',
          routerLink: '/cecy/secretary-cecy/home',
        },
        {
          label: 'Visualizar cursos',
          icon: 'fa-sharp fa-solid fa-check-to-slot',
          routerLink: ['/cecy/secretary-cecy/visualization-courses'],
        },
        {
          label: 'Reportes',
          icon: 'fa-sharp fa-solid fa-check-to-slot',
          routerLink: ['/cecy/secretary-cecy/reporte'],
        },
      ],
    },
  ];
  showedMenu: boolean = false;
  closed: boolean = true;
  menu: MenuItem[] = [];
  user: User | null = null;
  model: MenuItem[] = [];
  loading: boolean = false;

  constructor(
    public layoutService: LayoutService,
    public el: ElementRef,
    private authService: AuthService,
    private carreraService: CarrerasService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.authService.getProfile().subscribe((user: any) => {
      console.log('SEDEIBAR USER', user[0]);
      this.user = user[0];
      this.loading = false;
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
}
