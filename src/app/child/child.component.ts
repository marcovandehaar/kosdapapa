// child.component.ts
import { Component, Input,OnChanges, SimpleChanges  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Child } from './child.model';
import { LocalStorageService } from '../services/local-storage.service';
import { SavingsService } from '../services/savings.service';
import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        height: '*',
        overflow: 'hidden',
      })),
      state('out', style({
        height: '0',
        overflow: 'hidden',
      })),
      transition('in => out', animate('300ms ease-in')),
      transition('out => in', animate('300ms ease-out'))
    ])
  ]
})
export class ChildComponent implements OnChanges   {

  @Input() childData?: Child;
  savings: number = 0;
  price: number = 0;
  canAfford: boolean = true;
  panelState = 'out';

  constructor(private localStorageService: LocalStorageService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['childData'] && changes['childData'].currentValue) {
      this.loadSavingsFromLocalStorage();
    }
  }

  checkAffordability(): void {
    this.canAfford = this.savings >= this.price;
  }

  private loadSavingsFromLocalStorage(): void {
    if (this.childData && this.childData.name) {
      const savedSavings = this.localStorageService.get(this.childData.name + 'Savings');
      this.savings = savedSavings !== null ? parseFloat(savedSavings) : 0;
    }
  }

  togglePanel(): void {
    console.log('setting panelstate from: ' + this.panelState + ' to ...');
    this.panelState = this.panelState === 'in' ? 'out' : 'in';
    console.log(this.panelState);
  }

  
}
