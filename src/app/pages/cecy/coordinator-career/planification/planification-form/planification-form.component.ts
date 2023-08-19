import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnChanges,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Socket } from 'ngx-socket-io';

import { CatalogueModel } from '@models/cecy';
import { MessageService } from '@services/core';
import {
  PlanificationsCoursesService,
  TeachersService,
} from '@services/cecy/coordinator-career';
import { SchoolYearService } from '@services/cecy/coordinator-cecy';
import { SchoolYear, AutoComplete } from '@models/cecy/coordinator-career';
import { CourseService } from '@services/cecy-v1/course.service';
import { formatDate } from '@angular/common';
import jwt_decode from 'jwt-decode';
import { TokenService } from '@services/auth';
@Component({
  selector: 'app-planification-form',
  templateUrl: './planification-form.component.html',
  styleUrls: ['./planification-form.component.css'],
})
export class PlanificationFormComponent implements OnInit, OnChanges {
  @Input() showModal: boolean = true;
  @Input() selectedCareer: any;
  @Output() clickClose = new EventEmitter<boolean>();
  @Output() addPlanification = new EventEmitter<any>();
  @Input() selectPlanification: any = null;
  progressBar: boolean = false;
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
    state: new FormControl('creado'),
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
  inputAddCourse: boolean = false;

  constructor(
    public messageService: MessageService,
    private planificationsCoursesService: PlanificationsCoursesService,
    private teacherService: TeachersService,
    private schoolYearService: SchoolYearService,
    private courseService: CourseService,
    private socket: Socket,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.loadPlanificationsAll();
    this.loadUserByRole();
    this.loadPlanningReviewBy();
    this.loadScholYears();
    this.loadAllModalities();
  }

  ngOnChanges() {
    if (this.selectPlanification) {
      const patchedValue = {
        ...this.selectPlanification,
        startDate: new Date(this.selectPlanification.startDate),
        finishDate: new Date(this.selectPlanification.finishDate),
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

      this.formPlanification.patchValue(patchedValue);
      this.titleModal = 'Editar una';
      this.titleButton = 'Editar';
      this.isEdit = true;
    } else {
      this.formPlanification.reset();
      this.titleModal = 'Crear un';
      this.titleButton = 'Crear';
      this.isEdit = false;
    }
  }

  loadPlanificationsAll() {
    this.planificationsCoursesService
      .getPlanificationCourses()
      .subscribe((data) => {
        console.log('ALL PLANIFICATIONS', data);
        this.planifications = data;
      });
  }

  loadUserByRole() {
    this.teacherService.getUserByRole().subscribe((data) => {
      this.users = data;
      console.log('Estos son los usuarios con rol de Docente', data);
    });
  }

  loadPlanningReviewBy() {
    this.teacherService.getUserByRoleEspecific().subscribe((data) => {
      console.log('EN REVISION', data);
      this.review = data;
    });
  }

  loadScholYears() {
    this.schoolYearService.getSchoolYear().subscribe((data) => {
      console.log('YEARS SCHOOL', data);
      this.schoolYears = data;
    });
  }

  loadAllModalities() {
    this.courseService.getCatalogues('MODALITY').subscribe({
      next: (data) => {
        console.log('MODALIDADES', data);
        this.modalities = data;
      },
      error: (error) => {
        this.messageService.error(error);
      },
    });
  }

  addEditPlanification() {
    this.progressBar = true;
    this.state = 'creado';
    this.careerId = this.selectedCareer;
    const valuesFormPlanification = this.formPlanification.value;
    console.log('SELECCIONADO PLANIFICACION', this.selectPlanification);

    const tokenUser = this.tokenService.getToken();
    if (tokenUser) {
      const decode = jwt_decode(tokenUser) as { [key: string]: any };
      console.log(valuesFormPlanification);
      console.log(decode);
      const data = {
        ...valuesFormPlanification,
        idEmitUser: decode,
      };
      if (!this.selectPlanification) {
        this.socket.emit('app:newPlanification', data, (response: any) => {
          if (response.error) {
            this.messageService.error(response.error);
            this.progressBar = false;
          } else {
            console.log('ALL', response);
            this.progressBar = false;
            this.messageService.successPlanification(response);
            this.clickClose.emit(false);
            this.addPlanification.emit(response.data);
            this.formPlanification.reset();
          }
        });
      } else {
        console.log('EDITANDO');
        const valuesFormPlanification = this.formPlanification.value;
        console.log(valuesFormPlanification)
        this.planificationsCoursesService.editPlanificationById(this.formPlanification.value, this.selectPlanification.id).subscribe({
          next: (data: any) => {
            this.progressBar = false;
            this.messageService.successPlanification(data);
            this.clickClose.emit(false);
            this.addPlanification.emit(data);
            this.formPlanification.reset();
          },
          error: (error) => {
            this.messageService.error(error);
          },
        });
      }
    }
  }

  onSubmit() {
    if (this.formPlanification.valid) {
      this.addEditPlanification();
    } else {
      this.formPlanification.markAllAsTouched();
    }
  }

  deletePlanification(id: number) {
    this.planificationsCoursesService
      .removePlanificationCourse(id)
      .subscribe((data) => {
        console.log(data);
      });
  }

  closeModal() {
    this.clickClose.emit(false);
  }

  search(event: AutoComplete) {
    this.planificationsCoursesService
      .searchPlanifications(event.query)
      .subscribe({
        next: (data) => {
          this.planifications = data;
        },
      });
  }

  addCourseForInput() {
    this.inputAddCourse = true;
  }

  addForDropDown() {
    this.inputAddCourse = false;
  }

  isRequired(field: AbstractControl): boolean {
    return field.hasValidator(Validators.required);
  }

  // Getters

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

  set state(value: any) {
    this.formPlanification.patchValue({
      state: value,
    });
  }

  set careerId(value: any) {
    this.formPlanification.patchValue({
      careerId: value,
    });
  }
}
