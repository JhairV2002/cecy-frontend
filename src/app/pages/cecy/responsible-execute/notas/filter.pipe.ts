import { Pipe, PipeTransform } from '@angular/core';
import { Matriculas } from './estudiante.model';

@Pipe({
  name: 'nombreFilter'
})
export class NombreFilterPipe implements PipeTransform {
  transform(estudiantes: Matriculas[], nombre: string): any[] {
    if (!estudiantes || !nombre) {
      return estudiantes;
    }

    return estudiantes.filter(estudiante =>
      estudiante.estudiantes && estudiante.estudiantes.nombres.toLowerCase().includes(nombre.toLowerCase())
    );
  }
}