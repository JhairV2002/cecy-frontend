import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { EstudiantesService } from '@layout/estudiantes/estudiantes.service';
import { CatalogueService } from '@services/cecy';

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
  ) { }

  estudianteForm!: FormGroup;

  etnias$ = this.catalogoService.findByNombre('etnia');
  generos$ = this.catalogoService.findByNombre('genero');
  situacionEconomica$ = this.catalogoService.findByNombre(
    'situacion_economica',
  );
  nivelInstruccion$ = this.catalogoService.findByNombre('nivel_instruccion');

  ngOnInit(): void {
    this.estudianteService.estudianteActual.subscribe((estudiante) => {
      console.log(estudiante);
      this.estudianteForm = this.fb.group({
        id: [estudiante!.id],
        cedula: [estudiante!.cedula],
        nombres: [estudiante!.nombres],
        apellidos: [estudiante!.apellidos],
        etnia: [estudiante!.etnia],
        genero: [estudiante!.genero],
        situacionEconomica: [estudiante!.situacionEconomica],
        nivelInstruccion: [estudiante!.nivelInstruccion],
        fechaNacimiento: [estudiante!.fechaNacimiento],
        email: [estudiante!.email],
        numeroCelular: [estudiante!.numeroCelular],
        numeroConvencional: [estudiante!.numeroConvencional],
        discapacidad: [estudiante!.discapacidad],
        detallesDiscapacidad: [estudiante!.detallesDiscapacidad],
        tipoEstudiante: [estudiante!.tipoEstudiante],
        matriculas: this.fb.array(estudiante?.matriculas!),
      });
      console.log(this.estudianteForm.value);
      if (this.estudianteForm.controls['discapacidad']!.value == false) {
        this.estudianteForm.controls['detallesDiscapacidad'].disable();
      }
    });
  }

  disableDetalles() {
    if (!this.estudianteForm.get('discapacidad')!.value) {
      this.estudianteForm.controls['detallesDiscapacidad'].disable();
      this.estudianteForm.controls['detallesDiscapacidad'].setValue('');
    } else {
      this.estudianteForm.controls['detallesDiscapacidad'].enable();
    }
    console.log(this.estudianteForm.value);
  }

  updateEstudiante() {
    console.log(this.estudianteForm.value);
    // this.estudianteService
    //   .updateEstudiante(this.estudianteForm.value)
    //   .subscribe((res) => {
    //     console.log(res);
    //   });
  }
}
