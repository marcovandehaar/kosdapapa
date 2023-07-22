import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import tinycolor from 'tinycolor2';

@Component({
  selector: 'app-about-panel',
  templateUrl: './about-panel.component.html',
  styleUrls: ['./about-panel.component.scss'],
})
export class AboutPanelComponent implements OnChanges {
  // ...
  showAboveButton = false; // Add this property

  // ...

  ngOnChanges(changes: SimpleChanges) {
    if (changes['backgroundColor']) {
      this.showAboveButton = this.isBrightColor(changes['backgroundColor'].currentValue);
    }
  }

  // ...

  // Method to check if the background color is bright
  private isBrightColor(backgroundColor: string | undefined): boolean {
    if (!backgroundColor) {
      return false;
    }

    const color = tinycolor(backgroundColor);
    return color.getBrightness() > 150; // Adjust the brightness threshold as needed
  }
}
