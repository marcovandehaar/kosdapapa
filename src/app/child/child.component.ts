// child.component.ts
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Child } from './child.model';
import { LocalStorageService } from '../services/local-storage.service';
import { SavingsService } from '../services/savings.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ReferenceItem } from './reference-item';



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
export class ChildComponent implements OnChanges {

  @Input() childData?: Child;
  savings: number = 0;
  savingsPercentage: number = 0;
  previousSavings: number = 0;
  price: number = 0;
  canAfford: boolean = true;
  panelState = 'out';
  moneyPanelState = 'out';
  toyPanelState = 'out';
  toyPanelActive = false;
  moneyPanelActive = false;
  lastModifications: string[] = [];
  referenceItems: ReferenceItem[] = [];
  defaultProfileImage = 'https://www.icegif.com/wp-content/uploads/2022/10/icegif-1218.gif';


  constructor(private localStorageService: LocalStorageService, 
    private http: HttpClient) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['childData'] && changes['childData'].currentValue) {
      this.loadSavingsFromLocalStorage();
      this.updateSavingsPercentage();
      this.updateProgressBar();
      this.loadReferenceItems();
    }
  }

  checkAffordability(): void {
    this.canAfford = this.savings >= this.price;
    //console.log('canafford: ' + this.canAfford);
  }

  calculateAffordableAmount(price: number): number {
    if (price <= 0) {
      return 0;
    }
    //console.log("savings:" + this.savings);
    //console.log("price:" + price);
    return Math.floor(this.price / price);
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

  getProfileImage(): string {
    return this.childData?.profileImage || this.defaultProfileImage;
  }

  addMoney(amount: number): void {
    //console.log('adding amount: ' + amount);
    this.previousSavings = this.savings;
    this.savings += amount;
    this.updateLocalStorageSavings();
    if (this.lastModifications.length > 3) {
      this.lastModifications.pop();
    }
    this.showFeedback(`${this.formatAmount(this.previousSavings)} ${amount >= 0 ? '+' : '-'} ${this.formatAmount(Math.abs(amount))} = ${this.formatAmount(this.savings)}.`);
    this.updateProgressBar();
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
    //console.log('setting panelstate from: ' + this.panelState + ' to ...');
    this.panelState = this.panelState === 'in' ? 'out' : 'in';
    //console.log(this.panelState);
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
    //console.log('updating progress bar...');
    if (this.price > 0 && this.savings > 0) {
      this.savingsPercentage = (this.price / this.savings) * 100;
    } else {
      this.savingsPercentage = 0;
    }
    this.checkAffordability();
  }

  toggleMoneyPanel(): void {
    if (this.moneyPanelActive && !this.toyPanelActive) {
      this.moneyPanelState = this.moneyPanelState === 'in' ? 'out' : 'in';
    } else {
      this.moneyPanelActive = true;
      this.toyPanelActive = false;
      this.moneyPanelState = 'in';
      this.toyPanelState = 'out';
    }
  }
  
  toggleToyPanel(): void {
    if (this.toyPanelActive && !this.moneyPanelActive) {
      this.toyPanelState = this.toyPanelState === 'in' ? 'out' : 'in';
    } else {
      this.toyPanelActive = true;
      this.moneyPanelActive = false;
      this.toyPanelState = 'in';
      this.moneyPanelState = 'out';
    }
  }
  // Add this function to calculate the bills and coins needed for the price
  getBillsAndCoinsNeeded(): { value: number, count: number, image: string }[] {
    const billsAndCoins = [
      { value: 5000, count: 0, image: '../../assets/img/50_euro.png' },
      { value: 2000, count: 0, image: '../../assets/img/20_euro.png' },
      { value: 1000, count: 0, image: '../../assets/img/10_euro.png' },
      { value: 500, count: 0, image: '../../assets/img/5_euro.png' },
      { value: 200, count: 0, image: '../../assets/img/2_euro.png' },
      { value: 100, count: 0, image: '../../assets/img/1_euro.png' },
      { value: 50, count: 0, image: '../../assets/img/50_cent.png' },
      { value: 20, count: 0, image: '../../assets/img/20_cent.png' },
      { value: 10, count: 0, image: '../../assets/img/10_cent.png' },
      { value: 5, count: 0, image: '../../assets/img/5_cent.png' },
    ];
    
    let remainingAmount = parseFloat((this.price*100).toFixed(0)); //workaround binary float problems...
    console.log('getting bills and coind needed for price: ' + remainingAmount)
    for (const billCoin of billsAndCoins) {
      while (remainingAmount >= billCoin.value) {
        remainingAmount -= billCoin.value;
        billCoin.count++;
        console.log('we need ' + billCoin.count + ' of ' + billCoin.value)
      }
    }

    return billsAndCoins.filter(coin => coin.count > 0);   
  }

  loadReferenceItems(): void {
    this.http.get<ReferenceItem[]>('./assets/reference-items.json').subscribe(
      (data) => {
        this.referenceItems = data;
      },
      (error) => {
        console.error('Error loading reference items:', error);
      }
    );
  }
  
}
