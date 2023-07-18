import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MessageService as MessagePrime } from 'primeng/api';

import { CatalogueModel } from '@models/cecy';
import { MessageService } from '@services/core';
import {
  PlanificationsCoursesService,
  TeachersService,
} from '@services/cecy/coordinator-career';
import {
  PlanificationCareerService,
  SchoolYearService,
} from '@services/cecy/coordinator-cecy';
import {
  SchoolYear,
  PlanificationCourses,
} from '@models/cecy/coordinator-career';
import { CourseService } from '@services/cecy-v1/course.service';
import { formatDate } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { Message } from 'primeng/api';
import { UserService } from '@services/core/administrator/user.service';
import { User } from '@models/authentication';

@Component({
  selector: 'app-planification',
  templateUrl: './planification.component.html',
  styleUrls: ['./planification.component.css'],
})
export class PlanificationComponent implements OnInit {
  users: any = [];
  review: [] = [];
  schoolYears: SchoolYear[] = [];
  modalities: CatalogueModel[] = [];
  public formPlanification = new FormGroup({
    schoolYearId: new FormControl(null, [Validators.required]),
    codeCourse: new FormControl('xxxxx', [
      Validators.required,
      Validators.maxLength(5),
    ]),
    name: new FormControl('', [Validators.required]),
    durationTime: new FormControl(null, [
      Validators.required,
      Validators.min(0),
      Validators.max(75),
      Validators.pattern('^[0-9]*$'),
    ]),
    startDate: new FormControl(new Date(), [Validators.required]),
    finishDate: new FormControl(new Date(), [Validators.required]),
    state: new FormControl('creado', [Validators.required]),
    free: new FormControl(false, [Validators.required]),
    modalityId: new FormControl(null, Validators.required),
    userId: new FormControl(null, [Validators.required]),
    careerId: new FormControl(),
    planningReviewId: new FormControl(null, [Validators.required]),
  });
  titleModal: string = '';
  titleButton: string = '';
  UserByRoleEspecific: [] = [];
  isEdit: boolean = false;
  planifications: any[] = [];
  home: any;
  breadCrumb: MenuItem[] = [];
  alert: Message[] = [];
  assistants: User[] = [];
  draggedUser: User | null = null;
  loading$ = this.planificationsCoursesService.loading$;
  planification: PlanificationCourses | null = null;
  editState: boolean = false;
  openModalComment: boolean = false;
  isVisible: boolean = false;
  planificationSend: any;

  constructor(
    public messageService: MessageService,
    private planificationsCoursesService: PlanificationsCoursesService,
    private teacherService: TeachersService,
    private schoolYearService: SchoolYearService,
    private courseService: CourseService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private planificationCareerService: PlanificationCareerService,
    private messagePrime: MessagePrime
  ) {}

  ngOnInit(): void {
    this.getPlanificationById();
    this.loadUserByRole();
    this.loadPlanningReviewBy();
    this.loadScholYears();
    this.loadAllModalities();
    const id = this.activatedRoute.snapshot.params['id'];
    this.breadCrumb = [
      { label: 'Lista', routerLink: '/cecy/coordinator-cecy/course' },
      { label: 'Planificación' },
      { label: `${id}` },
    ];
    this.home = {
      icon: 'pi pi-home',
      routerLink: '/cecy/coordinator-cecy/course',
    };
    this.getAllAssitents();
    this.planificationsCoursesService.planification$.subscribe((data: any) => {
      console.log('SUSCRIBE', data);
      this.planification = data;
    });
    this.editState = true;
  }

  getPlanificationById() {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.planificationsCoursesService.planificationById(id).subscribe({
        next: (data: any) => {
          if (data.state === 'creado') {
            this.alert = [
              {
                severity: 'info',
                summary: 'Creado',
                detail:
                  'La planificación actualmente esta creada, pero no aprobada, seleccione un usuario para revisar o establezca por defecto a la coordinadora del cecy y apruebe la planificación o puede suspender la planificación.',
              },
            ];
          } else if (data.state === 'aprobado') {
            this.alert = [
              {
                severity: 'success',
                summary: 'Aprobado',
                detail: 'La planificación actualmente se encuentra aprobado.',
              },
            ];
          } else if (data.state === 'suspendido') {
            this.alert = [
              {
                severity: 'warn',
                summary: 'Suspendido',
                detail: 'La planificación actualmente se encuentra suspendida',
              },
            ];
          }
          const patchedValue = {
            ...data,
            startDate: new Date(data.startDate),
            finishDate: new Date(data.finishDate),
          };
          patchedValue.startDate = formatDate(
            patchedValue.startDate,
            'yyyy-MM-dd',
            'en-US'
          );
          patchedValue.finishDate = formatDate(
            patchedValue.finishDate,
            'yyyy-MM-dd',
            'en-US'
          );
          console.log('SUSCRIBE', data);
          this.formPlanification.patchValue(patchedValue);
          this.planificationSend = data;
        },
        error: (error: any) => {
          this.messageService.error(error);
        },
      });
    }
  }

  getAllAssitents() {
    this.userService.getAssistants().subscribe({
      next: (data) => {
        console.log('ASSISTENTES ALL', data);
        this.assistants = data;
      },
      error: (error) => {
        this.messageService.error(error);
      },
    });
  }

  loadUserByRole() {
    this.teacherService.getUserByRole().subscribe((data) => {
      this.users = data;
    });
  }

  loadPlanningReviewBy() {
    this.teacherService
      .getUsersByCoordinatorCecyAndAssitant()
      .subscribe((data) => {
        this.review = data;
      });
  }

  loadScholYears() {
    this.schoolYearService.getSchoolYear().subscribe((data) => {
      this.schoolYears = data;
    });
  }

  loadAllModalities() {
    this.courseService.getCatalogues('MODALITY').subscribe({
      next: (data) => {
        this.modalities = data;
      },
      error: (error) => {
        this.messageService.error(error);
      },
    });
  }

  onSubmit() {
    if (this.formPlanification.valid) {
      this.editPlanification();
    } else {
      this.formPlanification.markAllAsTouched();
    }
  }

  editPlanification() {
    const id = this.activatedRoute.snapshot.params['id'];
    const valuesFormPlanification = this.formPlanification.value;
    this.planificationsCoursesService
      .editPlanificationById(valuesFormPlanification, id)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.messageService.successPlanification(response);
        },
        error: (error) => {
          this.messageService.error(error);
        },
      });
  }

  approveCourse() {
    const id = this.activatedRoute.snapshot.params['id'];
    const isPlanificationApproved =
      this.formPlanification.get('state')?.value === 'aprobado';
    console.log('PLANIFICACION VALUE', isPlanificationApproved);
    if (isPlanificationApproved) {
      console.log('La planificación ya está aprobada');
      this.messagePrime.add({
        severity: 'info',
        summary: 'Aprobado',
        detail: 'Ya tienen su planificación aprobada',
      });
      return;
    }

    const state = (this.state = 'aprobado');
    this.planificationCareerService.updatePlanification(id, state).subscribe({
      next: (data) => {
        console.log('El estado se actualizo', data);
        this.messageService.succesAproveedCourse(data);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      },
      error: (error) => {
        this.messageService.error(error);
        console.log(error);
      },
    });
  }

  dragStart(assistant: User) {
    this.draggedUser = assistant;
  }

  dragEnd() {
    this.draggedUser = null;
  }

  drop() {}

  openModal() {
    this.openModalComment = true;
  }

  closeModal(state: boolean) {
    this.openModalComment = state;
    console.log(state);
  }

  isRequired(field: AbstractControl): boolean {
    return field.hasValidator(Validators.required);
  }

  get lectiveYear() {
    return this.formPlanification.controls['schoolYearId'];
  }

  get codeCourse() {
    return this.formPlanification.controls['codeCourse'];
  }

  get nameField() {
    return this.formPlanification.controls['name'];
  }

  get durationField() {
    return this.formPlanification.controls['durationTime'];
  }

  get responsibleField() {
    return this.formPlanification.controls['userId'];
  }

  get startDate() {
    return this.formPlanification.controls['startDate'];
  }

  get finishDate() {
    return this.formPlanification.controls['finishDate'];
  }

  get modalityField() {
    return this.formPlanification.controls['modalityId'];
  }

  get freeField() {
    return this.formPlanification.controls['free'];
  }

  get stateField() {
    return this.formPlanification.controls['state'];
  }

  set state(value: any) {
    this.formPlanification.patchValue({
      state: value,
    });
  }
}
