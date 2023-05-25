import { Component } from '@angular/core';
import { CarrerasService } from './services/carreras.service';
import { CursosService } from './services/cursos.service';

@Component({
  selector: 'app-validacion-matricula',
  templateUrl: './validacion-matricula.component.html',
  styleUrls: ['./validacion-matricula.component.css'],
})
export class ValidacionMatriculaComponent {
  constructor(private carreraService: CarrerasService) {}

  carreras$ = this.carreraService.getAllCarreras();
}
