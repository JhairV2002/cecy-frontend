import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService, MessageService } from '@services/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomValidators } from '@shared/validators/custom-validators';
import { RecoveryPasswordService } from '@services/auth';

@Component({
  selector: 'app-password-reset',
  templateUrl: './recovery-password.component.html',
})
export class RecoveryPasswordComponent implements OnInit {
  formReset = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });
  form: FormGroup;
  progressBar: boolean = false;
  sendEmail: boolean = false;
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    public messageService: MessageService,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private recoveryPasswordService: RecoveryPasswordService
  ) {
    this.form = this.newForm();
  }

  ngOnInit(): void {
    this.form.patchValue({
      username: this.activatedRoute.snapshot.queryParams['username'],
      token: this.activatedRoute.snapshot.queryParams['token'],
    });
  }

  recoverPassword() {
    this.loading = true;
    const userEmailValue = this.formReset.value;
    this.recoveryPasswordService.recoveryPassword(userEmailValue).subscribe({
      next: () => {
        this.formReset.reset();
        this.sendEmail = true;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.messageService.error(error);
      },
    });
  }

  newForm(): FormGroup {
    return this.formBuilder.group(
      {
        username: [{ value: null, disabled: true }, [Validators.required]],
        token: [null, [Validators.required]],
        password: [null, [Validators.required, Validators.minLength(8)]],
        passwordConfirmation: [null, [Validators.required]],
      },
      { validators: CustomValidators.passwordMatchValidator }
    );
  }

  onSubmit() {
    if (this.formReset.valid) {
      this.recoverPassword();
    } else {
      this.form.markAllAsTouched();
    }
  }

  isRequired(field: AbstractControl): boolean {
    return field.hasValidator(Validators.required);
  }

  redirect() {
    this.router.navigate(['/authentication/login']);
  }

  get emailField() {
    return this.formReset.controls['email'];
  }

  // get passwordField() {
  //   return this.formReset.controls['password'];
  // }

  // get passwordConfirmationField() {
  //   return this.formReset.controls['passwordConfirmation'];
  // }
}
