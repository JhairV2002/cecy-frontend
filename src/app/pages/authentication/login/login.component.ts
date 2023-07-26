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
import { MessageService } from '@services/core';
import { UsersService, AuthService } from '@services/auth';
import { User } from '@models/authentication';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  formLogin = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
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
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    public messageService: MessageService,
    private router: Router,
    private userService: UsersService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.formLogin.valid) {
      this.login();
      console.log('login true');
    } else {
      this.formLogin.markAllAsTouched();
      console.log('else if');
    }
  }

  login() {
    this.loading = true;
    const userValue = this.formLogin.value;
    this.authService.loginAndGet(userValue).subscribe({
      next: (user) => {
        if (user) {
          this.profile = user[0];
          console.log(this.profile);
          this.redirect();
          this.loading = false;
        }
      },
      error: (error) => {
        this.loading = false;
        this.messageService.error(error);
      },
    });
  }

  redirect() {
    console.log('redirect ', this.profile.role.name);
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
      case 'assistant_cecy':
        this.router.navigate(['/cecy/assistant-cecy']);
        break;
      case 'instructor_execute':
        this.router.navigate(['/cecy/responsible-execute']);
        break;
      case 'responsible_course':
        this.router.navigate(['/cecy/responsible-course']);
        break;
      case 'student':
        this.router.navigate(['/cecy/student/courses']);
        break;
      default:
        this.router.navigate(['/common/not-found']);
    }
  }

  isRequired(field: AbstractControl): boolean {
    return field.hasValidator(Validators.required);
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
