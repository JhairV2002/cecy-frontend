import { Component, OnInit } from '@angular/core';
import { AbstractControl, Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstudiantesService } from '@layout/estudiantes/estudiantes.service';
import { Estudiantes } from '@models/cecy';
import { AuthStudentService } from '@services/auth';
import { CatalogueService } from '@services/cecy';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-perfil-estudiante',
  templateUrl: './perfil-estudiante.component.html',
  styleUrls: ['./perfil-estudiante.component.css'],
})
export class PerfilEstudianteComponent implements OnInit {
  constructor(
    private estudianteService: EstudiantesService,
    private fb: FormBuilder,
    private catalogoService: CatalogueService,
    private authStudentService: AuthStudentService,
    private messageService: MessageService

  ) { }
  student: Estudiantes | null = null;
  studentProfile = this.fb.group({
    id: [null],
    email: ['', [Validators.email]],
    clave: [''],
    confirmClave: [''],
    cedula: [''],
    nombres: [''],
    apellidos: [''],
    fechaNacimiento: [''],
    discapacidad: [false],
    numeroCelular: [''],
    numeroConvencional: [''],
    detallesDiscapacidad: [''],
    direccion: [''],
    genero: [''],
    tipoEstudiante: [{ descripcion: 'Externo' }, Validators.required],
    etnia: [''],
    nivelInstruccion: [''],
    situacionEconomica: [''],
    rol: ['']
  });

  etnias$ = this.catalogoService.findByNombre('etnia');
  generos$ = this.catalogoService.findByNombre('genero');
  situacionEconomica$ = this.catalogoService.findByNombre(
    'situacion_economica',
  );
  nivelInstruccion$ = this.catalogoService.findByNombre('nivel_instruccion');

  ngOnInit(): void {
    this.authStudentService.student$.subscribe({
      next: (student: any) => {
        console.log('STUDIANTE', student);
        if (student !== null) {
          this.student = student;
          const rawFechaNacimiento = student.fechaNacimiento;
          const fechaNacimiento = new Date(rawFechaNacimiento);
          const formattedFechaNacimiento = fechaNacimiento.toISOString().split('T')[0];
          this.studentProfile.patchValue({
            ...student,
            fechaNacimiento: formattedFechaNacimiento
          });
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  onSubmit() {
    if (this.studentProfile.valid) {
      console.log('Send')
      this.updateEstudiante();
    } else {
      console.log('error onsubmit')
      this.studentProfile.markAllAsTouched();
    }
  }

  disableDetalles() {
    if (!this.studentProfile.get('discapacidad')!.value) {
      this.studentProfile.controls.detallesDiscapacidad.disable();
      this.studentProfile.controls.detallesDiscapacidad.setValue('');
    } else {
      this.studentProfile.controls.detallesDiscapacidad.enable();
    }
  }

  updateEstudiante() {
    console.log('Update profile')
    console.log(this.studentProfile.value);
    this.estudianteService
      .updateEstudiante(this.studentProfile.value)
      .subscribe({
        next: (student) => {
          console.log('SUCCES RESPONSE', student);
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Estudiante actualizado correctamente'
          })
        },
        error: (error) => {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al actualizar el estudiante'
          })
        }
      });
  }

  isRequired(field: AbstractControl): boolean {
    return field.hasValidator(Validators.required);
  }

  get emailField() {
    return this.studentProfile.controls['email'];
  }
  get claveField() {
    return this.studentProfile.controls['clave'];
  }

  get confirmClaveField() {
    return this.studentProfile.controls['confirmClave'];
  }

  get cedulaField() {
    return this.studentProfile.controls['cedula'];
  }

  get nombresField() {
    return this.studentProfile.controls['nombres'];
  }

  get apellidosField() {
    return this.studentProfile.controls['apellidos'];
  }

  get fechaNacimientoField() {
    return this.studentProfile.controls['fechaNacimiento'];
  }

  get generoField() {
    return this.studentProfile.controls['genero'];
  }

  get etniaField() {
    return this.studentProfile.controls['etnia'];
  }

  get nivelInstruccionField() {
    return this.studentProfile.controls['nivelInstruccion'];
  }

  get situacionEconomicaField() {
    return this.studentProfile.controls['situacionEconomica'];
  }

  get discapacidadField() {
    return this.studentProfile.controls['discapacidad'];
  }

  get detallesDiscapacidadField() {
    return this.studentProfile.controls['detallesDiscapacidad'];
  }

  get celularField() {
    return this.studentProfile.controls['numeroCelular'];
  }

  get numeroConvencionalField() {
    return this.studentProfile.controls['numeroConvencional'];
  }

  get direccionField() {
    return this.studentProfile.controls['direccion'];
  }

}
