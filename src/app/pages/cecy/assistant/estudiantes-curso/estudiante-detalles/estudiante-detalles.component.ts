import { Component, OnInit } from '@angular/core';
import { EstudiantesServiceService } from '../../services/estudiantes-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap, tap } from 'rxjs';
import { Matricula } from '@models/cecy/estudiantes/carreras';

@Component({
  selector: 'app-estudiante-detalles',
  templateUrl: './estudiante-detalles.component.html',
  styleUrls: ['./estudiante-detalles.component.css'],
})
export class EstudianteDetallesComponent implements OnInit {
  constructor(
    private estudianteService: EstudiantesServiceService,
    private router: ActivatedRoute,
    private route: Router
  ) {}

  matricula!: Matricula;
  search: string = '';

  ngOnInit(): void {
    this.router.paramMap.subscribe((res) => {
      this.estudianteService
        .getMatriculaById(parseInt(res.get('idEstudiante')!))
        .subscribe((res) => (this.matricula = res));
    });
  }

  observationForm = {
    descripcion: '',
    completado: false,
  };

  handleAgregarObservacion() {
    this.matricula.observaciones = [
      ...this.matricula.observaciones!,
      this.observationForm,
    ];
    console.log(this.matricula.observaciones);
    this.observationForm = { descripcion: '', completado: false };
  }

  updateMatricula() {
    if (this.matricula.observaciones!.find((it) => it.completado === false)) {
      this.matricula.estadoMatricula = {
        descripcion: 'Con observaciones',
      };
      console.log(this.matricula);
    } else {
      this.matricula.estadoMatricula = {
        descripcion: 'Matriculado',
      };
    }
    this.router.paramMap.subscribe((res) => {
      this.estudianteService
        .updateMatricula(parseInt(res.get('idEstudiante')!), this.matricula)
        .subscribe((res) => {
          console.log(res);
        });
    });
    this.route.navigate(['../']);
  }

  estudiante$ = this.router.paramMap.pipe(
    switchMap((params) =>
      this.estudianteService.getEstudianteById(
        Number(params.get('idEstudiante')!)
      )
    )
  )!;

  matricula$ = this.router.paramMap.pipe(
    switchMap((params) =>
      this.estudianteService.getMatriculaById(
        parseInt(params.get('idEstudiante')!)
      )
    )
  );

  observaciones$: any = this.matricula$.pipe(map((res) => res.observaciones));
}