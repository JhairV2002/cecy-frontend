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
import { MessageService } from '@services/core';
import { CatalogueUserService } from '@services/core/administrator';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit, OnChanges {
  @Input() showModal: boolean = false;
  @Input() selectedUser: any = null;
  @Output() addUser = new EventEmitter<any>();
  @Output() clickClose = new EventEmitter<boolean>();

  formUser = this.fb.group({
    names: ['', [Validators.required]],
    lastnames: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.maxLength(10)]],
    email: ['', [Validators.required, Validators.email]],
    identityCard: ['', [Validators.required, Validators.maxLength(10)]],
    password: ['', [Validators.required]],
    image: [''],
    genderId: [null, [Validators.required]],
    roleId: [null, [Validators.required]],
  });

  progressBar: boolean = false;
  roles: any = [];
  titleModal: string = '';
  titleButton: string = '';
  isEdit: boolean = false;
  catalogue: any = [];

  constructor(
    private fb: FormBuilder,
    private rolesService: RolesService,
    private userService: UserService,
    public messageService: MessageService,
    private catalogueUser: CatalogueUserService
  ) {
    this.formUser.get('user.role');
  }

  ngOnInit(): void {
    this.getRoles();
    this.getCatalogues();
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

  getCatalogues() {
    this.catalogueUser.getCatalogue().subscribe((data) => {
      console.log('CATALOGO', data);
      this.catalogue = data;
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

  get passwordField() {
    return this.formUser.controls['password'];
  }

  get identityCardField() {
    return this.formUser.controls['identityCard'];
  }

  get roleField() {
    return this.formUser.controls['roleId'];
  }

  get genderField() {
    return this.formUser.controls['genderId'];
  }
}
