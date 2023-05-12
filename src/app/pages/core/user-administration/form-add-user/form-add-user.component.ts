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
  @Output() addUser = new EventEmitter<any>();
  @Output() clickClose = new EventEmitter<boolean>();
  @Input() selectedUser: any = null;
  @Input() dialogForm: boolean = true;

  formUser = this.formBuilder.group({
    id: [null],
    name: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.maxLength(10)]],
    user: this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      role: ['', [Validators.required]],
    }),
  });

  progressBar: boolean = false;
  roles: any = [];
  titleModal: string = '';
  titleButton: string = '';

  constructor(
    private formBuilder: FormBuilder,
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
      console.log('Que data hay aqui', this.selectedUser);
      this.titleModal = 'Editar un';
      this.titleButton = 'Editar';
    } else {
      this.formUser.reset();
      this.titleModal = 'Crear un';
      this.titleButton = 'Crear';
    }
  }

  getRoles() {
    this.rolesService.getRoles().subscribe((data) => {
      this.roles = data;
      console.log('Roles: ', this.roles);
    });
  }

  addEditUser() {
    this.progressBar = true;
    const valuesForm = this.formUser.value;
    this.userService.createEdit(valuesForm, this.selectedUser).subscribe({
      next: (data) => {
        this.messageService.successUser(data);
        this.formUser.reset();
        this.progressBar = false;
        this.clickClose.emit(false);
        this.addUser.emit(data);
      },
      error: (error) => {
        console.log(error);
        this.messageService.error(error);
        this.progressBar = false;
      },
    });
  }

  // onchange(e: any) {
  //   const t = this.formUser.get('user.role').setValue(e.target.value, {
  //     onlySelf: true,
  //   });
  // }

  onSubmit() {
    if (this.formUser.valid) {
      this.addEditUser();
    } else {
      this.formUser.markAllAsTouched();
    }
  }

  closeModal() {
    this.clickClose.emit(false);
    this.selectedUser = null;
  }

  // Required
  isRequired(field: AbstractControl): boolean {
    return field.hasValidator(Validators.required);
  }

  // Getters of form
  get idField() {
    return this.formUser.controls['id'];
  }

  get lastnameField() {
    return this.formUser.controls['lastname'];
  }

  get nameField() {
    return this.formUser.controls['name'];
  }

  get phoneField() {
    return this.formUser.controls['phone'];
  }

  // get roleField() {
  //   return this.formUser.controls['user.role'];
  // }

  get emailField() {
    return this.formUser.get('user.email');
  }

  // get passwordField() {
  //   return this.formUser.controls['user.password'];
  // }
}
