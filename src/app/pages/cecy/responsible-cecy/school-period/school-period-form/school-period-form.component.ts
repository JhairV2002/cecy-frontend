import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {AbstractControl,FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CoreHttpService, MessageService} from "@services/core";
import {SchoolPeriodHttpService} from "@services/cecy/school-period-http.service";
import {CatalogueModel as CecyCatalogueModel, DetailSchoolPeriodModel, SchoolPeriodModel} from "@models/cecy";
import {CatalogueHttpService} from "@services/cecy";

@Component({
  selector: 'app-school-period-form',
  templateUrl: './school-period-form.component.html',
  styleUrls: ['./school-period-form.component.scss']
})
export class SchoolPeriodFormComponent implements OnInit {

  private schoolPeriod$ = this.schoolPeriodHttpService.schoolPeriod$;
  private unsubscribe$ = new Subject<void>();
  @Output() dialogForm = new EventEmitter<boolean>();
  @Input() schoolPeriod: SchoolPeriodModel = {};
  public formSchoolPeriod: FormGroup = this.newFormSchoolPeriod;
  public progressBar: boolean = false;

  public states: CecyCatalogueModel[] = [];



  constructor(private formBuilder: FormBuilder,
              private schoolPeriodHttpService: SchoolPeriodHttpService,
              private cataloguesHttpService:CatalogueHttpService,
              public messageService: MessageService,
  ) {
    this.schoolPeriod$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(response => {
        if (response.id !== undefined) {
          this.formSchoolPeriod.reset(response);
        }
        console.log(response);
        console.log(this.formSchoolPeriod);
      });
  }

  ngOnInit(): void {
    this.loadStates();
    this.formSchoolPeriod.patchValue(this.schoolPeriod);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  get newFormSchoolPeriod(): FormGroup {
    return this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required]],
      code: [null, [Validators.required]],
      state: [null, [Validators.required]],
      minimumNote: [null, [Validators.required, Validators.maxLength(3)]],
      startedAt: [null, [Validators.required]],
      endedAt: [null, [Validators.required]],
    });
  }

  loadStates(page: number=1){
    this.cataloguesHttpService.getCatalogues('SCHOOL_PERIOD_STATE').subscribe(
      response=>{
        this.states =response.data;
        console.log(this.states)
      },error => {
        this.messageService.error(error);
      }
    )
  }

  onSubmit() {
    if (this.formSchoolPeriod.valid) {
      if (this.idField.value) {
        this.updateSchoolPeriod(this.formSchoolPeriod.value);
      } else {
        this.storeSchoolPeriod(this.formSchoolPeriod.value);
      }
    } else {
      this.formSchoolPeriod.markAllAsTouched();
    }
  }

  storeSchoolPeriod(schoolPeriod: SchoolPeriodModel): void {
    this.progressBar = true;
    this.schoolPeriodHttpService.storeSchoolPeriod(schoolPeriod).subscribe(
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

  updateSchoolPeriod(schoolPeriod: SchoolPeriodModel): void {
    this.progressBar = true;
    this.schoolPeriodHttpService.updateSchoolPeriod(schoolPeriod.id!, schoolPeriod).subscribe(
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
    return this.formSchoolPeriod.controls['id'];
  }
  get nameField() {
    return this.formSchoolPeriod.controls['name'];
  }

  get stateField() {
    return this.formSchoolPeriod.controls['state'];
  }

  get codeField() {
    return this.formSchoolPeriod.controls['code'];
  }

  get minimumNoteField() {
    return this.formSchoolPeriod.controls['minimumNote'];
  }

  get startedAtField() {
    return this.formSchoolPeriod.controls['startedAt'];
  }

  get endedAtField() {
    return this.formSchoolPeriod.controls['endedAt'];
  }

}
