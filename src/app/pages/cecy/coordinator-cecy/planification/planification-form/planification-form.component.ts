import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import {
  AuthorityModel,
  CourseModel,
  InstructorModel,
  PlanificationModel,
} from '@models/cecy';
import {
  AuthorityHttpService,
  CourseHttpService,
  InstructorHttpService,
  PlanificationHttpService,
} from '@services/cecy';
import { CoreHttpService, MessageService } from '@services/core';
import { CareerModel } from '@models/core';

@Component({
  selector: 'app-planification-form',
  templateUrl: './planification-form.component.html',
  styleUrls: ['./planification-form.component.scss'],
})
export class PlanificationFormComponent implements OnInit {
  @Output() dialogForm = new EventEmitter<boolean>();

  private unsubscribe$ = new Subject<void>();
  private planification$ = this.planificationHttpService.planification$;
  public formPlanification: FormGroup = this.newFormPlanification;
  public progressBar: boolean = false;
  public planificationId: number = 0;

  // Foreign Key
  public cecyResponsibles: AuthorityModel[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private planificationHttpService: PlanificationHttpService,
    private instructorHttpService: InstructorHttpService,
    private authorityHttpService: AuthorityHttpService,
    public messageService: MessageService
  ) {
    this.planification$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response) => {
        console.log(response);

        if (response.id !== undefined) {
          this.formPlanification.reset(response);
        }
      });
  }

  ngOnInit(): void {
    this.loadCecyResponsibles();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  loadCecyResponsibles() {
    this.authorityHttpService.catalogue().subscribe({
      next: (response) => (this.cecyResponsibles = response.data),
      error: (error) => this.messageService.error(error),
    });
  }

  get newFormPlanification(): FormGroup {
    return this.formBuilder.group({
      id: [null],
      responsibleCecy: [null, [Validators.required]],
    });
  }

  onSubmit() {
    if (this.formPlanification.valid) {
      this.updatePlanification(this.formPlanification.value);
    } else {
      this.formPlanification.markAllAsTouched();
    }
  }

  updatePlanification(planification: PlanificationModel): void {
    this.progressBar = true;
    console.log(planification);

    this.planificationHttpService
      .assignResponsibleCecy(planification.id!, planification)
      .subscribe({
        next: (response) => {
          this.messageService.success(response);
          this.progressBar = false;
          this.dialogForm.emit(false);
        },
        error: (error) => {
          this.messageService.error(error);
          this.progressBar = false;
        },
      });
  }

  isRequired(field: AbstractControl): boolean {
    return field.hasValidator(Validators.required);
  }

  // Getters
  get idField() {
    return this.formPlanification.controls['id'];
  }

  get responsibleCecyField() {
    return this.formPlanification.controls['responsibleCecy'];
  }

  get startedAtField() {
    return this.formPlanification.controls['startedAt'];
  }

  get endedAtField() {
    return this.formPlanification.controls['endedAt'];
  }

  get courseField() {
    return this.formPlanification.controls['course'];
  }

  get observationsField() {
    return this.formPlanification.controls['observations'];
  }
}
