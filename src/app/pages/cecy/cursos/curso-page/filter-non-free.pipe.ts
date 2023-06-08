import { Pipe, PipeTransform } from '@angular/core';
import { Curso } from '@models/cecy';

@Pipe({
  name: 'filterNonFree',
})
export class FilterNonFreePipe implements PipeTransform {
  transform(items: Curso[], nonFreeChecked: boolean) {
    if (!items) return [];

    if (!nonFreeChecked) return items;

    return items.filter((it) => {
      return it.gratis === !nonFreeChecked;
    });
  }
}
