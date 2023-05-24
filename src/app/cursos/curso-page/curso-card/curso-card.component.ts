import { Component, Input } from '@angular/core';
import { Curso } from '../../models';

@Component({
  selector: 'app-curso-card',
  templateUrl: './curso-card.component.html',
  styleUrls: ['./curso-card.component.css'],
})
export class CursoCardComponent {
  @Input() curso!: Curso | null;
  @Input() butonText!: 'Ver Más' | 'Inscribirse';
}
