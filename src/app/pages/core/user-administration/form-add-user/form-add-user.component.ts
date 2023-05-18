import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { RolesService, UserService } from '@services/core/administrator';
import { SelecRoleDTO } from '../../../../models/authentication';
import { MessageService } from '@services/core';
import { CreateCustomer } from '@services/core/administrator/create.customer';

@Component({
  selector: 'app-form-add-user',
  templateUrl: './form-add-user.component.html',
  styleUrls: ['./form-add-user.component.scss'],
})
export class FormAddUserComponent implements OnInit, OnChanges {
  @Input() showModal: boolean = false;
  @Input() selectedUser: any = null;
  @Output() addUser = new EventEmitter<any>();
  @Output() clickClose = new EventEmitter<boolean>();

  formUser = this.fb.group({
    names: ['', [Validators.required]],
    lastnames: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.maxLength(10)]],
    email: ['', [Validators.required, Validators.email]],
    identityCard: [''],
    password: ['', [Validators.required]],
    image: [''],
    roleId: [null, [Validators.required]],
  });

  progressBar: boolean = false;
  roles: any = [];
  titleModal: string = '';
  titleButton: string = '';
  isEdit: boolean = false;

  constructor(
    private fb: FormBuilder,
    private rolesService: RolesService,
    private userService: UserService,
    public messageService: MessageService
  ) {
    this.formUser.get('user.role');
  }

  ngOnInit(): void {
    this.getRoles();
  }

  ngOnChanges(): void {
    if (this.selectedUser) {
      this.formUser.patchValue(this.selectedUser);
      this.titleModal = 'Editar un';
      this.titleButton = 'Editar';
      this.isEdit = true;
    } else {
      this.formUser.reset();
      this.titleModal = 'Crear un';
      this.titleButton = 'Crear';
      this.isEdit = false;
    }
  }

  getRoles() {
    this.rolesService.getRoles().subscribe((data) => {
      this.roles = data;
    });
  }

  onSubmit() {
    if (this.formUser.valid) {
      this.addEditUser();
    } else {
      this.formUser.markAllAsTouched();
    }
  }

  addEditUser() {
    this.progressBar = true;
    const valuesForm = this.formUser.value;
    this.userService.addEditUser(valuesForm, this.selectedUser).subscribe({
      next: (data) => {
        this.progressBar = false;
        this.clickClose.emit(false);
        this.addUser.emit(data);
        this.messageService.successUser(data);
        this.formUser.reset();
      },
      error: (error) => {
        console.log(error);
        this.messageService.error(error);
        this.progressBar = false;
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
    return this.formUser.controls['names'];
  }

  get lastnameField() {
    return this.formUser.controls['lastnames'];
  }

  get phoneField() {
    return this.formUser.controls['phone'];
  }

  get emailField() {
    return this.formUser.controls['email'];
  }

  get roleField() {
    return this.formUser.controls['roleId'];
  }

  get passwordField() {
    return this.formUser.controls['password'];
  }
}