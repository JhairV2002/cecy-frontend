import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RegistrationModel} from '@models/cecy';
import {RegistrationHttpService} from '@services/cecy';
import {MessageService} from '@services/core';

@Component({
  selector: 'app-participant-course-form',
  templateUrl: './participant-course-form.component.html',
  styleUrls: ['./participant-course-form.component.scss']
})
export class ParticipantCourseFormComponent implements OnInit {
  @Output() dialogForm = new EventEmitter<boolean>();
  @Input() registration: RegistrationModel = {};
  public formGrades: FormGroup = this.newFormGrades;
  public progressBar: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private registrationHttpService: RegistrationHttpService,
    private messageService: MessageService) {
  }

  ngOnInit(): void {
    console.log(this.registration);
    this.formGrades.patchValue(this.registration);
    console.log(this.formGrades.value);
  }

  get newFormGrades(): FormGroup {
    return this.formBuilder.group({
      id: [null],
      grade1: [null, [Validators.required,Validators.max(100)]],
      grade2: [null, [Validators.required,Validators.max(100)]],
      // finalGrade: [{value: null, disabled: true}, [Validators.required]],
      // finalGrade: [null, [Validators.required]],
    });
  }

  onSubmit() {
    if (this.formGrades.valid) {
      if (this.idField.value) {
        this.updateGradesParticipant(this.formGrades.value);
      }
    } else {
      this.formGrades.markAllAsTouched();
    }
  }

  updateGradesParticipant(registration: RegistrationModel): void {
    this.progressBar = true;
    this.registrationHttpService.updateGradesParticipant(this.registration.id, registration).subscribe(
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

  get idField() {
    return this.formGrades.controls['id'];
  }

  get grade1Field() {
    return this.formGrades.controls['grade1'];
  }

  get grade2Field() {
    return this.formGrades.controls['grade2'];
  }

  // get finalGradeField() {
  //   return this.formGrades.controls['finalGrade'];
  // }

}
