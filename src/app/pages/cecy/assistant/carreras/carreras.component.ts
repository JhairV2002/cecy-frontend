import { Component } from '@angular/core';
import { CarrerasService } from '../services/carreras.service';

@Component({
  selector: 'app-carreras',
  templateUrl: './carreras.component.html',
  styleUrls: ['./carreras.component.css'],
})
export class CarrerasComponent {
  constructor(private carreraService: CarrerasService) {}
  carreras$ = this.carreraService.getAllCarreras();
  loading$ = this.carreraService.loading;
}
