import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Matricula } from '@models/cecy/estudiantes/carreras';
import { CursosService } from '@services/cecy/cursos';
import { PlanificationCourse } from '@models/cecy';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-mis-cursos-details',
  templateUrl: './mis-cursos-details.component.html',
  styleUrls: ['./mis-cursos-details.component.css'],
})
export class MisCursosDetailsComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private cursosService: CursosService
  ) { }

  matricula!: Matricula;

  curso!: Observable<PlanificationCourse>;

  ngOnInit() {
    this.matricula = history.state;
    this.curso = this.cursosService
      .getCursoById(this.matricula.cursoId)
      .pipe(map((res) => res.planification));
  }
}
