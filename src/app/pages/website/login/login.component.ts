import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { EstudiantesService } from '@layout/estudiantes/estudiantes.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private estudianteService: EstudiantesService,
    private route: Router
  ) {}

  loginForm = this.fb.nonNullable.group({
    cedula: [''],
    clave: [''],
  });

  login() {
    this.estudianteService.authenticateEstudiante(this.loginForm.value);
    this.route.navigate(['/estudiante/cursos/home']);
  }
}
