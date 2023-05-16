import { Pipe, PipeTransform } from '@angular/core';
import { Nota } from '../interfaces/notas';

@Pipe({
  name: 'tableListInput',
})
export class TableListInputPipe implements PipeTransform {
  transform(items: Nota[], searchText: string): Nota[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter((it: any) => {
      return it.estudiante?.nombres!.toLocaleLowerCase().includes(searchText);
    });
    
    return items.filter((it: any) => {
      return it.notas?.estado!.toLocaleLowerCase().includes(searchText);
    });
  }

}
