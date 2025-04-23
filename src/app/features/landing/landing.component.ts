import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { afterNextRender, Component, Inject, makeStateKey, PLATFORM_ID, TransferState } from '@angular/core';

const RANDOM_VALUE_KEY = makeStateKey<number>('randomValue');

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
    private transferState: TransferState,
  ) {
    if (isPlatformServer(this.platformId)) {
      this.value = this.generateRandom();
      this.transferState.set(RANDOM_VALUE_KEY, this.value);
    } else if (isPlatformBrowser(this.platformId)) {
      if (this.transferState.hasKey(RANDOM_VALUE_KEY)) {
        this.value = this.transferState.get(RANDOM_VALUE_KEY, 0);
      }
    }
  }

  generateRandom() {
    return Math.floor(Math.random() * 10);
  }
}
