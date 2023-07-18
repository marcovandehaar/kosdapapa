// child.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Child } from './child.model';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit {
  children: Child[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<Child[]>('assets/children-data.json').subscribe(data => {
      this.children = data;
    });
  }
}
