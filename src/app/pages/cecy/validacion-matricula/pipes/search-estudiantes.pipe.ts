import { Pipe, PipeTransform } from '@angular/core';
import { Matricula } from '@models/cecy/estudiantes/carreras';

@Pipe({
  name: 'searchEstudiantes',
})
export class SearchEstudiantesPipe implements PipeTransform {
  transform(matriculas: Matricula[], term: string): Matricula[] {
    if (!matriculas) return [];

    if (!term) return matriculas;

    term = term.toLowerCase();

    return matriculas.filter((matricula) => {
      return (
        matricula.estudiantes!.nombres.toLowerCase().includes(term) ||
        matricula.estudiantes!.apellidos.toLowerCase().includes(term) ||
        matricula.estudiantes!.cedula.includes(term)
      );
    });
  }
}
