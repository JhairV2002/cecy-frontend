import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthStudentService } from '@services/auth';
import { MessageService } from '@services/core';
import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
} from '@abacritt/angularx-social-login';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {


  isLoggedin?: boolean;
  loginForm = this.fb.group({
    cedula: ['', [Validators.required, Validators.maxLength(10)]],
    clave: ['', [Validators.required]],
  });

  user: SocialUser | undefined;

  constructor(
    private fb: FormBuilder,
    private authStudentService: AuthStudentService,
    private route: Router,
    private messageService: MessageService,
    private authService: SocialAuthService
  ) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      if (user) {

        console.log('User authenticated:', user);
        this.authStudentService.loginWithGoogle(user).subscribe({
          next: (data) => {
            console.log('RES INIT', data);
          },
          error: (error) => {
            console.log(error);
            this.messageService.error(error)
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
    const valuesForm = this.loginForm.value;
    console.log(valuesForm);
    this.authStudentService.login(this.loginForm.value).subscribe(
      {
        next: (data) => {
          console.log('EJECUTANDO', data);
          this.route.navigate(['/estudiante/cursos']);
        },
        error: (error) => {
          console.log(error);
          this.messageService.error(error)
        }
      }
    );
  }

  loginWithGoogle() {
    console.log('execute with login google');
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);

    // .subscribe(
    //   {
    //     next: (data: any) => {
    //       console.log('WITH GOOGLE', data)
    //       window.location.href = data.url;
    //     },
    //     error: (error) => {
    //       console.log(error);
    //       this.messageService.error(error)
    //     }
    //   }
    // )
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
