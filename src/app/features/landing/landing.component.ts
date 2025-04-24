import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import {Component, Inject, OnInit, PLATFORM_ID, makeStateKey, TransferState} from '@angular/core';

const VALUE_KEY = makeStateKey<number>('value');

@Component({
  selector: 'app-landing',
  imports: [],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent implements OnInit {
  value: number = 0;

  constructor(
    @Inject(PLATFORM_ID)
    private readonly platformId: Object,
    private transferState: TransferState
  ) {}

  ngOnInit(): void {
    if (isPlatformServer(this.platformId)) {
      // On server, set the value and store it in transfer state
      this.value = this.generateRandom();
      this.transferState.set(VALUE_KEY, this.value);
    } else if (isPlatformBrowser(this.platformId)) {
      // On client, retrieve the value from transfer state if available
      if (this.transferState.hasKey(VALUE_KEY)) {
        this.value = this.transferState.get(VALUE_KEY, 0);
        // Optional: remove the key after using it
        this.transferState.remove(VALUE_KEY);
      }
    }
  }

  generateRandom() {
    return Math.floor(Math.random() * 10);
  }
}
