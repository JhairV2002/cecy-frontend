import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EstudiantesService } from '@layout/estudiantes/estudiantes.service';
import { Catalogue, Estudiantes } from '@models/cecy';
import { CatalogueService } from '@services/cecy';

@Component({
  selector: 'app-estudiante-cursos-inscrito',
  templateUrl: './estudiante-cursos-inscrito.component.html',
  styleUrls: ['./estudiante-cursos-inscrito.component.css'],
})
export class EstudianteCursosInscritoComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private estudiantesService: EstudiantesService,
    private catalogoService: CatalogueService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) =>
      this.estudiantesService
        .obtenerEstudiantePorId(Number(param.get('estudianteId')))
        .subscribe((res) => (this.estudiante$ = res))
    );
    this.catalogoService
      .findByNombre('nivel_instruccion')
      .subscribe((res) => (this.nivelInstruccion = res));

    this.catalogoService
      .findByNombre('etnia')
      .subscribe((res) => (this.etnias = res));

    this.catalogoService
      .findByNombre('genero')
      .subscribe((res) => (this.generos = res));
  }

  estudiante$!: Estudiantes;

  nivelInstruccion: Catalogue[] = [];
  etnias: Catalogue[] = [];
  generos: Catalogue[] = [];

  guardar() {
    console.log(this.estudiante$);
  }
}
