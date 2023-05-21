import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
})
export class EstudiantesComponent {
  estudiantes = [
    { nombre: 'Juan', nota: 85 },
    { nombre: 'María', nota: 92 },
    { nombre: 'Pedro', nota: 78 },
    // Agrega más estudiantes y notas según sea necesario
  ];

  editarNota(estudiante: any, nuevaNota: number) {
    estudiante.nota = nuevaNota;
  }
}