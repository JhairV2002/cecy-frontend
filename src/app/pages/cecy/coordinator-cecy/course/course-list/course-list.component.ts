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
import { CoreHttpService, MessageService } from '@services/core';
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
  isLoadingCourses: boolean = false;
  openModalComment: boolean = false;

  constructor(
    private planificationCareerService: PlanificationCareerService,
    public messageService: MessageService,
    private router: Router,
    private coreHttpService: CoreHttpService
  ) {
    this.cols = [
      { field: 'code', header: 'Código curso' },
      { field: 'name', header: 'Nombre' },
      { field: 'state', header: 'Estado' },
      { field: 'career', header: 'Carrera' },
      { field: 'responsible', header: 'Responsable de curso' },
    ];
    this.items = [
      {
        label: 'Ver planificaciones',
        icon: 'pi pi-key',
        command: () => {
          //this.goToPlanifications(this.selectedCourse);
        },
      },

      {
        label: 'Aprobar curso',
        icon: 'pi pi-check',
        command: () => {
          //this.approveCourse(courses.id);
        },
      },

      {
        label: 'Rechazar curso',
        icon: 'pi pi-trash',
        command: () => {
          //this.declineCourse(this.selectedCourse);
        },
      },
    ];
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
    this.isLoadingCourses = true;
    this.planificationCareerService.getCareerAndCourses().subscribe({
      next: (data) => {
        console.log('Me cargan los cursos', data);
        this.courses = data;
        this.isLoadingCourses = false;
      },
      error: (error) => {
        console.error(error);
        this.isLoadingCourses = false;
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
      this.courses[index].state === 'aprobado' ? 'proceso' : 'aprobado';
    this.courses[index].state = state;
    this.planificationCareerService.updatePlanification(id, state).subscribe({
      next: (data) => {
        console.log('El estado se actualizo', data);
        this.messageService.succesAproveedCourse(data);
      },
      error: (error) => {
        this.courses[index].state =
          this.courses[index].state === 'aprobado' ? 'proceso' : 'aprobado';
        console.log(error);
      },
    });
  }

  filter(value: any) {
    console.log(value);
    this.planificationCareerService.filterByName(value).subscribe((data) => {
      console.log('Buscando', data);
      this.loadCourses();
    });
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
    console.log('ESTADOS SWITCH', status);
    switch (status) {
      case 'aprobado':
        return 'success';
      case 'proceso':
        return 'danger';
      default:
        return '';
    }
  }
}
