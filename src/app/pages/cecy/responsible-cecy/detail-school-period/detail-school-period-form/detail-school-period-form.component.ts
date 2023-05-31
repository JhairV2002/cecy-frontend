import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CourseModel, DetailSchoolPeriodModel, RequirementModel, SchoolPeriodModel} from "@models/cecy";
import {CourseHttpService, DetailSchoolPeriodHttpService, SchoolPeriodHttpService} from "@services/cecy";
import {MessageService} from "@services/core";

@Component({
  selector: 'app-detail-school-period-form',
  templateUrl: './detail-school-period-form.component.html',
  styleUrls: ['./detail-school-period-form.component.scss']
})
export class DetailSchoolPeriodFormComponent implements OnInit {

  private detailSchoolPeriod$ = this.detailSchoolPeriodHttpService.detailSchoolPeriod$;
  private unsubscribe$ = new Subject<void>();
  @Output() dialogForm = new EventEmitter<boolean>();
  @Input() detailSchoolPeriod: DetailSchoolPeriodModel = {};
  public formDetailSchoolPeriod: FormGroup = this.newFormDetailSchoolPeriod;
  public progressBar: boolean = false;

  public schoolPeriods: SchoolPeriodModel[] = [];


  constructor(private formBuilder: FormBuilder,
              private detailSchoolPeriodHttpService: DetailSchoolPeriodHttpService,
              private schoolPeriodHttpService:SchoolPeriodHttpService,
              public messageService: MessageService,
  ) {
    this.detailSchoolPeriod$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(response => {
        if (response.id !== undefined) {
          this.formDetailSchoolPeriod.reset(response);
        }
        console.log(response);
        console.log(this.formDetailSchoolPeriod);
      });
  }

  ngOnInit(): void {
    this.loadDetailSchoolPeriods();
    this.formDetailSchoolPeriod.patchValue(this.detailSchoolPeriod);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  get newFormDetailSchoolPeriod(): FormGroup {
    return this.formBuilder.group({
      id: [null],
      schoolPeriod: [null, [Validators.required]],
      especialEndedAt: [null, [Validators.required]],
      especialStartedAt: [null, [Validators.required]],
      extraordinaryEndedAt: [null, [Validators.required]],
      extraordinaryStartedAt: [null, [Validators.required]],
      nullificationEndedAt: [null, [Validators.required]],
      nullificationStartedAt: [null, [Validators.required]],
      ordinaryEndedAt: [null, [Validators.required]],
      ordinaryStartedAt: [null, [Validators.required]],
    });
  }

  loadDetailSchoolPeriods(){
    this.schoolPeriodHttpService.getSchoolPeriods().subscribe(
      response=>{
        this.schoolPeriods =response.data;
      },error => {
        this.messageService.error(error);
      }
    )
  }

  onSubmit() {
    if (this.formDetailSchoolPeriod.valid) {
      if (this.idField.value) {
        this.updateDetailSchoolPeriod(this.formDetailSchoolPeriod.value);
      } else {
        this.storeDetailSchoolPeriod(this.formDetailSchoolPeriod.value);
      }
    } else {
      this.formDetailSchoolPeriod.markAllAsTouched();
    }
  }

  storeDetailSchoolPeriod(detailSchoolPeriod: DetailSchoolPeriodModel): void {
    this.progressBar = true;
    this.detailSchoolPeriodHttpService.storeDetailSchoolPeriod(detailSchoolPeriod).subscribe(
      response => {
        this.messageService.success(response);
        this.progressBar = false;
        this.dialogForm.emit(false);
      },
      error => {
        this.messageService.error(error);
        this.progressBar = false;
      }
    );
  }

  updateDetailSchoolPeriod(detailSchoolPeriod: DetailSchoolPeriodModel): void {
    this.progressBar = true;
    this.detailSchoolPeriodHttpService.updateDetailSchoolPeriod(detailSchoolPeriod.id!, detailSchoolPeriod).subscribe(
      response => {
        this.messageService.success(response);
        this.progressBar = false;
        this.dialogForm.emit(false);
      },
      error => {
        this.messageService.error(error);
        this.progressBar = false;
      }
    );
  }

  isRequired(field: AbstractControl): boolean {
    return field.hasValidator(Validators.required);
  }

  // Getters

  get idField() {
    return this.formDetailSchoolPeriod.controls['id'];
  }
  get schoolPeriodField() {
    return this.formDetailSchoolPeriod.controls['schoolPeriod'];
  }

  get especialEndedAtField() {
    return this.formDetailSchoolPeriod.controls['especialEndedAt'];
  }

  get especialStartedAtField() {
    return this.formDetailSchoolPeriod.controls['especialStartedAt'];
  }

  get extraordinaryEndedAtField() {
    return this.formDetailSchoolPeriod.controls['extraordinaryEndedAt'];
  }

  get extraordinaryStartedAtField() {
    return this.formDetailSchoolPeriod.controls['extraordinaryStartedAt'];
  }

  get nullificationEndedAtField() {
    return this.formDetailSchoolPeriod.controls['nullificationEndedAt'];
  }
  get nullificationStartedAtField() {
    return this.formDetailSchoolPeriod.controls['nullificationStartedAt'];
  }

  get ordinaryEndedAtField() {
    return this.formDetailSchoolPeriod.controls['ordinaryEndedAt'];
  }

  get ordinaryStartedAtField() {
    return this.formDetailSchoolPeriod.controls['ordinaryStartedAt'];
  }

}
