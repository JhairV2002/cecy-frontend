import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

//import { CourseHttpService } from '@services/cecy';
import { MessageService } from '@services/core';
import { CareerModel, ColModel, PaginatorModel } from '@models/core';
import { CourseModel } from '@models/cecy';
import { Router } from '@angular/router';
import { PlanificationsCoursesService } from './../../../../../services/cecy/coordinator-career';
import {
  PlanificationCourses,
  Careers,
  getCareerDTO,
} from './../../../../../models/cecy/coordinator-career';
import { CareersService } from '../../../../../services/cecy/coordinator-career';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent implements OnInit {
  loading = [false];
  private unsubscribe$ = new Subject<void>();

  selectedCourses: CourseModel[] = [];
  selectedCourse: CourseModel = {};
  cols: ColModel[];
  items: MenuItem[] = [];
  dialogForm: boolean = false;
  progressBarDelete: boolean = false;
  search: FormControl = new FormControl('');
  paginator: PaginatorModel = {};
  selectedCareer: any;
  careers: Careers[] = [];
  career: FormControl = new FormControl('');
  planificationCourses: any[] = [];
  selectedPlanificationCourse: PlanificationCourses = null;
  selectCareer: boolean = false;
  activeButton: boolean = false;
  selectPlanification: any = null;

  constructor(
    //private courseHttpService: CourseHttpService,
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
    //this.loadPlanificationCourses();
    this.loadCareers();
  }

  /* loadPlanificationCourses() {
    this.planificationCourseService
      .getPlanificationCourses()
      .subscribe((data) => {
        this.planificationCourses = data;
        console.log('Planificaciones de los cursos', data);
      });
  } */

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

  onchange(event) {
    console.log(event.value);
    this.careersService.getPlanificationsCareers(event.value).subscribe({
      next: (data) => {
        console.log(data);
        this.planificationCourses = data.planificationCourse;
        this.selectCareer = this.planificationCourses.length ? true : false;
        this.activeButton = true;
      },
      error: (error) => {
        this.messageService.error(error);
      },
    });
  }

  showForm() {
    this.dialogForm = true;
    this.selectedCourse = null;
    this.selectPlanification = null;
  }

  hideModal(isClose: boolean) {
    this.dialogForm = isClose;
    console.log(isClose);
  }

  EditPlanification(newPlanification: any) {
    console.log(
      'planificacion actualizada',
      newPlanification.planificationCourse.careerId
    );
    this.careersService
      .getPlanificationsCareers(newPlanification.planificationCourse.careerId)
      .subscribe({
        next: (data) => {
          this.planificationCourses = data.planificationCourse;
        },
      });
  }

  addPlanification(newPlanification: any){
    console.log(
      'nueva planificacion',
      newPlanification.newPlanificationCourse.careerId
    );
    this.careersService
      .getPlanificationsCareers(newPlanification.newPlanificationCourse.careerId)
      .subscribe({
        next: (data) => {
          this.planificationCourses = data.planificationCourse;
        },
      });
  }

  deletePlanificationCourse(planification: any) {
    this.messageService.questionDeletePlanificationCourse({}).then((result) => {
      if (result.isConfirmed) {
        this.planificationCourseService
          .removePlanificationCourse(planification.id)
          .subscribe({
            next: (data) => {
              console.log(data);
              /* this.careersService
                .getPlanificationsCareers(data.planificationCourseId.id)
                .subscribe((data) => {
                  this.planificationCourses = data.planificationCourse;
                }); */
              this.messageService.successPlanification(data);
            },
            complete: () => {
              //this.loadPlanificationCourses();
            },
            error: (error) => {
              this.messageService.error(error);
            },
          });
      }
    });
  }

  editPlanificationCourse(planification: PlanificationCourses) {
    console.log('PLANIFICACION', planification);
    this.dialogForm = true;
    this.selectPlanification = planification;
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
