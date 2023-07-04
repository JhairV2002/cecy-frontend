import { Component } from '@angular/core';
import { CarrerasService } from '../services/carreras.service';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-cursos-carrera',
  templateUrl: './cursos-carrera.component.html',
  styleUrls: ['./cursos-carrera.component.css'],
})
export class CursosCarreraComponent {
  constructor(
    private route: ActivatedRoute,
    private cursosCarreraService: CarrerasService
  ) {}

  cursos$ = this.route.paramMap.pipe(
    switchMap((params) =>
      this.cursosCarreraService.getCursosByCarreraId(
        parseInt(params.get('id')!)
      )
    )
  );

  nombreCarrera$ = this.route.paramMap.pipe(
    map((param) => param.get('nombreCarrera')!)
  );
}
