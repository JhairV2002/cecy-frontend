import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

import { AuthStudentService } from '@services/auth';
import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { TokenService } from '@services/auth';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    cedula: ['', [Validators.required, Validators.maxLength(10)]],
    clave: ['', [Validators.required]],
  });
  user: SocialUser | undefined;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authStudentService: AuthStudentService,
    private route: Router,
    private messageService: MessageService,
    private authService: SocialAuthService,
    private tokenService: TokenService,
  ) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      if (user) {
        this.authStudentService.loginWithGoogle(user).subscribe({
          next: (data) => {
            const navigationExtras: NavigationExtras = {
              queryParams: {
                user: JSON.stringify(user),
              }
            }
            console.log('RES INIT', data);
            if (data.isNewStudent) {
              this.route.navigate(['/final-register'], navigationExtras);
            } else {
              this.tokenService.saveEstudianteTokenGoogle(data)
              this.route.navigate(['/estudiante']);
            }
          },
          error: (error) => {
            console.log(error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: error.error.message,
            })
          },
        })
      }
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.login();
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  login() {
    this.loading = true;
    const valuesForm = this.loginForm.value;
    console.log(valuesForm);
    this.authStudentService.login(this.loginForm.value).subscribe(
      {
        next: (data) => {
          console.log('EJECUTANDO', data);
          this.route.navigate(['/estudiante']);
          this.loading = false;

        },
        error: (error) => {
          this.loading = false;
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.error.message,
          })
        }
      }
    );
  }

  loginWithGoogle() {
    console.log('execute with login google');
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  isRequired(field: AbstractControl): boolean {
    return field.hasValidator(Validators.required);
  }

  get cedulaField() {
    return this.loginForm.controls['cedula'];
  }

  get contrasenaField() {
    return this.loginForm.controls['clave'];
  }
}
