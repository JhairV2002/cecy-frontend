import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {AbstractControl,FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { MessageService} from "@services/core";
import {CatalogueModel as CecyCatalogueModel, RequirementModel, SchoolPeriodModel} from "@models/cecy";
import {CatalogueHttpService, RequirementHttpService} from "@services/cecy";

@Component({
  selector: 'app-requirement-form',
  templateUrl: './requirement-form.component.html',
  styleUrls: ['./requirement-form.component.scss']
})
export class RequirementFormComponent implements OnInit {

  private requirement$ = this.requirementHttpService.requirement$;
  private unsubscribe$ = new Subject<void>();
  @Output() dialogForm = new EventEmitter<boolean>();
  @Input() requirement: RequirementModel = {};
  public formRequirement: FormGroup = this.newFormRequirement;
  public progressBar: boolean = false;

  public states: CecyCatalogueModel[] = [];



  constructor(private formBuilder: FormBuilder,
              private requirementHttpService: RequirementHttpService,
              private cataloguesHttpService:CatalogueHttpService,
              public messageService: MessageService,
  ) {
    this.requirement$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(response => {
        if (response.id !== undefined) {
          this.newFormRequirement.reset(response);
        }
        console.log(response);
        console.log(this.formRequirement);
      });
  }

  ngOnInit(): void {
    this.loadStates();
    this.formRequirement.patchValue(this.requirement);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  get newFormRequirement(): FormGroup {
    return this.formBuilder.group({
      id: [null],
      state: [null, [Validators.required]],
      name: [null, [Validators.required]],
      required: [false, [Validators.required]],
    });
  }

  loadStates(page: number=1){
    this.cataloguesHttpService.getCatalogues('REQUIREMENT_STATE').subscribe(
      response=>{
        this.states =response.data;
        console.log(this.states)
      },error => {
        this.messageService.error(error);
      }
    )
  }

  onSubmit() {
    if (this.formRequirement.valid) {
      if (this.idField.value) {
        this.updateRequirement(this.formRequirement.value);
      } else {
        console.log(this.formRequirement.value)

        this.storeRequirement(this.formRequirement.value);
      }
    } else {
      this.formRequirement.markAllAsTouched();
    }
  }

  storeRequirement(requirement: RequirementModel): void {
    this.progressBar = true;
    this.requirementHttpService.storeRequirement(requirement).subscribe(
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

  updateRequirement(requirement: RequirementModel): void {
    this.progressBar = true;
    this.requirementHttpService.updateRequirement(requirement.id!, requirement).subscribe(
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
    return this.formRequirement.controls['id'];
  }
  get nameField() {
    return this.formRequirement.controls['name'];
  }

  get stateField() {
    return this.formRequirement.controls['state'];
  }

  get requiredField() {
    return this.formRequirement.controls['required'];
  }

}
