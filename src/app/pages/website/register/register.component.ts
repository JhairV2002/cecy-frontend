import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CatalogueService } from '@services/cecy';
import { EstudiantesService } from '@services/estudiantes.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private catalogoService: CatalogueService,
    private estudiantesService: EstudiantesService
  ) {}

  formularioRegistro = this.fb.group({
    nombres: ['', Validators.required],
    apellidos: ['', Validators.required],
    cedula: ['', Validators.required],
    clave: [''],
    fechaNacimiento: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    discapacidad: [false],
    numeroCelular: ['', Validators.required],
    numeroConvencional: ['', Validators.required],
    detallesDiscapacidad: [''],
    direccion: ['', Validators.required],
    genero: ['', Validators.required],
    tipoEstudiante: [{ descripcion: 'Externo' }, Validators.required],
    etnia: ['', Validators.required],
    nivelInstruccion: ['', Validators.required],
    situacionEconomica: ['', Validators.required],
  });

  etnias$ = this.catalogoService.findByNombre('etnia');
  generos$ = this.catalogoService.findByNombre('genero');
  situacionEconomica$ = this.catalogoService.findByNombre(
    'situacion_economica'
  );
  nivelInstruccion$ = this.catalogoService.findByNombre('nivel_instruccion');

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
  }

  onSubmit() {
    console.log(this.formularioRegistro.value);
    this.estudiantesService
      .registrarEstudiante(this.formularioRegistro.value)
      .subscribe((res) => console.log(res));
  }
}
