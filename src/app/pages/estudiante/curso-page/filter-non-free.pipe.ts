import { Pipe, PipeTransform } from '@angular/core';
import { Curso, PlanificationCourse } from '@models/cecy';

@Pipe({
  name: 'filterNonFree',
})
export class FilterNonFreePipe implements PipeTransform {
  transform(items: PlanificationCourse[], nonFreeChecked: boolean) {
    if (!items) return [];

    if (!nonFreeChecked) return items;

    return items.filter((it) => {
      return it.free === !nonFreeChecked;
    });
  }
}
