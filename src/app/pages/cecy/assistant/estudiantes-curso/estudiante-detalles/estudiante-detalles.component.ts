import { Component, OnInit } from '@angular/core';
import { EstudiantesServiceService } from '../../services/estudiantes-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap, tap } from 'rxjs';
import { Matricula } from '@models/cecy/estudiantes/carreras';
import { MessageService } from 'primeng/api';
import { MessageService as MessageLocal } from '@services/core';
import { AuthService } from '@services/auth';

@Component({
  selector: 'app-estudiante-detalles',
  templateUrl: './estudiante-detalles.component.html',
  styleUrls: ['./estudiante-detalles.component.css'],
})
export class EstudianteDetallesComponent implements OnInit {
  constructor(
    private estudianteService: EstudiantesServiceService,
    private router: ActivatedRoute,
    private route: Router,
    private messageService: MessageService,
    private messageLocal: MessageLocal,
    private authService: AuthService,
  ) { }

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
        .subscribe({
          next: (res) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Actualizado',
              detail: 'Se ha Matriculado el estudiante correctamente',
            });
            console.log(res);
            setTimeout(() => {
              this.goToBackListStudents();
            }, 1000);
          },
          error: (error) => {
            this.messageLocal.error(error);
          },
        });
    });
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

  goToBackListStudents() {
    this.authService.user$.subscribe((user: any) => {
      if (user !== null) {
        if (user[0].role.name === 'coordinator_cecy') {
          this.router.paramMap.subscribe((param) => {
            console.log(param);
            this.route.navigate([
              `cecy/coordinator-cecy/matricula/career/${param.get(
                'careerId'
              )}/${param.get('nombre-carrera')}/course/${param.get('idCurso')}`,
            ]);
          });
        } else if (user[0].role.name === 'assistant_cecy') {
          this.router.paramMap.subscribe((param) => {
            console.log(param);
            this.route.navigate([
              `cecy/assistant-cecy/matricula/career/${param.get(
                'careerId'
              )}/${param.get('nombre-carrera')}/course/${param.get('idCurso')}`,
            ]);
          });
        }
      }
    });


  }

  observaciones$: any = this.matricula$.pipe(map((res) => res.observaciones));
}
