import { Component } from '@angular/core';
import { CarrerasService } from '../assistant/services/carreras.service';
import { CursosService } from '../assistant/services/cursos.service';

@Component({
  selector: 'app-validacion-matricula',
  templateUrl: './validacion-matricula.component.html',
  styleUrls: ['./validacion-matricula.component.css'],
})
export class ValidacionMatriculaComponent {
  constructor(private carreraService: CarrerasService) {}

  carreras$ = this.carreraService.getAllCarreras();
}
