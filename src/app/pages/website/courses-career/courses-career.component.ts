import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

import { CursosService } from '@services/cecy/cursos';
import { CareersService } from '@services/cecy/coordinator-career';
import { Careers } from '@models/cecy/coordinator-career';
import { CacheService, MessageService } from '@services/core';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-courses-career',
  templateUrl: './courses-career.component.html',
  styleUrls: ['./courses-career.component.css'],
})
export class CoursesCareerComponent implements OnInit {
  courses: Careers[] = [];
  showSubmenu = false;
  items: MenuItem[] = [];
  careers: any[] = [];
  first: number = 0;
  rows: number = 10;
  loading$ = this.courseService.loading$;
  loading1$ = this.careersService.loading$;

  constructor(
    private courseService: CursosService,
    private activatedRoute: ActivatedRoute,
    private careersService: CareersService,
    public router: Router,
    private ngZone: NgZone,
    private cacheService: CacheService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getAllMenu();
    const idCareer = this.activatedRoute.snapshot.params['idCareer'];
    this.getCareerApprovedCourses(idCareer);

    const cachedMenu = this.cacheService.getItem('cachedMenu');
    console.log('CACHE', cachedMenu);
    if (cachedMenu) {
      this.items = cachedMenu;
    } else {
      this.getAllMenu();
    }
  }

  getAllMenu() {
    return this.courseService.getCarreras().subscribe({
      next: (careers) => {
        console.log(careers);
        const newCareers = careers.filter(newCareer => !this.careers.some(existingCareer => existingCareer.id === newCareer.id));
        this.careers.push(...newCareers);
        this.items = [
          {
            label: 'Busqueda inicial',
            routerLink: '/courses',
            icon: 'pi pi-home',
          },
          {
            label: 'Precio',
            icon: 'pi pi-money-bill',
            items: [
              {
                label: 'De pago',
                icon: 'fa-solid fa-sort-amount-down-alt',
                routerLink: '/courses/price/low',
              },
              {
                label: 'Gratuito',
                icon: 'fa-solid fa-sort-amount-down-alt',
                routerLink: '/courses/price/low',
              },
            ],
          },
          {
            label: 'Carreras',
            icon: 'fa-solid fa-school',
            items: this.careers.map((career) => {
              return {
                label: career.name,
                icon: 'pi pi-check-square',
                routerLink: `/courses/career/${career.id}`,
                command: () => {
                  console.log('ejecuta');
                  setTimeout(() => {
                    this.getCareerApprovedCourses(career.id);
                  }, 0);
                }
              };
            }),
          },
        ];
        this.cacheService.setItem('cachedMenu', this.items);
        this.ngZone.run(() => {});
      },
      error: (error) => {
        this.messageService.error(error)
      },
    });
  }

  getCareerApprovedCourses(idCareer: number) {
    console.log(idCareer);
    this.careersService
      .getCareeryByIdAndAproovedCourses(
        parseInt(this.activatedRoute.snapshot.params['idCareer'])
      )
      .subscribe({
        next: (courses: any) => {
          console.log('COURSES APROVVED', courses);
          this.courses = courses;
        },
        error: (error) => {
          this.messageService.error(error)
        },
      });
  }

  onPageChange(event: PageEvent) {
    console.log(event);
    this.first = event.first;
    this.rows = event.rows;
  }

  viewCourse(id: number) {
    this.router.navigate([`course/view/${id}`])
  }
}
