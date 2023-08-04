import { Pipe, PipeTransform } from '@angular/core';
import { Matriculas } from './estudiante.model';

@Pipe({
  name: 'nombreFilter',
})
export class NombreFilterPipe implements PipeTransform {
  transform(estudiantes: Matriculas[] | null, filterValue: string): any[] {
    if (!estudiantes) return [];

    const normalizedFilterValue = filterValue.toLowerCase().trim();

    return estudiantes.filter((estudiante) => {
      if (!estudiante.estudiantes) return false;

      const nombres = estudiante.estudiantes.nombres.toLowerCase();
      const cedula = estudiante.estudiantes.cedula.toLowerCase();

      return nombres.includes(normalizedFilterValue) || cedula.includes(normalizedFilterValue);
    });
  }
}
