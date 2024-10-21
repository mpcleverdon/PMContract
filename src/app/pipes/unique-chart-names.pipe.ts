import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uniqueChartNames'
})
export class UniqueChartNamesPipe implements PipeTransform {
  transform(value: any[]): any[] {
    if (!value) return [];
    return Array.from(new Set(value));
  }
}