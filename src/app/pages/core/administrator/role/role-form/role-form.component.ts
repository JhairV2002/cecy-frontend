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
import { MessageService } from '@services/core';
import { RolesService } from '@services/core/administrator';

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.css'],
})
export class RoleFormComponent implements OnInit, OnChanges {
  @Input() showModal: boolean = false;
  @Input() selectedRol: any = null;
  @Output() addRole = new EventEmitter<any>();
  @Output() clickClose = new EventEmitter<boolean>();

  formRol = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });
  titleModal: string = '';
  progressBar: boolean = false;
  titleButton: string = '';
  isEdit: boolean = false;
  constructor(
    private fb: FormBuilder,
    private rolesService: RolesService,
    public messageService: MessageService
  ) {}
  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    if (this.selectedRol) {
      this.formRol.patchValue(this.selectedRol);
      this.titleModal = 'Editar un';
      this.titleButton = 'Editar';
      this.isEdit = true;
    } else {
      this.formRol.reset();
      this.titleModal = 'Crear un';
      this.titleButton = 'Crear';
      this.isEdit = false;
    }
  }

  onSubmit() {
    if (this.formRol.valid) {
      this.addEditRole();
    } else {
      this.formRol.markAllAsTouched();
    }
  }

  addEditRole() {
    this.progressBar = true;
    const valuesForm = this.formRol.value;
    this.rolesService.addEditRole(valuesForm, this.selectedRol).subscribe({
      next: (data) => {
        this.progressBar = false;
        this.clickClose.emit(false);
        this.addRole.emit(data);
        this.messageService.successRol(data);
        this.formRol.reset();
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

  // Getters of form
  get nameField() {
    return this.formRol.controls['name'];
  }

  get descriptionField() {
    return this.formRol.controls['description'];
  }
}
