import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { MessageService } from '@services/core';
import { ColModel } from '@models/core';
import { Router } from '@angular/router';
import { PlanificationsCoursesService } from '@services/cecy/coordinator-career';
import { PlanificationCourses, Careers } from '@models/cecy/coordinator-career';
import { CareersService } from '@services/cecy/coordinator-career';

@Component({
  selector: 'app-planification-list',
  templateUrl: './planification-list.component.html',
  styleUrls: ['./planification-list.component.css'],
})
export class PlanificationListComponent implements OnInit {
  loading$ = this.careersService.loading$;
  loading = [false];
  selectedCourse: any;
  cols: ColModel[];
  items: MenuItem[] = [];
  isVisible: boolean = false;
  progressBarDelete: boolean = false;
  search: FormControl = new FormControl('');
  paginator: any = {};
  selectedCareer: number = 0;
  careers: Careers[] = [];
  career: FormControl = new FormControl('');
  planificationCourses: any[] = [];
  selectCareer: boolean = false;
  activeButton: boolean = false;
  selectPlanification: any = null;
  nameCareer: String = '';
  test: [] = [];
  totalRecords: number = 0;
  page: number = 0;
  pageSize: number = 3;
  selectedCareerId: number = 0;
  constructor(
    public messageService: MessageService,
    private router: Router,
    private planificationCourseService: PlanificationsCoursesService,
    private careersService: CareersService
  ) {
    this.cols = [
      { field: 'code', header: 'Código curso' },
      { field: 'name', header: 'Nombre' },
      { field: 'duration', header: 'Duración' },
      { field: 'responsible', header: 'Responsable' },
      { field: 'state', header: 'Estado' },
    ];
    this.checkSearchParams();
  }

  ngOnInit(): void {
    this.loadCareers();
    const savecareerId = localStorage.getItem('careerSelected');
    if (savecareerId) {
      this.selectedCareer = parseInt(savecareerId);
      this.careersService
        .getPlanificationsCareers(parseInt(savecareerId))
        .subscribe({
          next: (data) => {
            this.planificationCourses = data.planificationCourse;
            this.nameCareer = data.name;
            this.selectCareer = this.planificationCourses.length ? true : false;
            this.activeButton = true;
          },
          error: (error) => {
            this.messageService.error(error);
          },
        });
    }

    this.testing();
  }




  checkSearchParams(): void {
    const queryParams = this.router.parseUrl(this.router.url).queryParams;
    if (queryParams['search']) {
      history.replaceState(null, '', '/cecy/coordinator-career/planification');
    }
  }

  loadCoursesByCareer() {
    this.careersService
      .getPlanificationsCareers(this.selectedCareer)
      .subscribe({
        next: (data) => {
          console.log('refrescando', data);
          this.planificationCourses = data.planificationCourse;
          this.planificationCourses.sort((a: any, b: any) => {
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          });
        },
        error: (error) => {
          this.messageService.error(error);
        },
      });
  }

  onPageChange(event: any) {
    console.log('EVENT PAGINATOR', event);
    this.page = event.rows;
    this.testing();
  }
  testing() {
    this.planificationCourseService
      .paginator(this.page, this.pageSize)
      .subscribe((data: any) => {
        console.log('paginator', data);
        this.test = data.rows;
        this.totalRecords = data.count;
      });
  }

  loadCareers() {
    this.careersService.getCareers().subscribe((data) => {
      this.careers = data;
    });
  }

  /* loadCourses(page: number = 1, career: CareerModel) {
    this.courses$ = this.courseHttpService.getCoursesByCareer(
      page,
      this.search.value,
      career.id
    );
    this.loading[0] = true;
    setTimeout(() => (this.loading[0] = false), 1000);
  } */

  onchange(event: any) {
    console.log(event.value);
    localStorage.setItem('careerSelected', event.value);
    this.careersService.getPlanificationsCareers(event.value).subscribe({
      next: (data) => {
        this.planificationCourses = data.planificationCourse;
        this.nameCareer = data.name;
        this.selectCareer = this.planificationCourses.length ? true : false;
        this.activeButton = true;
      },
      error: (error) => {
        this.messageService.error(error);
      },
    });
  }

  showForm() {
    this.isVisible = true;
    this.selectPlanification = null;
  }

  closeModal(state: boolean) {
    this.isVisible = state;
    console.log(state);
  }

  addPlanification(newPlanification: any) {
    this.careersService
      .getPlanificationsCareers(this.selectedCareer)
      .subscribe({
        next: (data) => {
          this.planificationCourses = data.planificationCourse;
          this.selectCareer = this.planificationCourses.length ? true : false;
        },
        error: (error) => {
          this.messageService.error(error);
        },
      });
  }

  searchPlanificationCourses(planification: any) {
    this.planificationCourses = planification;
    this.planificationCourses.sort((a: any, b: any) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    console.log('ESTO BUSCO', planification);
  }

  editPlanification(planification: PlanificationCourses) {
    console.log(planification);
    this.isVisible = true;
    this.selectPlanification = planification;
  }

  deletePlanification(planification: any) {
    this.messageService.questionDeletePlanificationCourse({}).then((result) => {
      if (result.isConfirmed) {
        this.planificationCourseService
          .removePlanificationCourse(planification.id)
          .subscribe({
            next: (data) => {
              console.log(data);
              this.careersService
                .getPlanificationsCareers(
                  data.planificationCourseId.planificationCoursesId.careerId
                )
                .subscribe((data) => {
                  this.planificationCourses = data.planificationCourse;
                });
              this.messageService.successPlanification(data);
            },
            error: (error) => {
              this.messageService.error(error);
            },
          });
      }
    });
  }

  goToPlanifications(course: any) {
    this.router.navigate([
      '/cecy/coordinator-career/planification/course/',
      course.id,
    ]);
  }

  selectCourse(course: any) {
    this.selectedCourse = course;
  }

  getSeverity(status: string) {
    switch (status) {
      case 'aprobado':
        return 'success';
      case 'creado':
        return 'danger';
      default:
        return '';
    }
  }

  get careerField() {
    return this.career;
  }
}
