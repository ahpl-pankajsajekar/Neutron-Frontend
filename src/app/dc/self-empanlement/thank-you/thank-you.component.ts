// thank-you.component.ts

import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss']
})
export class ThankYouComponent {

  isVisible = true; // Define isVisible and set it to true initially

  @Output() closeThankYou = new EventEmitter<void>();

  onClose(): void {
      this.isVisible = false;
      this.closeThankYou.emit();
  }
}
