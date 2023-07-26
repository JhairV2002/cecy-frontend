import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '@services/core/administrator';

import { CustomValidators } from '@shared/validators/custom-validators';
import { MessageService } from '@services/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent {
  events: any[];
  formChangePassword = this.fb.group({
    currentPassword: ['', [Validators.required]],
    newPassword: ['', [Validators.required]],
    confirm_password: ['', [Validators.required]],
  });
  loading$ = new BehaviorSubject<boolean>(false);
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public messageService: MessageService
  ) {
    this.events = [
      {
        status: 'Ordered',
        date: '15/10/2020 10:30',
        icon: 'pi pi-shopping-cart',
        color: '#9C27B0',
        image: 'game-controller.jpg',
      },
      {
        status: 'Processing',
        date: '15/10/2020 14:00',
        icon: 'pi pi-cog',
        color: '#673AB7',
      },
      {
        status: 'Shipped',
        date: '15/10/2020 16:15',
        icon: 'pi pi-shopping-cart',
        color: '#FF9800',
      },
      {
        status: 'Delivered',
        date: '16/10/2020 10:00',
        icon: 'pi pi-check',
        color: '#607D8B',
      },
    ];

    this.formChangePassword.setValidators(
      CustomValidators.passwordMatch('newPassword', 'confirm_password')
    );
  }

  onSubmit() {
    if (this.formChangePassword.valid) {
      this.changePassword();
    } else {
      this.formChangePassword.markAllAsTouched();
    }
  }

  changePassword() {
    this.loading$.next(true);
    const { currentPassword, newPassword } = this.formChangePassword.value;
    this.userService.changePassword(currentPassword, newPassword).subscribe({
      next: (response: any) => {
        console.log(response);
        setTimeout(() => {
          this.formChangePassword.reset();
        }, 1000);
        this.messageService.successUser(response);
        this.loading$.next(false);
      },
      error: (error) => {
        this.messageService.error(error);
        this.loading$.next(false);
      },
    });
  }

  isRequired(field: AbstractControl): boolean {
    return field.hasValidator(Validators.required);
  }

  get currentPasswordField() {
    return this.formChangePassword.controls['currentPassword'];
  }

  get passwordField() {
    return this.formChangePassword.controls['newPassword'];
  }

  get rePasswordField() {
    return this.formChangePassword.controls['confirm_password'];
  }
}
