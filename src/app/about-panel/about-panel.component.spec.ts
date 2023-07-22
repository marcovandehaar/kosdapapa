import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutPanelComponent } from './about-panel.component';

describe('AboutPanelComponent', () => {
  let component: AboutPanelComponent;
  let fixture: ComponentFixture<AboutPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
