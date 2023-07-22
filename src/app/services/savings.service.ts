import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SavingsService {
  private savings: number = 0;

  addSavings(amount: number): void {
    // Add the amount to the current savings
    this.savings += amount;
  }

  subtractSavings(amount: number): void {
    // Subtract the amount from the current savings
    this.savings -= amount;
  }

  getSavedSavings(): number {
    // Return the current savings amount
    return this.savings;
  }

  canAfford(price: number): boolean {
    // Check if the current savings can afford the given price
    return this.savings >= price;
  }

  calculateAffordableAmount(price: number): number {
    if (price <= 0) {
      return 0;
    }
    return Math.floor(this.savings / price);
  }
}
