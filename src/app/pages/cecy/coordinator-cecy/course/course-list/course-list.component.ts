import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MenuItem } from 'primeng/api';

import { PlanificationCareerService } from '@services/cecy/coordinator-cecy';
import { MessageService } from '@services/core';
import { CareerModel, ColModel, PaginatorModel } from '@models/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-approve-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent implements OnInit, OnChanges {
  @Input() stateAprooved: any = [];
  selectCourse: any = {};
  cols: ColModel[];
  items: MenuItem[] = [];
  dialogForm: boolean = false;
  progressBarDelete: boolean = false;
  search: string = '';
  paginator: PaginatorModel = {};
  courses: any[] = [];
  stateProcess: any = [];
  careers: CareerModel[] = [];
  career: FormControl = new FormControl('');
  openModalComment: boolean = false;
  loading$ = this.planificationCareerService.loading$;

  constructor(
    private planificationCareerService: PlanificationCareerService,
    public messageService: MessageService,
    private router: Router
  ) {
    this.cols = [
      { field: 'code', header: 'Código curso' },
      { field: 'name', header: 'Nombre' },
      { field: 'state', header: 'Estado' },
      { field: 'career', header: 'Carrera' },
      { field: 'responsible', header: 'Responsable de curso' },
    ];
    this.checkSearchParams();
  }

  ngOnInit(): void {
    this.loadCourses();
    this.filterStateAprooved();
    this.filterStateProcess();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['stateAprooved']) {
      console.log('El array a cambiado', this.stateAprooved);
    }
  }

  loadCourses() {
    this.planificationCareerService.getCareerAndCourses().subscribe({
      next: (data) => {
        console.log('Me cargan los cursos', data);
        this.courses = data;
      },
      error: (error) => {
        this.messageService.error(error);
      },
    });
  }

  filterStateAprooved() {
    this.planificationCareerService
      .filterByStateAprooved()
      .subscribe((data) => {
        this.stateAprooved = data;
        this.loadCourses();
      });
  }

  filterStateProcess() {
    this.planificationCareerService.filterByStateProcess().subscribe((data) => {
      console.log('Cursos en proceso', data);
      this.stateProcess = data;
      this.loadCourses();
    });
  }

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
      history.replaceState(null, '', '/cecy/coordinator-cecy/course');
    }
  }

  searchCourses(courses: any) {
    console.log('PADRE ESTO ME BUSCO', courses);
    this.courses = courses;
  }

  goToPlanifications(id: number) {
    this.router.navigate(['/cecy/responsible-course/course/edit/' + id]);
  }
  openModal() {
    this.openModalComment = true;
  }

  closeModal(state: boolean) {
    this.openModalComment = state;
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
}
