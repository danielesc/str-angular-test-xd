import { isPlatformServer } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-landing',
  imports: [],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  value: number = 0;
  constructor(
    @Inject(PLATFORM_ID)
    private readonly platformId: Object,
  ) {
    if (isPlatformServer(this.platformId)) {
      this.value = this.generateRandom();
    }
  }

  generateRandom() {
    return Math.floor(Math.random() * 10);
  }
}
