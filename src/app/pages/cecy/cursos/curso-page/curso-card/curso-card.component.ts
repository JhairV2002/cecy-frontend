import { Component, Input } from '@angular/core';
import { PlanificationCourse } from '@models/cecy';

@Component({
  selector: 'app-curso-card',
  templateUrl: './curso-card.component.html',
  styleUrls: ['./curso-card.component.css'],
})
export class CursoCardComponent {
  @Input() curso!: PlanificationCourse | null;
  @Input() butonText!: 'Ver Más' | 'Inscribirse';
}
