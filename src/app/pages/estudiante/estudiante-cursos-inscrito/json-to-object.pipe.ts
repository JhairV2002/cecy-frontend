import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jsonToObject',
})
export class JsonToObjectPipe implements PipeTransform {
  transform(json: string): unknown {
    return JSON.parse(json);
  }
}
