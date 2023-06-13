import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { MessageService } from '@services/core';
import { ColModel, PaginatorModel } from '@models/core';
import { CourseModel } from '@models/cecy';
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
  loading = [false];
  private unsubscribe$ = new Subject<void>();

  selectedCourses: CourseModel[] = [];
  selectedCourse: any;
  cols: ColModel[];
  items: MenuItem[] = [];
  isVisible: boolean = false;
  progressBarDelete: boolean = false;
  search: FormControl = new FormControl('');
  paginator: PaginatorModel = {};
  selectedCareer: number = 0;
  careers: Careers[] = [];
  career: FormControl = new FormControl('');
  planificationCourses: any[] = [];
  selectCareer: boolean = false;
  activeButton: boolean = false;
  selectPlanification: any = null;
  nameCareer: String = '';
  isLoadingPlanification: boolean = false;
  constructor(
    //private courseHttpService: CourseHttpService,
    public messageService: MessageService,
    private router: Router,
    private planificationCourseService: PlanificationsCoursesService,
    private careersService: CareersService,
    private socket: Socket
  ) {
    this.cols = [
      { field: 'code', header: 'Código curso' },
      { field: 'name', header: 'Nombre' },
      { field: 'duration', header: 'Duración' },
      { field: 'responsible', header: 'Responsable' },
      { field: 'state', header: 'Estado' },
    ];
    this.items = [
      {
        label: 'Ver planificaciones',
        icon: 'pi pi-calendar-plus',
        command: () => {
          this.goToPlanifications(this.selectedCourse);
        },
      },
      {
        label: 'Eliminar curso',
        icon: 'pi pi-trash',
        command: () => {
          //this.deleteCourse(this.selectedCourse);
        },
      },
    ];
  }

  ngOnInit(): void {
    this.loadCareers();
    const savecareerId = localStorage.getItem('careerSelected');
    if (savecareerId) {
      this.selectedCareer = parseInt(savecareerId);
      this.isLoadingPlanification = true;
      this.careersService
        .getPlanificationsCareers(parseInt(savecareerId))
        .subscribe({
          next: (data) => {
            this.planificationCourses = data.planificationCourse;
            this.nameCareer = data.name;
            this.selectCareer = this.planificationCourses.length ? true : false;
            this.activeButton = true;
            this.isLoadingPlanification = false;
          },
          error: (error) => {
            this.messageService.error(error);
            this.isLoadingPlanification = false;
          },
        });
    }
    this.socket.on('api:newPlanification', (data: any) => {
      console.log('SOCKET', data);
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
    this.isLoadingPlanification = true;
    this.careersService.getPlanificationsCareers(event.value).subscribe({
      next: (data) => {
        this.planificationCourses = data.planificationCourse;
        this.nameCareer = data.name;
        this.selectCareer = this.planificationCourses.length ? true : false;
        this.activeButton = true;
        this.isLoadingPlanification = false;
      },
      error: (error) => {
        this.isLoadingPlanification = false;
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

  goToPlanifications(course: CourseModel) {
    this.router.navigate([
      '/cecy/coordinator-career/planification/course/',
      course.id,
    ]);
  }

  selectCourse(course: CourseModel) {
    this.selectedCourse = course;
  }

  /* filter(event: any) {
    if (event.key === 'Enter' || event.type === 'click') {
      this.loadCourses(1, this.career.value);
    }
  } */

  get careerField() {
    return this.career;
  }
}
