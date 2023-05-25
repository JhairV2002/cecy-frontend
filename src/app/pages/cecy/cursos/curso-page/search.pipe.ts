import { Pipe, PipeTransform } from '@angular/core';
import { Curso } from '@models/cecy';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(items: Curso[] | null, searchText: string): any[] {
    if (!items) return [];

    if (!searchText) return items;

    searchText = searchText.toLowerCase();

    return items.filter((it) => {
      return it.nombre.toLowerCase().includes(searchText);
    });
  }
}
