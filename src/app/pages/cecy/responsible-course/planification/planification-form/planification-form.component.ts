import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { debounceTime, Subject, takeUntil, tap } from 'rxjs';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CoreHttpService, MessageService } from '@services/core';
import { PlanificationHttpService } from '@services/cecy/planification-http.service';
import { CatalogueModel } from '@models/cecy';
import { PlanificationModel } from '@models/cecy';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-planification-form',
  templateUrl: './planification-form.component.html',
  styleUrls: ['./planification-form.component.scss']
})
export class PlanificationFormComponent implements OnInit, OnDestroy {
  // private planification$ = this.planificationHttpService.planification$;
  private unsubscribe$ = new Subject<void>();
  public formPlanification: FormGroup = this.newFormPlanification;
  public progressBar: boolean = false;
  planificationId: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    public messageService: MessageService,
    private planificationHttpService: PlanificationHttpService,
  ) {
    this.planificationId = this.activatedRoute.snapshot.params['id'];

    this.planificationHttpService
      .getPlanification(this.planificationId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(response => {
        if (response.data.id !== undefined) {
          this.formPlanification.patchValue(response.data);
          this.needsField.clear();
          this.observationsField.clear();

          response.data.needs.forEach((need: string) => {
            this.addNeed(need);
          });

          response.data.observations.forEach((observation: string) => {
            this.addObservation(observation);
          });
        }
      });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  loadPlanification() {
  }

  get newFormPlanification(): FormGroup {
    return this.formBuilder.group({
      id: [null,],
      endedAt: [null,],
      needs: this.formBuilder.array([this.formBuilder.control(null)]),
      observations: this.formBuilder.array([this.formBuilder.control(null)]),
      startedAt: [null,],
    });
  }

  onSubmit() {
    if (this.formPlanification.valid) {
      this.updatePlanification(this.formPlanification.value);
    }
    this.formPlanification.markAllAsTouched();
  }

  updatePlanification(planification: PlanificationModel): void {
    this.progressBar = true;
    this.planificationHttpService.updateDatesAndNeedsInPlanification(planification.id!, planification)
      .subscribe({
        next: response => {
          this.messageService.success(response);
          this.progressBar = false;
        }, error: error => {
          this.messageService.error(error);
          this.progressBar = false;
        }
      });
  }

  isRequired(field: AbstractControl): boolean {
    return field.hasValidator(Validators.required);
  }

  addNeed(data: string = '') {
    this.needsField.push(this.formBuilder.control(data, Validators.required));
  }

  addNeedFromTemplate(data: string = '') {
    //validar si le corresponde la planificación al usuario logeado
    if (!this.planificationHttpService.verifyResponsibleCourse()) {
      this.messageService.deny();
      return;
    }
    this.needsField.push(this.formBuilder.control(data, Validators.required));
  }

  removeNeed(index: number) {
    if (!this.planificationHttpService.verifyResponsibleCourse()) {
      this.messageService.deny();
      return;
    }
    if (this.needsField.length > 1) {
      this.needsField.removeAt(index);
    } else {
      this.needsField.markAllAsTouched();
      this.messageService.errorRequired();
    }
  }

  addObservation(data: string = '') {
    this.observationsField.push(this.formBuilder.control(data, Validators.required));
  }

  // Getters
  get idField() {
    return this.formPlanification.controls['id'];
  }

  get endedAtField() {
    return this.formPlanification.controls['endedAt'];
  }

  get needsField(): FormArray {
    return this.formPlanification.controls['needs'] as FormArray;;
  }

  get observationsField(): FormArray {
    return this.formPlanification.controls['observations'] as FormArray;;
  }

  get startedAtField() {
    return this.formPlanification.controls['startedAt'];
  }
}
