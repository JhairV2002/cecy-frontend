import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CursosService } from '@services/cecy/cursos';
import { CacheService, MessageService } from '@services/core';
import { MenuItem } from 'primeng/api';
import { AuthStudentService } from '@services/auth';

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
    private authStudentService: AuthStudentService,
  ) {
    this.checkSearchParams();
  }

  ngOnInit(): void {
    const currentRoute = this.router.url.includes('estudiante') ? true : false;
    this.activatedRoute.queryParams.subscribe(params => {
      console.log(params);
      this.searchQuery = params['search']
      if (this.searchQuery) {
        console.log('se ejecuta exist param')
        console.log('CONSOLE', this.searchQuery);
        this.courseService.searchCoursesApprove(this.searchQuery).subscribe({
          next: (data: any) => {
            console.log('SEARCH', data);
            data.sort((a: any, b: any) => b.created_at - a.created_at);
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
        courses.sort((a: any, b: any) => b.created_at - a.created_at);
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
    this.authStudentService.student$.subscribe({
      next: (student: any) => {
        console.log('STUDIANTE', student);
        if (student !== null) {
          console.log('Con estudiante')
          if (this.searchQuery === '') {
            this.router.navigate(['estudiante/courses']).then(() => {
              this.getAllCourses();
            })
          } else {
            this.router.navigate(['estudiante/courses'], {
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
        } else {
          console.log('Sin estudiante')
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
      },
      error: (error) => {
        console.log(error);
      }
    })


  }

  viewCourse(id: number) {
    this.authStudentService.student$.subscribe({
      next: (student: any) => {
        console.log('STUDIANTE', student);
        if (student !== null) {
          if (student.rol === 'estudiante') {
            this.router.navigate([`estudiante/course/${id}/details`])
          }
        } else {
          this.router.navigate([`course/view/${id}`])
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  checkSearchParams(): void {
    this.authStudentService.student$.subscribe({
      next: (student: any) => {
        console.log('STUDIANTE', student);
        if (student !== null) {
          const queryParams = this.router.parseUrl(this.router.url).queryParams;
          if (queryParams['search']) {
            history.replaceState(null, '', 'estudiante/courses');
          }
        } else {
          const queryParams = this.router.parseUrl(this.router.url).queryParams;
          if (queryParams['search']) {
            history.replaceState(null, '', '/courses');
          }
        }
      },
      error: (error) => {
        console.log(error);
      }
    })

  }
}
