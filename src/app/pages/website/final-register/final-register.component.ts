import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Estudiantes } from '@models/cecy/estudiantes/carreras';
import { AuthStudentService } from '@services/auth';
import { MessageService } from '@services/core';

@Component({
  selector: 'app-final-register',
  templateUrl: './final-register.component.html',
  styleUrls: ['./final-register.component.css']
})
export class FinalRegisterComponent implements OnInit {

  finalRegisterForm = this.fb.group({
    cedula: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
    password: ['', Validators.required],
    confirmPassword: ['', [Validators.required,]]
  }, {
    validators: this.validatePassword.bind(this)
  });
  user?: Estudiantes

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private authStudentService: AuthStudentService,
    private messageService: MessageService,
    private route: Router,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const data = JSON.parse(params['user']);
      console.log('Received data:', data);
      this.user = data
    })
  }

  validatePassword(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (password?.value !== confirmPassword?.value) {
      return { passwordMismatch: true };
    }
    return null;
  }


  onSubmit() {
    if (this.finalRegisterForm.valid) {
      this.loginAndRegisterFinal();
    } else {
      this.finalRegisterForm.markAllAsTouched();
    }
  }

  loginAndRegisterFinal() {
    const user = {
      ...this.user,
      cedula: this.finalRegisterForm.get('cedula')?.value,
      clave: this.finalRegisterForm.get('password')?.value
    }
    console.log(user);
    this.authStudentService.registerWithGoogle(user).subscribe({
      next: (data) => {
        console.log('RES INIT', data);
        this.route.navigate(['/estudiante']);
      },
      error: (error) => {
        console.log(error);
        this.messageService.error(error)
      },
    })
  };

  isRequired(field: AbstractControl): boolean {
    return field.hasValidator(Validators.required);
  }


  get cedulaField() {
    return this.finalRegisterForm.controls['cedula'];
  }

  get contrasenaField() {
    return this.finalRegisterForm.controls['password'];
  }

  get confirmPasswordField() {
    return this.finalRegisterForm.controls['confirmPassword'];
  }
}
