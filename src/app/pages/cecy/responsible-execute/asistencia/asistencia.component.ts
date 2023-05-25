import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.css']
})
export class AsistenciaComponent {
  constructor(
    private router: Router
  ) {
  }


  listadofecha(){
    this.router.navigate([
      '/cecy/responsible-execute/listado-fecha/'
    ]);
  }

  registrofotografico(){
    this.router.navigate([
      '/cecy/responsible-execute/registro-fotografico/'
    ]);
  }
}
