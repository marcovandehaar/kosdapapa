import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChildComponent } from './child.component';
import { SortReferenceItemsByPricePipe } from './sort-reference-items-by-price.pipe';

@NgModule({
  declarations: [ChildComponent, SortReferenceItemsByPricePipe],
  imports: [CommonModule, FormsModule],
  exports: [ChildComponent],
})
export class ChildModule {}
