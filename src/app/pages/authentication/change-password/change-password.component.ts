import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CustomValidators } from '@shared/validators/custom-validators';
import { RecoveryPasswordService } from '@services/auth';
import { MessageService } from '@services/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  formChangePassword = this.fb.group({
    token: ['', [Validators.required]],
    newPassword: ['', [Validators.required]],
    confirm_password: ['', [Validators.required]],
  });
  progressBar: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public messageService: MessageService
  ) {
    this.formChangePassword.setValidators(
      CustomValidators.passwordMatch('newPassword', 'confirm_password')
    );
  }
  ngOnInit(): void {
    this.getToken();
  }

  getToken() {
    this.route.queryParams
      .subscribe
      //(params: RecoveryTokenParams)
      //=> {
      //this.token = params.token;
      //}
      ();
  }

  resetPassword() {
    // this.progressBar = true;
    // const { token, newPassword } = this.formChangePassword.value;
    // this.recoveryPasswordService
    //   .changePassword({
    //     //token,
    //     newPassword,
    //   })
    //   .subscribe({
    //     next: (response) => {
    //       this.messageService.successRecovery(response);
    //     },
    //     complete: () => {
    //       this.formChangePassword.reset();
    //       this.progressBar = false;
    //       this.router.navigate(['/login']);
    //     },
    //     error: (error) => {
    //       this.messageService.error(error);
    //       this.progressBar = false;
    //     },
    //   });
  }

  onSubmit() {
    if (this.formChangePassword.valid) {
      this.resetPassword();
    } else {
      this.formChangePassword.markAllAsTouched();
    }
  }

  isRequired(field: AbstractControl): boolean {
    return field.hasValidator(Validators.required);
  }

  get passwordField() {
    return this.formChangePassword.controls['newPassword'];
  }

  get rePasswordField() {
    return this.formChangePassword.controls['confirm_password'];
  }

  get Token(): any {
    return this.formChangePassword.get('token');
  }

  set token(value: string) {
    this.formChangePassword.patchValue({
      token: value,
    });
  }
}
