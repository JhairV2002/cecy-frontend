import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Message } from 'primeng/api';

import { CatalogueService } from '@services/cecy';
import { EstudiantesService } from '@services/estudiantes.service';
import { MessageService as MessageServiceToast } from 'primeng/api'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private catalogoService: CatalogueService,
    private estudiantesService: EstudiantesService,
    private messageServiceToast: MessageServiceToast,
    private router: Router
  ) { }

  genero: any;

  formularioRegistro = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    clave: ['', [Validators.required]],
    confirmClave: ['', [Validators.required,]],
    cedula: ['', Validators.required],
    nombres: ['', Validators.required],
    apellidos: ['', Validators.required],
    fechaNacimiento: ['', Validators.required],
    discapacidad: [false],
    numeroCelular: ['', [Validators.required, Validators.maxLength(10)]],
    numeroConvencional: [''],
    detallesDiscapacidad: [''],
    direccion: ['', Validators.required],
    genero: ['', Validators.required],
    tipoEstudiante: [{ descripcion: 'Externo' }, Validators.required],
    etnia: ['', Validators.required],
    nivelInstruccion: ['', Validators.required],
    situacionEconomica: ['', Validators.required],
    rol: ['estudiante']
  });

  etnias$ = this.catalogoService.findByNombre('etnia');
  generos$ = this.catalogoService.findByNombre('genero');
  situacionEconomica$ = this.catalogoService.findByNombre(
    'situacion_economica'
  );
  nivelInstruccion$ = this.catalogoService.findByNombre('nivel_instruccion');
  messages: Message[] | undefined;
  disableDetalles() {
    if (!this.formularioRegistro.get('discapacidad')!.value) {
      this.formularioRegistro.controls.detallesDiscapacidad.disable();
      this.formularioRegistro.controls.detallesDiscapacidad.setValue('');
    } else {
      this.formularioRegistro.controls.detallesDiscapacidad.enable();
    }
  }

  ngOnInit(): void {
    this.formularioRegistro.controls.detallesDiscapacidad.disable();
    this.messages = [
      {
        severity: 'warn',
        summary: 'Atención',
        detail: `Estos datos serán usados para validar tu identidad al
            momento de emitir algún certificado por la finalización de algún
            curso. Asegurate que sean correctos antes de registrarte.
        `
      }];
  }

  registerStudent() {
    this.formularioRegistro.get('rol')?.setValue('estudiante')
    console.log('form student', this.formularioRegistro.value);
    this.estudiantesService
      .registrarEstudiante(this.formularioRegistro.value)
      .subscribe({
        next: (data) => {
          console.log(data)
          this.messageServiceToast.add({
            severity: 'success',
            summary: 'Registro Exitoso',
            detail: `Se ha registrado correctamente el estudiante ${data}`
          },
          );
          setTimeout(() => {
            this.router.navigate(['/login'])
          }, 1000)
        },
        error: (error) => {
          this.messageServiceToast.add(
            { severity: 'error', summary: 'Error', detail: `${error.message}` }
          )
        }
      });
  }

  onSubmit() {
    if (this.formularioRegistro.valid) {
      this.registerStudent();
    } else {
      this.formularioRegistro.markAllAsTouched();
    }
  }

  isRequired(field: AbstractControl): boolean {
    return field.hasValidator(Validators.required);
  }

  get emailField() {
    return this.formularioRegistro.controls['email'];
  }
  get claveField() {
    return this.formularioRegistro.controls['clave'];
  }

  get confirmClaveField() {
    return this.formularioRegistro.controls['confirmClave'];
  }

  get cedulaField() {
    return this.formularioRegistro.controls['cedula'];
  }

  get nombresField() {
    return this.formularioRegistro.controls['nombres'];
  }

  get apellidosField() {
    return this.formularioRegistro.controls['apellidos'];
  }

  get fechaNacimientoField() {
    return this.formularioRegistro.controls['fechaNacimiento'];
  }

  get generoField() {
    return this.formularioRegistro.controls['genero'];
  }

  get etniaField() {
    return this.formularioRegistro.controls['etnia'];
  }

  get nivelInstruccionField() {
    return this.formularioRegistro.controls['nivelInstruccion'];
  }

  get situacionEconomicaField() {
    return this.formularioRegistro.controls['situacionEconomica'];
  }

  get discapacidadField() {
    return this.formularioRegistro.controls['discapacidad'];
  }

  get detallesDiscapacidadField() {
    return this.formularioRegistro.controls['detallesDiscapacidad'];
  }

  get celularField() {
    return this.formularioRegistro.controls['numeroCelular'];
  }

  get numeroConvencionalField() {
    return this.formularioRegistro.controls['numeroConvencional'];
  }

  get direccionField() {
    return this.formularioRegistro.controls['direccion'];
  }

}
