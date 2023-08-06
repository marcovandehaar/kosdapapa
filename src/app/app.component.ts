// app.component.ts
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Child } from './child/child.model';
import { ChildComponent } from './child/child.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  children: Child[] = [];
  selectedChild: Child | null = null;
  showAboutPanel = false;
  @ViewChild('aboutButton', { static: false, read: ElementRef })
  aboutButtonRef!: ElementRef;
  aboutPanelTop: string | undefined;
  aboutPanelLeft: string | undefined;
  @ViewChild(ChildComponent, { static: false })
  private childComponent!: ChildComponent;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<Child[]>('assets/children-data.json').subscribe(data => {
      this.children = data;
    });
  }

  

  toggleChildSection(child: Child) {
    if (this.selectedChild === child) {
      this.selectedChild = null;
    } else {
      this.selectedChild = child;
      this.childComponent.clearFeedback();
    }
  }

  toggleAboutPanel() {
    this.showAboutPanel = !this.showAboutPanel;
  
    if (this.showAboutPanel) {
      // Calculate the position of the about button
      const aboutButtonRect = this.aboutButtonRef.nativeElement.getBoundingClientRect();
  
      // Set the position of the about-panel
      this.aboutPanelLeft = aboutButtonRect.left + 'px';
      this.aboutPanelTop = aboutButtonRect.top - 10 + 'px'; // You can adjust the value here to control the vertical position
    }
  }
}