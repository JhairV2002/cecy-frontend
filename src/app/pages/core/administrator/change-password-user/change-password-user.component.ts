import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from 'primeng/api';
import { MessageService as MessageLocal } from '@services/core';
import { User } from '@models/authentication';
import { UserService } from '@services/core/administrator';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-change-password-user',
  templateUrl: './change-password-user.component.html',
  styleUrls: ['./change-password-user.component.css'],
})
export class ChangePasswordUserComponent implements OnInit {
  formChangePasswordUser = this.fb.group({
    newPassword: ['', [Validators.required]],
    confirm_password: ['', [Validators.required]],
  });
  user: User | null = null;
  loading$ = new BehaviorSubject<boolean>(false);

  constructor(
    public fb: FormBuilder,
    private messageService: MessageService,
    private messageLocal: MessageLocal,
    private route: Router,
    private router: ActivatedRoute,
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.router.paramMap.subscribe((param) => {
      const userId = parseInt(param.get('userId')!, 10);
      console.log(userId);
      if (!isNaN(userId)) {
        this.userService.getUserById(userId).subscribe((user) => {
          console.log(user);
          this.user = user;
        });
      } else {
        console.error('El valor de userId no es un número válido.');
      }
    });
  }

  onSubmit() {
    if (this.formChangePasswordUser.valid) {
      this.changePasswordByUser();
    } else {
      console.log('error');
      this.formChangePasswordUser.markAllAsTouched();
    }
  }

  changePasswordByUser() {
    this.loading$.next(true);
    const userId = parseInt(this.activatedRoute.snapshot.params['userId']);
    const newPassword = this.formChangePasswordUser.value.newPassword;
    const currentPasswordHash = this.user?.password;

    console.log({
      userId,
      currentPasswordHash,
      newPassword,
    });

    this.userService
      .changePasswordByUserId(userId, currentPasswordHash, newPassword)
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.messageService.add({
            severity: 'success',
            summary: 'Actualizado',
            detail: `${data.message}`,
          });
          setTimeout(() => {
            this.route.navigate(['/administrator/users']);
          }, 1000);
          this.loading$.next(false);
        },
        error: (error) => {
          this.messageLocal.error(error);
          this.loading$.next(false);
        },
      });
  }

  isRequired(field: AbstractControl): boolean {
    return field.hasValidator(Validators.required);
  }

  get passwordField() {
    return this.formChangePasswordUser.controls['newPassword'];
  }

  get rePasswordField() {
    return this.formChangePasswordUser.controls['confirm_password'];
  }
}
