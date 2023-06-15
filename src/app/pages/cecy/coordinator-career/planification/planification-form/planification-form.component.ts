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

import { CatalogueModel, CourseModel } from '@models/cecy';
import { CourseHttpService, InstructorHttpService } from '@services/cecy';
import { MessageService } from '@services/core';
import {
  PlanificationsCoursesService,
  TeachersService,
} from '@services/cecy/coordinator-career';
import { SchoolYearService } from '@services/cecy/coordinator-cecy';
import { SchoolYear } from '@models/cecy/coordinator-career';
import { CourseService } from '@services/cecy-v1/course.service';
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
    name: new FormControl('', [Validators.minLength(4), Validators.required]),
    durationTime: new FormControl(null, [
      Validators.required,
      Validators.min(40),
      Validators.maxLength(3),
      Validators.pattern('^[0-9]*$'),
    ]),
    startDate: new FormControl(new Date(), [Validators.required]),
    finishDate: new FormControl(new Date(), [Validators.required]),
    state: new FormControl('proceso'),
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

  constructor(
    private courseHttpService: CourseHttpService,
    private instructorHttpService: InstructorHttpService,
    public messageService: MessageService,
    private planificationsCoursesService: PlanificationsCoursesService,
    private teacherService: TeachersService,
    private schoolYearService: SchoolYearService,
    private courseService: CourseService,
    private socket: Socket
  ) {}

  ngOnInit(): void {
    this.loadUserByRole();
    this.loadPlanningReviewBy();
    this.loadScholYears();
    this.loadAllModalities();
  }

  ngOnChanges() {
    if (this.selectPlanification) {
      const startDate = new Date(this.selectPlanification.startDate);
      const finishDate = new Date(this.selectPlanification.finishDate);
      // this.formPlanification.patchValue({
      //   startDate: startDate,
      //   finishDate: finishDate,
      // });

      this.formPlanification.patchValue(this.selectPlanification);
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
    this.state = 'proceso';
    this.careerId = this.selectedCareer;
    const valuesFormPlanification = this.formPlanification.value;
    console.log(valuesFormPlanification);
    if (!this.selectPlanification) {
      this.socket.emit(
        'app:newPlanification',
        valuesFormPlanification,
        (response: any) => {
          if (response.error) {
            this.messageService.errorValid(response.error);
            this.progressBar = false;
          } else {
            console.log('ALL', response);
            this.progressBar = false;
            this.messageService.successPlanification(response);
            this.clickClose.emit(false);
            this.addPlanification.emit(response.data);
            this.formPlanification.reset();
          }
        }
      );
    } else {
      console.log('EDITANDO');
      this.planificationsCoursesService
        .editPlanificationById(
          valuesFormPlanification,
          this.selectPlanification.id
        )
        .subscribe({
          next: (data: any) => {
            this.progressBar = false;
            this.messageService.successPlanification(data);
            this.clickClose.emit(false);
            this.addPlanification.emit(data);
            this.formPlanification.reset();
          },
          error: (error) => {
            this.progressBar = false;
            this.messageService.error(error);
          },
        });
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

  updateCourse(course: CourseModel): void {
    this.progressBar = true;

    this.courseHttpService
      .updateCourseNameAndDuration(course.id!, course)
      .subscribe({
        next: (response) => {
          this.messageService.success(response);
          this.progressBar = false;
        },
        error: (error) => {
          this.messageService.errorValid(error);
          this.progressBar = false;
        },
      });
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
