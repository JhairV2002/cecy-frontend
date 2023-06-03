import { Pipe, PipeTransform } from '@angular/core';
import { Curso } from '@models/cecy';

@Pipe({
  name: 'filterFree',
})
export class FilterFreePipe implements PipeTransform {
  transform(items: Curso[], freeChecked: boolean) {
    if (!items) return [];

    if (!freeChecked) return items;

    return items.filter((it) => {
      return it.gratis === freeChecked;
    });
  }
}
