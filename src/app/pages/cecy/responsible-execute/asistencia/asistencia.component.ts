import { Component, OnInit } from '@angular/core';
import { AsistenciaService } from './asistencia.service';
import { Asistencia } from './asistencia.model';
import { map, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
})
export class AsistenciaComponent implements OnInit {
  constructor(
    private AsistenciaService: AsistenciaService,
    private router: ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.AsistenciaService.obtenerEstudiantes().subscribe(
      (res) => (this.estudiantes = res)
    );
  }

  estudiantes: Asistencia[] = [];
  asistencias$ = this.AsistenciaService.obtenerEstudiantes().pipe(
    map((res) => res.filter((it) => it.estudiantes != null))
  );
  asistencia$ = this.AsistenciaService.obtenerEstudiantePorId(4);

  asistencias: Asistencia[] | null = null;

  estudiantes$ = this.router.paramMap.pipe(
    switchMap((params) =>
      this.AsistenciaService.obtenerMatriculasPorId(
        Number(params.get('cursoId')!)
      ).pipe(map(res => res.filter(res => res.estudiantes != null)))
    )
  );
  /* ngOnInit() {
    this.asistencias$.subscribe((data) => {
      this.asistencias = data;
    });
  } */
}
