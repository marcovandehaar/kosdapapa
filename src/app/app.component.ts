// app.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Child } from './child/child.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  children: Child[] = [];
  selectedChild: Child | null = null;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<Child[]>('assets/children-data.json').subscribe(data => {
      this.children = data;
    });
  }

  toggleChildSection(child: Child) {
    this.selectedChild = this.selectedChild === child ? null : child;
  }
}