import { Pipe, PipeTransform } from '@angular/core';
import { Curso, PlanificationCourse } from '@models/cecy';

@Pipe({
  name: 'filterFree',
})
export class FilterFreePipe implements PipeTransform {
  transform(items: PlanificationCourse[], freeChecked: boolean) {
    if (!items) return [];

    if (!freeChecked) return items;

    return items.filter((it) => {
      return it.free === freeChecked;
    });
  }
}
