import { Component, Input } from '@angular/core';
import { Curso } from 'src/app/cursos/models';

@Component({
  selector: 'app-curso-banner',
  templateUrl: './curso-banner.component.html',
  styleUrls: ['./curso-banner.component.css'],
})
export class CursoBannerComponent {
  @Input() curso!: Curso | null;
}
