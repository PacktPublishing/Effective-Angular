import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'multiply',
  standalone: true,
})
export class MultiplyPipe implements PipeTransform {
  transform(value: number, multiplier = 2, additional = 1): number {
    return value * multiplier * additional;
  }
}
