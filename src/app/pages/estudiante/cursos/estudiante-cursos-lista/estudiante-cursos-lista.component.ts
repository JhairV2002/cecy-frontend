import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EstudiantesService } from '@layout/estudiantes/estudiantes.service';
import { Estudiantes } from '@models/cecy';

@Component({
  selector: 'app-estudiante-cursos-lista',
  templateUrl: './estudiante-cursos-lista.component.html',
  styleUrls: ['./estudiante-cursos-lista.component.css'],
})
export class EstudianteCursosListaComponent implements OnInit {
  constructor(
    private estudiantesService: EstudiantesService,
    private route: ActivatedRoute
  ) { }

  estudiante!: Estudiantes;

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) =>
      this.estudiantesService
        .obtenerEstudiantePorId(Number(param.get('estudianteId')))
        .subscribe((res) => this.estudiante = res)
    );
  }
}
