import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.scss'],
})
export class EstudiantesComponent {
  estudiantes: any[] = [
    { nombre: 'Juan', nota1: 80, nota2: 75 },
    { nombre: 'Johan', nota1: 90, nota2: 85 },
    { nombre: 'Carlos', nota1: 70, nota2: 60 },
    { nombre: 'Esteban', nota1: 70, nota2: 60 },
    { nombre: 'Gael', nota1: 70, nota2: 60 },
   /*  { nombre: 'Luis', nota1: 60, nota2: 60 },
    { nombre: 'Angel', nota1: 70, nota2: 60 }, */

  ];

  filtroNombre: string = '';


  calcularPromedio(estudiante: any): number {
    return (estudiante.nota1 + estudiante.nota2) / 2;
  }

  determinarEstado(estudiante: any): string {
    const promedio = this.calcularPromedio(estudiante);
    return promedio >= 70 ? 'Aprobado' : 'Reprobado';
  }
  guardarNota(estudiante: any) {
    // Aquí puedes implementar la lógica para guardar las notas editadas del estudiante
    console.log('Notas guardadas:', estudiante.nota1, estudiante.nota2);
  }
}