import { Component, ElementRef, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

import { AuthService } from '@services/auth';
import { LayoutService } from '@services/layout.service';
import { User } from '@models/authentication';
import { Router } from '@angular/router';

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
          label: 'Asistentes',
          icon: 'fa-solid fa-users',
          routerLink: ['/cecy/coordinator-cecy/assistant'],
        },
        {
          label: 'Periodo lectivo',
          icon: 'fa-solid fa-school',
          routerLink: ['/cecy/coordinator-cecy/school-year'],
        },
      ],
    },
  ];
  itemsCoordinatorCecyAssistant: MenuItem[] = [
    {
      label: 'Asistente del Cecy',
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
          label: 'Planificaciones',
          icon: 'fa-sharp fa-solid fa-check-to-slot',
          routerLink: ['/cecy/responsible-course/my-courses'],
        },
        {
          label: 'Mis cursos',
          icon: 'fa-sharp fa-solid fa-check-to-slot',
          routerLink: ['/cecy/responsible-execute/mis-cursos'],
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
  loading$ = this.authService.loading$;
  selectedItem: MenuItem | null = null;
  items: MenuItem[] = [];
  dropdownOpen = false;

  constructor(
    public layoutService: LayoutService,
    public el: ElementRef,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user: any) => {
      if (user !== null) {
        this.user = user[0];
      }
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

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  redirectConfigurate(role: any) {
    console.log(role);
    if (role === 'admin') {
      this.router.navigate(['/administrator/change-password']);
    } else if (role === 'coordinator_career') {
      this.router.navigate(['/cecy/coordinator-career/change-password']);
    } else if (role === 'coordinator_cecy') {
      this.router.navigate(['/cecy/coordinator-cecy/change-password']);
    } else if (role === 'assistant_cecy') {
      this.router.navigate(['/cecy/coordinator-cecy/change-password']);
    } else if (role === 'instructor_execute') {
      this.router.navigate(['/cecy/responsible-execute/change-password']);
    } else if (role === 'secretary_cecy') {
      this.router.navigate(['/cecy/secretary-cecy/change-password']);
    } else if (role === 'responsible_course') {
      this.router.navigate(['/cecy/responsible-course/change-password']);
    } else if (role === 'instructor') {
      this.router.navigate(['/cecy/instructor/courses/change-password']);
    }
  }
}
