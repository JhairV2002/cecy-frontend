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

import { CourseModel } from '@models/cecy';
import { CourseHttpService, InstructorHttpService } from '@services/cecy';
import { MessageService } from '@services/core';
import {
  PlanificationsCoursesService,
  TeachersService,
} from '@services/cecy/coordinator-career';
@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit, OnChanges {
  @Input() selectedCareer: any;
  @Input() dialogForm: boolean = true;
  @Input() selectedPlanificationCourse: any;
  @Output() clickClose = new EventEmitter<boolean>();
  @Output() addPlanification = new EventEmitter<any>();
  @Input() selectPlanification: any = null;
  @Output() updataPlanification = new EventEmitter<any>();

  progressBar: boolean = false;
  users: any = [];
  roles: [] = [];
  public formPlanification = new FormGroup({
    lectiveYear: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
    ]),
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
    startDate: new FormControl('', [Validators.required]),
    finishDate: new FormControl('', [Validators.required]),
    state: new FormControl('proceso'),
    userId: new FormControl(null, [Validators.required]),
    careerId: new FormControl(),
    roleId: new FormControl(null, [Validators.required]),
  });

  titleModal: string = '';
  titleButton: string = '';
  UserByRoleEspecific: [] = [];

  // Foreign Key

  constructor(
    private courseHttpService: CourseHttpService,
    private instructorHttpService: InstructorHttpService,
    public messageService: MessageService,
    private planificationsCoursesService: PlanificationsCoursesService,
    private teacherService: TeachersService
  ) {}

  ngOnInit(): void {
    this.loadUserByRole();
    this.loadRoles();
  }

  ngOnChanges() {
    if (this.selectPlanification) {
      this.formPlanification.patchValue(this.selectPlanification);
      this.titleModal = 'Editar una';
      this.titleButton = 'Editar';
    } else {
      this.formPlanification.reset();
      this.titleModal = 'Crear un';
      this.titleButton = 'Crear';
    }
  }

  loadUserByRole() {
    this.teacherService.getUserByRole().subscribe((data) => {
      this.users = data;
      console.log('Estos son los usuarios con rol de Docente', data);
    });
  }

  loadRoles() {
    this.teacherService.getUserByRoleEspecific().subscribe((data) => {
      this.roles = data;
    });
  }

  addEditPlanification() {
    this.progressBar = true;
    this.state = 'proceso';
    this.careerId = this.selectedCareer;
    const valuesFormPlanification = this.formPlanification.value;
    console.log('Datos del form', valuesFormPlanification);
    this.planificationsCoursesService
      .createEdit(valuesFormPlanification, this.selectPlanification)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.messageService.successPlanification(data);
          this.formPlanification.reset();
          this.progressBar = false;
          this.clickClose.emit(false);
          this.selectPlanification = this.selectPlanification
            ? this.updataPlanification.emit(data)
            : this.addPlanification.emit(data);
        },
        error: (error) => {
          console.log(error);
          this.messageService.errorValid(error);
          this.progressBar = false;
        },
      });
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
    this.selectedPlanificationCourse = null;
  }

  updateCourse(course: CourseModel): void {
    this.progressBar = true;

    this.courseHttpService
      .updateCourseNameAndDuration(course.id!, course)
      .subscribe({
        next: (response) => {
          this.messageService.success(response);
          this.progressBar = false;
          //this.dialogForm.emit(false);
        },
        error: (error) => {
          this.messageService.errorValid(error);
          this.progressBar = false;
          //this.dialogForm.emit(false);
        },
      });
  }

  isRequired(field: AbstractControl): boolean {
    return field.hasValidator(Validators.required);
  }

  // Getters

  get lectiveYear() {
    return this.formPlanification.controls['lectiveYear'];
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
