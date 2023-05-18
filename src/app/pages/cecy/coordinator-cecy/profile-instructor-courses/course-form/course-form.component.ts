import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { CourseModel, InstructorModel } from '@models/cecy';
import { CourseHttpService, InstructorHttpService } from '@services/cecy';
import { CoreHttpService, MessageService } from '@services/core';
import { CareerModel } from '@models/core';
import { courseProfileHttpService } from '@services/cecy/course-profile-http.service';

@Component({
  selector: 'app-course-profile-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  @Output() dialogForm = new EventEmitter<boolean>();
  @Input() id: any;

  private unsubscribe$ = new Subject<void>();
  private selectedCourse$ = this.courseHttpService.seletedCourse$;
  public formCourse: FormGroup = this.newFormCourse;
  public progressBar: boolean = false;

  // Foreign Key
  public responsibles: InstructorModel[] = [];

  public experiencia: string[] = [];

  public conocimiento: string[] = [];

  public habilidad: string[] = [];

  course: any;

  constructor(
    private formBuilder: FormBuilder,
    private courseHttpService: CourseHttpService,
    private instructorHttpService: InstructorHttpService,
    public messageService: MessageService,
    private courseProfileHttpService: courseProfileHttpService
  ) {
    this.selectedCourse$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response) => {
        console.log(response);

        if (response.id !== undefined) {
          this.formCourse.reset(response);
          this.course = response;
        }
      });
  }

  ngOnInit(): void {
    this.loadResponsibles();
    console.log(this.id);
  }
  //experiencia
  addExperiense(experiencia: string) {
    this.experiencia.push(experiencia);
    this.formCourse.controls['experiencia'].setValue('');
  }

  deleteExperiense() {
    this.experiencia.pop();
  }
  //conocimiento
  addKanogledges(conocimiento: string) {
    this.conocimiento.push(conocimiento);
    this.formCourse.controls['conocimiento'].setValue('');
  }

  deleteKanogledges() {
    this.conocimiento.pop();
  }
  //habilidades
  addSkills(habilidad: string) {
    this.habilidad.push(habilidad);
    this.formCourse.controls['habilidades'].setValue('');
  }

  deleteSkills() {
    this.habilidad.pop();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  loadResponsibles() {
    this.instructorHttpService.getInstructors().subscribe({
      next: (response) => (this.responsibles = response.data),
      error: (error) => this.messageService.error(error),
    });
  }

  get newFormCourse(): FormGroup {
    return this.formBuilder.group({
      id: [null],
      habilidades: [null],
      conocimiento: [null],
      experiencia: [null],
    });
  }

  onSubmit() {
    if (this.formCourse.valid) {
      this.storeProfileCourse();
    } else {
      this.formCourse.markAllAsTouched();
    }
  }

  storeProfileCourse(): void {
    this.progressBar = true;
    let perfil: any = {};
    perfil.course = this.course;

    (perfil.requiredExperiences = this.experiencia),
      (perfil.requiredKnowledges = this.conocimiento),
      (perfil.requiredSkills = this.habilidad),
      this.courseProfileHttpService.storeCourseProfile(perfil).subscribe({
        next: (response) => {
          this.messageService.success(response);
          this.progressBar = false;
          this.dialogForm.emit(false);
        },
        error: (error) => {
          this.messageService.error(error);
          this.progressBar = false;
          this.dialogForm.emit(false);
        },
      });
  }

  updateCourse(course: CourseModel): void {
    this.progressBar = true;

    this.courseHttpService
      .updateCourseNameAndDuration(course.id!, course)
      .subscribe({
        next: (response) => {
          this.messageService.success(response);
          this.progressBar = false;
          this.dialogForm.emit(false);
        },
        error: (error) => {
          this.messageService.error(error);
          this.progressBar = false;
          this.dialogForm.emit(false);
        },
      });
  }

  isRequired(field: AbstractControl): boolean {
    return field.hasValidator(Validators.required);
  }

  // Getters
  get idField() {
    return this.formCourse.controls['id'];
  }

  get habilidadesField() {
    return this.formCourse.controls['habilidades'];
  }

  get conocimientoField() {
    return this.formCourse.controls['conocimiento'];
  }

  get experienciaField() {
    return this.formCourse.controls['experiencia'];
  }
}
