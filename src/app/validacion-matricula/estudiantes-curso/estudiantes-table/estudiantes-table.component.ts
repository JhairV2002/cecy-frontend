import { Component, Input } from '@angular/core';
import { Estudiante } from 'src/app/cursos/models';

@Component({
  selector: 'app-estudiantes-table',
  templateUrl: './estudiantes-table.component.html',
  styleUrls: ['./estudiantes-table.component.css'],
})
export class EstudiantesTableComponent {
  @Input() estudiantes!: Estudiante[] | null;
}
