import { Component, OnInit } from '@angular/core';
import { AsistenciaService } from './asistencia.service';
import { Asistencia, DetalleAsistencia } from './asistencia.model';
import { map, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Matricula } from '@models/cecy/estudiantes/carreras';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
})
export class AsistenciaComponent implements OnInit {
  constructor(
    private AsistenciaService: AsistenciaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param) => {
      if (param.get('asistenciaId')) {
        this.AsistenciaService.obtenerAsistenciaPorId(
          parseInt(param.get('asistenciaId')!)
        ).subscribe((res) => (this.asistenciaForm = res));
      }
    });
  }

  estudiantes: Asistencia[] = [];

  observacionesForm = {
    descripcion: '',
    completado: false,
  };

  asistencias: Asistencia[] | null = null;
  asistenciaForm: Asistencia = {
    id: 0,
    periodo: '2024',
    cursoId: 0,
    evidenciaFotografica: '',
    duracionClase: '',
    fecha: '',
    detalleAsistencia: [
      {
        estado: {
          descripcion: 'Presente',
        },
        matriculas: [],
      },
      {
        estado: {
          descripcion: 'Ausente',
        },
        matriculas: [],
      },

      {
        estado: {
          descripcion: 'Falta Justificada',
        },
        matriculas: [],
      },
    ],
    observaciones: [],
  };
  // cambio de estado del estudiante
  cambioEstado(estadoAsis: string, estudiante: Matricula) {
    console.log(this.asistenciaForm);
    this.asistenciaForm.detalleAsistencia.forEach((it) => {
      if (
        it.estado.descripcion === estadoAsis &&
        !it.matriculas.includes(estudiante)
      ) {
        it.matriculas.push(estudiante);
        return;
      }

      if (
        it.estado.descripcion === estadoAsis &&
        it.matriculas.includes(estudiante)
      )
        return;
      it.matriculas = it.matriculas.filter((it) => it.id != estudiante.id);
    });

    console.log(this.asistenciaForm.detalleAsistencia);
    return;
  }

  estudiantes$ = this.activatedRoute.paramMap.pipe(
    switchMap((params) =>
      this.AsistenciaService.obtenerMatriculasPorId(
        Number(params.get('cursoId')!)
      )
    )
  );

  redireccionar() {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.router.navigate([
        `cecy/responsible-execute/fecha/${param.get('cursoId')}`,
      ]);
    });
  }

  guardar() {
    this.activatedRoute.paramMap.subscribe((param) => {
      if (param.get('cursoId')) {
        // this.asistenciaForm.detalleAsistencia = this.detalleAsistencias;
        this.asistenciaForm.cursoId = parseInt(param.get('cursoId')!);
        this.AsistenciaService.guardarAsistencia(this.asistenciaForm).subscribe(
          (res) => console.log(res)
        );
        return;
      }
      if (param.get('asistenciaId')) {
        this.AsistenciaService.actualizarAsistencia(
          parseInt(param.get('asistenciaId')!),
          this.asistenciaForm
        ).subscribe((res) => console.log(res));
      }
    });
    // console.log(JSON.stringify(this.asistenciaForm))
  }

  agregarObservacion() {
    this.asistenciaForm.observaciones.push(this.observacionesForm);
    this.observacionesForm = {
      descripcion: '',
      completado: false,
    };
  }
}
