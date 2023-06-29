import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { EstudiantesService } from '@layout/estudiantes/estudiantes.service';

@Component({
  selector: 'app-formulario-inicio-sesion',
  templateUrl: './formulario-inicio-sesion.component.html',
  styleUrls: ['./formulario-inicio-sesion.component.css'],
})
export class FormularioInicioSesionComponent {
  constructor(
    private fb: FormBuilder,
    private estudianteService: EstudiantesService,
    private route: Router
  ) { }

  loginForm = this.fb.nonNullable.group({
    cedula: [''],
    clave: [''],
  });

  login() {
    this.estudianteService.authenticateEstudiante(this.loginForm.value);
    this.route.navigate(['/estudiante/cursos/home']);
  }
}
