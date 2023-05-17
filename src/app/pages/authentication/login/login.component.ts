import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { PrimeIcons } from 'primeng/api';
import { RoleModel } from '@models/core';
import { AuthHttpService, MessageService } from '@services/core';
import { UsersService, AuthService } from '@services/auth';
import { ProfileCustomerDTO } from '@models/authentication';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  formLogin = this.formBuilder.group({
    email: ['lav.ruiz@yavirac.edu.ec', [Validators.required, Validators.email]],
    password: ['123', [Validators.required]],
  });

  profile: any;
  valCheck: string[] = ['remember'];
  password!: string;
  primeIcons = PrimeIcons;
  progressBar: boolean = false;
  progressBarRequestPasswordReset: boolean = false;
  isLogged: boolean = false;
  role: FormControl = new FormControl(null);
  roles: RoleModel[] = [];
  listCusotumers: [] = [];

  constructor(
    private formBuilder: FormBuilder,
    private authHttpService: AuthHttpService,
    public messageService: MessageService,
    private router: Router,
    private userService: UsersService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  login() {
    this.progressBar = true;
    const userValue = this.formLogin.value;
    this.authService.loginAndGet(userValue).subscribe({
      next: (user) => {
        if (user) {
          this.profile = user[0];
          console.log(this.profile)
          this.redirect();
        }
      },
      error: (error) => {
        this.messageService.error(error);
        this.progressBar = false;
      },
    });
  }

  redirect() {
    console.log('redirect ', this.profile.role.name)
    switch (this.profile.role.name) {
      case 'admin':
        this.router.navigate(['/administrator']);
        break;
      case 'coordinator_career':
        this.router.navigate(['/cecy/coordinator-career']);
        break;
      case 'coordinator_cecy':
        this.router.navigate(['/cecy/coordinator-cecy']);
        break;
      case 'public_company':
        this.router.navigate(['/example']);
        break;
      case 'responsible_course':
        console.log('redirigiendo a /cecy/responsible-course')
        this.router.navigate(['/cecy/responsible-course']);
        break;
      case 'responsible_cecy':
        this.router.navigate(['/cecy/responsible-cecy/registrations']);
        break;
      case 'student':
        this.router.navigate(['/cecy/student/courses']);
        break;
      case 'instructor':
        this.router.navigate(['/cecy/instructor/courses']);
        break;
      case 'coordinator_cecy':
        this.router.navigate([
          '/cecy/coordinator-cecy/profile-instructor-courses',
        ]);
        break;
      default:
        this.router.navigate(['/common/not-found']);
    }
  }

  isRequired(field: AbstractControl): boolean {
    return field.hasValidator(Validators.required);
  }

  onSubmit() {
    if (this.formLogin.valid) {
      this.login();
    } else {
      this.formLogin.markAllAsTouched();
    }
  }

  requestPasswordReset() {
    this.router.navigate(['/send-recovery']);
  }

  redirectRegistration() {
    this.router.navigate(['/register']);
  }

  get emailField() {
    return this.formLogin.controls['email'];
  }

  get passwordField() {
    return this.formLogin.controls['password'];
  }
}
