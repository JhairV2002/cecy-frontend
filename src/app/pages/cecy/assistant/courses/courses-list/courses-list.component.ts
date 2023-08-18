import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MenuItem } from 'primeng/api';

import {
  CommentsService,
  PlanificationCareerService,
} from '@services/cecy/coordinator-cecy';
import { MessageService as MessageLocal } from '@services/core';
import { ColModel } from '@models/core';
import { Router } from '@angular/router';
import { PlanificationCourses } from '@models/cecy/coordinator-career';
import { Comment } from '@models/cecy/coordinator-cecy';
import { MessageService } from '@services/core';
import { AuthService } from '@services/auth';
import { User } from '@models/authentication';
@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css'],
})
export class CoursesListComponent implements OnInit, OnChanges {
  @Input() stateAprooved: any = [];
  cols: ColModel[];
  items: MenuItem[] = [];
  dialogForm: boolean = false;
  progressBarDelete: boolean = false;
  search: string = '';
  courses: PlanificationCourses[] = [];
  comments: Comment[] = [];
  stateProcess: any = [];
  career: FormControl = new FormControl('');
  loading$ = this.planificationCareerService.loading$;
  selectPlanification: PlanificationCourses = {};
  selectCourse: PlanificationCourses = {};
  selectedCareer: number = 0;
  planification: MenuItem[] = [];
  courseMenu: MenuItem[] = [];
  user: User | null = null;

  constructor(
    private planificationCareerService: PlanificationCareerService,
    public messageService: MessageLocal,
    private router: Router,
    private commentService: CommentsService,
    public messageService2: MessageService,
    private authService: AuthService
  ) {
    this.cols = [
      { field: 'code', header: 'Código curso' },
      { field: 'name', header: 'Nombre' },
      { field: 'state', header: 'Estado' },
      { field: 'career', header: 'Carrera' },
      { field: 'responsible', header: 'Responsable de curso' },
    ];
    this.checkSearchParams();

    this.planification = [
      {
        label: 'Ver planificación',
        icon: 'fa-solid fa-sheet-plastic',
        command: (course: any) => {
          this.redirectPlanification(this.selectPlanification);
        },
      },
    ];
    this.courseMenu = [
      {
        label: 'Ver curso',
        icon: 'fa-solid fa-sheet-plastic',
        command: (course: any) => {
          this.redirectCourse(this.selectPlanification);
        },
      },
    ];
  }
  ngOnInit(): void {
    this.authService.user$.subscribe((data: any) => {
      if (data !== null) {
        this.user = data[0];
      }
    });
    this.loadCoursesAssitantCecy();

    // this.filterStateAprooved();
    // this.filterStateProcess();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['stateAprooved']) {
      console.log('El array a cambiado', this.stateAprooved);
    }
  }

  loadCoursesAssitantCecy() {
    this.planificationCareerService.getPlanificationForState().subscribe({
      next: (data) => {
        console.log('ASSISTAN CECY', data);
        this.courses = data;
        this.courses.sort((a: any, b: any) => {
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

  // filterStateAprooved() {
  //   this.planificationCareerService
  //     .filterByStateAprooved()
  //     .subscribe((data) => {
  //       this.stateAprooved = data;
  //       this.loadCourses();
  //     });
  // }

  // filterStateProcess() {
  //   this.planificationCareerService.filterByStateProcess().subscribe((data) => {
  //     this.stateProcess = data;
  //     this.loadCourses();
  //   });
  // }

  approveCourse(id: number) {
    console.log(id);
    const index = this.courses.findIndex((value) => value.id === id);
    const state =
      this.courses[index].state === 'aprobado' ? 'creado' : 'aprobado';
    this.courses[index].state = state;
    this.planificationCareerService.updatePlanification(id, state).subscribe({
      next: (data) => {
        console.log('El estado se actualizo', data);
        this.messageService.succesAproveedCourse(data);
      },
      error: (error) => {
        this.courses[index].state =
          this.courses[index].state === 'aprobado' ? 'creado' : 'aprobado';
        console.log(error);
      },
    });
  }

  checkSearchParams(): void {
    const queryParams = this.router.parseUrl(this.router.url).queryParams;
    if (queryParams['search']) {
      history.replaceState(null, '', '/cecy/assistant-cecy/courses');
    }
  }

  searchCourses(courses: any) {
    console.log('PADRE ESTO ME BUSCO', courses);
    this.courses = courses;
  }

  getSeverity(status: string) {
    switch (status) {
      case 'aprobado':
        return 'success';
      case 'creado':
        return 'danger';
      case 'suspendido':
        return 'warning';
      default:
        return '';
    }
  }

  addPlanification(newPlanification: any) {
    console.log('NUEVA PLANIFICACION', newPlanification);
  }

  selectPlanificationById(planification: PlanificationCourses) {
    this.selectPlanification = planification;
  }

  redirectPlanification(planification: PlanificationCourses) {
    console.log('REDIRECCION', planification);
    this.router.navigate([
      `cecy/coordinator-cecy/planification/${planification.id}`,
    ]);
  }

  selectCourseById(planification: PlanificationCourses) {
    console.log('PLANIFICACION CURSO', planification);
    this.selectCourse = planification;
  }

  redirectCourse(planification: PlanificationCourses) {
    this.router.navigate([
      '/cecy/assistant-cecy/courses/visualization/' + planification.id,
    ]);
  }

  deleteComment(comment: Comment) {
    console.log('COMEMNT', comment);
    this.messageService2.questionDeleteComments({}).then((result) => {
      if (result.isConfirmed) {
        this.commentService.deleteComment(comment.id).subscribe({
          next: (data) => {
            this.loadCoursesAssitantCecy();
          },
          error: (error) => {
            this.messageService.error(error);
          },
        });
      }
    });
  }
}
