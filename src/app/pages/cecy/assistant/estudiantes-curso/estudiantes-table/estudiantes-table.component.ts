import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Estudiante } from '@models/cecy';
import { Matricula } from '@models/cecy/estudiantes/carreras';

@Component({
  selector: 'app-estudiantes-table',
  templateUrl: './estudiantes-table.component.html',
  styleUrls: ['./estudiantes-table.component.css'],
})
export class EstudiantesTableComponent {
  @Input() estudiantes!: Matricula[] | null;
  @Input() loading!: boolean;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}
  viewDetailEstudent(estudiante: Estudiante) {
    console.log(estudiante);
    this.activatedRoute.paramMap.subscribe((param) => {
      console.log(param);
      this.router.navigate([
        `cecy/assistant-cecy/matricula/career/${param.get(
          'careerId'
        )}/${param.get('nombre-carrera')}/course/${param.get(
          'idCurso'
        )}/student/${estudiante.id}`,
      ]);
    });
  }
}
