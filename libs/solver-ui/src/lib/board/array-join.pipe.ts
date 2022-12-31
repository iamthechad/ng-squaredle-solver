import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mtArrayJoin',
  standalone: true,
})
export class ArrayJoinPipe implements PipeTransform {
  public transform(value: unknown[], separator = ', '): string {
    return value.join(separator);
  }
}
