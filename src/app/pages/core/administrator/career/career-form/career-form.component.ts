import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { CareersService } from '@services/cecy/coordinator-career';
import { MessageService } from '@services/core';

@Component({
  selector: 'app-career-form',
  templateUrl: './career-form.component.html',
  styleUrls: ['./career-form.component.css'],
})
export class CareerFormComponent implements OnInit, OnChanges {
  @Input() showModal: boolean = false;
  @Input() selectedCareer: any = null;
  @Output() addCareer = new EventEmitter<any>();
  @Output() clickClose = new EventEmitter<boolean>();

  formCareer = this.fb.group({
    name: ['', [Validators.required]],
  });

  titleModal: string = '';
  progressBar: boolean = false;
  titleButton: string = '';
  isEdit: boolean = false;
  constructor(
    private fb: FormBuilder,
    private careerService: CareersService,
    public messageService: MessageService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.selectedCareer) {
      this.formCareer.patchValue(this.selectedCareer);
      this.titleModal = 'Editar un';
      this.titleButton = 'Editar';
      this.isEdit = true;
    } else {
      this.formCareer.reset();
      this.titleModal = 'Crear un';
      this.titleButton = 'Crear';
      this.isEdit = false;
    }
  }

  onSubmit() {
    if (this.formCareer.valid) {
      this.addEditCareer();
    } else {
      this.formCareer.markAllAsTouched();
    }
  }

  addEditCareer() {
    this.progressBar = true;
    const valuesForm = this.formCareer.value;
    this.careerService
      .addEditCareer(valuesForm, this.selectedCareer)
      .subscribe({
        next: (data) => {
          this.progressBar = false;
          this.clickClose.emit(false);
          this.addCareer.emit(data);
          this.messageService.successCareer(data);
          this.formCareer.reset();
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

  isRequired(field: AbstractControl): boolean {
    return field.hasValidator(Validators.required);
  }

  // Getters of form
  get nameField() {
    return this.formCareer.controls['name'];
  }
}
