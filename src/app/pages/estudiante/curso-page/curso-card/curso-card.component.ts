import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PlanificationCourse } from '@models/cecy';

@Component({
  selector: 'app-curso-card',
  templateUrl: './curso-card.component.html',
  styleUrls: ['./curso-card.component.css'],
})
export class CursoCardComponent {
  constructor(private router: Router) {}
  @Input() curso!: PlanificationCourse | null;
  @Input() butonText!: 'Ver Más' | 'Inscribirse' | 'Descargar Certificado';
  @Input() fn?: Function;

  redireccionar() {
    this.router.navigate(['/estudiante/formInscription', this.curso!.id]);
  }
}
