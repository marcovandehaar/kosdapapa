// child.component.ts
import { Component, Input,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Child } from './child.model';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit {

  @Input() childData: any;
  savings: number = 0;
  price: number = 0;
  canAfford: boolean = true;

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    // Load the savings amount from local storage
    const savedSavings = this.localStorageService.get(this.childData.name + 'Savings');
    this.savings = savedSavings !== null ? parseFloat(savedSavings) : 0;
  }

  checkAffordability(): void {
    this.canAfford = this.savings >= this.price;
  }
}
