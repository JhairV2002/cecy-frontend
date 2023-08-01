import { Component } from '@angular/core';
import { CarrerasService } from '../services/carreras.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carreras',
  templateUrl: './carreras.component.html',
  styleUrls: ['./carreras.component.css'],
})
export class CarrerasComponent {
  constructor(
    private carreraService: CarrerasService,
    private router: Router,
  ) { }
  carreras$ = this.carreraService.getAllCarreras();
  loading$ = this.carreraService.loading;

  cursos$ = this.carreraService.getAllCursos();

  viewStudents(planification: any) {
    console.log(planification);
    this.router.navigate([
      `/cecy/assistant-cecy/matricula/career/${planification.careerId}/${planification.name}/course/${planification.id}`,
    ]);
  }
}
