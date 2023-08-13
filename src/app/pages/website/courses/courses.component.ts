import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CursosService } from '@services/cecy/cursos';
import { CacheService, MessageService } from '@services/core';
import { MenuItem } from 'primeng/api';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  courses: any[] = [];
  showSubmenu = false;
  items: MenuItem[] = [];
  careers: any[] = [];
  first: number = 0;
  rows: number = 10;
  loading$ = this.courseService.loading$;
  searchQuery: string = '';

  constructor(
    private courseService: CursosService,
    private activatedRoute: ActivatedRoute,
    private cacheService: CacheService,
    private messageService: MessageService,
    private router: Router,
  ) {
    // this.checkSearchParams();
  }

  ngOnInit(): void {
    const currentRoute = this.router.url.includes('estudiante')? true: false;
    this.activatedRoute.queryParams.subscribe(params => {
      console.log(params);
      this.searchQuery = params['search']
      if (this.searchQuery) {
        console.log('se ejecuta exist param')
        console.log('CONSOLE', this.searchQuery);
        this.courseService.searchCoursesApprove(this.searchQuery).subscribe({
          next: (data: any) => {
            console.log('SEARCH', data);
            this.courses = data
          },
          error: (error) => {
            console.log(error);
          }
        })
      } else {
        console.log('se ejecuta dont param')
        this.getAllCourses();
      }

    })
    const cachedMenu = this.cacheService.getItem('cachedMenu');
    console.log('CACHE', cachedMenu);
    if (cachedMenu) {
      this.items = cachedMenu;
    } else {
      this.getAllMenu();
    }
  }

  getAllCourses() {
    return this.courseService.getAllCoursesByStateApprove().subscribe({
      next: (courses) => {
        console.log(courses);
        this.courses = courses;
      },
      error: (error) => {
        this.messageService.error(error)
      },
    });
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
              };
            }),
          },
        ];
        this.cacheService.setItem('cachedMenu', this.items);
      },
      error: (error) => {
        this.messageService.error(error)
      },
    });
  }

  toggleSubmenu() {
    this.showSubmenu = !this.showSubmenu;
  }

  onPageChange(event: PageEvent) {
    console.log(event);
    this.first = event.first;
    this.rows = event.rows;
  }

  onSearchInputChange(): void {
    if (this.searchQuery === '') {
      this.router.navigate(['/courses']).then(() => {
        this.getAllCourses();
      })
    } else {
      this.router.navigate(['/courses'], {
        queryParams: {
          search: this.searchQuery,
        }
      }).then(() => {
        this.courseService.searchCoursesApprove(this.searchQuery).subscribe({
          next: (data) => {
            console.log('BUSCANFO GLOBAL', data)
          },
          error: (error) => {
            console.log(error)
          }
        })
      })
    }

  }



  // checkSearchParams(): void {
  //   const queryParams = this.router.parseUrl(this.router.url).queryParams;
  //   if (queryParams['search']) {
  //     history.replaceState(null, '', '/courses');
  //   }
  // }
}
