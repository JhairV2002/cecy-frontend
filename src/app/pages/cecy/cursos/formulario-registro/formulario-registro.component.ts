import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CatalogueService } from '@services/cecy';
import { EstudiantesServiceService } from '../../validacion-matricula/services/estudiantes-service.service';
import { EstudiantesService } from '@services/estudiantes.service';

@Component({
  selector: 'app-formulario-registro',
  templateUrl: './formulario-registro.component.html',
  styleUrls: ['./formulario-registro.component.css'],
})
export class FormularioRegistroComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private catalogoService: CatalogueService,
    // private estudiantesService: EstudiantesServiceService
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
    detalleDiscapacidad: [''],
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
      this.formularioRegistro.controls.detalleDiscapacidad.disable();
      this.formularioRegistro.controls.detalleDiscapacidad.setValue('');
    } else {
      this.formularioRegistro.controls.detalleDiscapacidad.enable();
    }
  }

  ngOnInit(): void {
    this.formularioRegistro.controls.detalleDiscapacidad.disable();
  }

  onSubmit() {
    console.log(this.formularioRegistro.value);
    this.estudiantesService
      .registrarEstudiante(this.formularioRegistro.value)
      .subscribe((res) => console.log(res));
    // console.log(this.formularioRegistro.get('email'));
    // console.log(this.formularioRegistro.invalid);
  }
}
