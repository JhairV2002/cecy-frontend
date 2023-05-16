import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { InstructorModel, PlanificationModel } from '@models/cecy';
import { InstructorHttpService, PlanificationHttpService, SchoolPeriodHttpService } from '@services/cecy';
import { MessageService } from '@services/core';

@Component({
  selector: 'app-planification-form',
  templateUrl: './planification-form.component.html',
  styleUrls: ['./planification-form.component.scss']
})
export class PlanificationFormComponent implements OnInit {
  @Output() dialogForm = new EventEmitter<boolean>();
  @Input() courseId: number | undefined;

  private unsubscribe$ = new Subject<void>();
  private planification$ = this.planificationHttpService.planification$;
  public formPlanification: FormGroup = this.newFormPlanification;
  public progressBar: boolean = false;
  public minDate: Date | undefined;
  public maxDate: Date | undefined;

  // Foreign Key
  public courseResponsibles: InstructorModel[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private planificationHttpService: PlanificationHttpService,
    private instructorHttpService: InstructorHttpService,
    private schoolPeriodHttpService: SchoolPeriodHttpService,
    public messageService: MessageService,
  ) {

    this.planification$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(response => {

        if (response.id !== undefined) {
          this.formPlanification.reset(response);
        }
      });
  }

  ngOnInit(): void {
    this.loadCourseResponsibles();
    this.loadCurrentSchoolPeriod();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  loadCurrentSchoolPeriod() {
    this.schoolPeriodHttpService
      .getCurrentSchoolPeriod()
      .subscribe(
        response => {
          // DDRC-C: usado para la validacion del fechas dentro del periodo lectivo actual
          const [sY, sM, sD] = response.data.startedAt.split('-')
          this.minDate = new Date(+sY, +sM - 1, +sD);
          const [eY, eM, eD] = response.data.endedAt.split('-')
          this.maxDate = new Date(+eY, +eM - 1, +eD);
        });
  }

  loadCourseResponsibles() {
    this.instructorHttpService
      .getInstructors()
      .subscribe({
        next: response => this.courseResponsibles = response.data,
        error: error => this.messageService.error(error)
      });
  }

  get newFormPlanification(): FormGroup {
    return this.formBuilder.group({
      id: [null],
      responsibleCourse: [null, [Validators.required]],
      startedAt: [null, [Validators.required]],
      endedAt: [null, [Validators.required]],
    });
  }

  onSubmit() {
    if (this.formPlanification.valid) {
      if (this.idField.value) {
        this.updatePlanification(this.formPlanification.value);
      } else {
        this.storePlanification(this.formPlanification.value);
      }
    } else {
      this.formPlanification.markAllAsTouched();
    }
  }

  storePlanification(planification: PlanificationModel): void {
    this.progressBar = true;

    this.planificationHttpService
      .storePlanificationByCourse(this.courseId, planification)
      .subscribe(
        {
          next: response => {
            this.messageService.success(response);
            this.progressBar = false;
            this.dialogForm.emit(false);
          },
          error: error => {
            this.messageService.error(error);
            this.progressBar = false;
            this.dialogForm.emit(false);
          }
        }
      );
  }

  updatePlanification(planification: PlanificationModel): void {
    this.progressBar = true;

    this.planificationHttpService
      .updatePlanificationByCourse(planification.id!, planification)
      .subscribe(
        {
          next: response => {
            this.messageService.success(response);
            this.progressBar = false;
            this.dialogForm.emit(false);
          },
          error: error => {
            this.messageService.error(error);
            this.progressBar = false;
            this.dialogForm.emit(false);
          }
        }
      );
  }

  isRequired(field: AbstractControl): boolean {
    return field.hasValidator(Validators.required);
  }

  // Getters
  get idField() {
    return this.formPlanification.controls['id'];
  }

  get responsibleCourseField() {
    return this.formPlanification.controls['responsibleCourse'];
  }

  get startedAtField() {
    return this.formPlanification.controls['startedAt'];
  }

  get endedAtField() {
    return this.formPlanification.controls['endedAt'];
  }
}
