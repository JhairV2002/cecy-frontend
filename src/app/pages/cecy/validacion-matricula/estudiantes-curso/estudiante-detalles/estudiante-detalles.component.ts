import { Component } from '@angular/core';
import { EstudiantesServiceService } from '../../services/estudiantes-service.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-estudiante-detalles',
  templateUrl: './estudiante-detalles.component.html',
  styleUrls: ['./estudiante-detalles.component.css'],
})
export class EstudianteDetallesComponent {
  constructor(
    private estudianteService: EstudiantesServiceService,
    private router: ActivatedRoute
  ) { }

  estudiante$ = this.router.paramMap.pipe(
    switchMap((params) =>
      this.estudianteService.getEstudianteById(
        Number(params.get('idEstudiante')!)
      )
    )
  )!;
}
