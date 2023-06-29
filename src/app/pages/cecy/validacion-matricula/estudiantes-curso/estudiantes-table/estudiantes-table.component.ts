import { Component, Input } from '@angular/core';
import { Estudiante } from '@models/cecy';
import { Matricula } from '@models/cecy/estudiantes/carreras';

@Component({
  selector: 'app-estudiantes-table',
  templateUrl: './estudiantes-table.component.html',
  styleUrls: ['./estudiantes-table.component.css'],
})
export class EstudiantesTableComponent {
  @Input() estudiantes!: Matricula[] | null;
}
