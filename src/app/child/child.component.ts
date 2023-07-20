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
  savingsPercentage: number = 0;
  previousSavings: number = 0;
  price: number = 0;
  canAfford: boolean = true;
  panelState = 'out';
  lastModifications: string[] = [];

  constructor(private localStorageService: LocalStorageService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['childData'] && changes['childData'].currentValue) {
      this.loadSavingsFromLocalStorage();
      this.updateSavingsPercentage(); 
      this.updateProgressBar();
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

  private updateSavingsPercentage(): void {
    // Calculate the percentage of the price related to the total savings amount
    if (this.price > 0 && this.savings > 0) {
      this.savingsPercentage = (this.price / this.savings) * 100;
    } else {
      this.savingsPercentage = 0;
    }
  }

  addMoney(amount: number): void {
    console.log('adding amount: ' + amount);
    this.previousSavings = this.savings;
    this.savings += amount;
    this.updateLocalStorageSavings();
    if (this.lastModifications.length > 3) {
      this.lastModifications.pop();
    }
    this.showFeedback(`${this.formatAmount(this.previousSavings)} ${amount >= 0 ? '+' : '-'} ${this.formatAmount(Math.abs(amount))} = ${this.formatAmount(this.savings)}.`);
  }
  

  showFeedback(modificationSum: string): void {
    this.lastModifications.unshift(modificationSum);
    if (this.lastModifications.length > 3) {
      this.lastModifications.pop();
    }
  }

  private updateLocalStorageSavings(): void {
    if (this.childData && this.childData.name) {
      this.localStorageService.save(this.childData.name + 'Savings', this.savings.toFixed(2));
    }
  }

  togglePanel(): void {
    console.log('setting panelstate from: ' + this.panelState + ' to ...');
    this.panelState = this.panelState === 'in' ? 'out' : 'in';
    console.log(this.panelState);
  }

  formatAmount(value: number): string {
    const userLocale = navigator.language;
    return new Intl.NumberFormat(userLocale, {
      style: 'currency',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      currency: 'EUR',
    }).format(value);
  }

  updateProgressBar(): void {
    if (this.price > 0 && this.savings > 0) {
      this.savingsPercentage = (this.price / this.savings) * 100;
    } else {
      this.savingsPercentage = 0;
    }
  }

  
}
