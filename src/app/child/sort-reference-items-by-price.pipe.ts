import { Pipe, PipeTransform } from '@angular/core';
import { ReferenceItem } from './reference-item';

@Pipe({
  name: 'sortReferenceItemsByPrice',
})
export class SortReferenceItemsByPricePipe implements PipeTransform {
  transform(referenceItems: ReferenceItem[]): ReferenceItem[] {
    return referenceItems.sort((a, b) => a.price - b.price);
  }
}