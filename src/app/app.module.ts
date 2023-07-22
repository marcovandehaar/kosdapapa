import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChildModule } from './child/child.module'; // Import the ChildModule
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AboutPanelComponent } from './about-panel/about-panel.component'; // Import the BrowserAnimationsModule


@NgModule({
  declarations: [
    AppComponent,
    AboutPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ChildModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
