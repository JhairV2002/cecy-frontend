import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MessageService } from '@services/core';
import { SchoolYearService } from '@services/cecy/coordinator-cecy';
@Component({
  selector: 'app-school-year-form',
  templateUrl: './school-year-form.component.html',
  styleUrls: ['./school-year-form.component.css'],
})
export class SchoolYearFormComponent implements OnInit, OnChanges {
  @Input() showModal: boolean = false;
  @Input() selectedYearSchool: any = null;
  @Output() addSchoolYear = new EventEmitter<any>();
  @Output() clickClose = new EventEmitter<boolean>();

  formSchoolPeriod = this.fb.group({
    year: ['', [Validators.required, this.fourDigitYearValidator()]],
    cycle: ['', [Validators.required]],
  });
  titleModal: string = '';
  progressBar: boolean = false;
  titleButton: string = '';
  isEdit: boolean = false;
  cicles = [
    { id: 'I', name: 'I' },
    { id: 'II', name: 'II' },
  ];
  constructor(
    private fb: FormBuilder,
    private schoolYearService: SchoolYearService,
    public messageService: MessageService
  ) {}
  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    if (this.selectedYearSchool) {
      this.formSchoolPeriod.patchValue(this.selectedYearSchool);
      this.titleModal = 'Editar un';
      this.titleButton = 'Editar';
      this.isEdit = true;
    } else {
      this.formSchoolPeriod.reset();
      this.titleModal = 'Crear un';
      this.titleButton = 'Crear';
      this.isEdit = false;
    }
  }

  onSubmit() {
    if (this.formSchoolPeriod.valid) {
      this.addEditSchoolYear();
    } else {
      this.formSchoolPeriod.markAllAsTouched();
    }
  }

  addEditSchoolYear() {
    this.progressBar = true;
    const valuesForm = this.formSchoolPeriod.value;
    console.log(valuesForm);
    this.schoolYearService
      .addEditSchoolYear(valuesForm, this.selectedYearSchool)
      .subscribe({
        next: (data) => {
          this.progressBar = false;
          this.clickClose.emit(false);
          this.addSchoolYear.emit(data);
          this.messageService.successRol(data);
          this.formSchoolPeriod.reset();
        },
        error: (error) => {
          this.progressBar = false;
          this.messageService.error(error);
        },
      });
  }

  closeModal() {
    this.clickClose.emit(false);
  }

  // Required
  isRequired(field: AbstractControl): boolean {
    return field.hasValidator(Validators.required);
  }

  fourDigitYearValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const year = control.value;
      if (year && year.toString().length !== 4) {
        return { invalidYear: true };
      }
      return null;
    };
  }

  // Getters of form
  get nameField() {
    return this.formSchoolPeriod.controls['year'];
  }

  get cycleField() {
    return this.formSchoolPeriod.controls['cycle'];
  }
}
