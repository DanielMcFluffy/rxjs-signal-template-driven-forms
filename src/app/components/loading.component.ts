import { Component, inject } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  template: `
    <mat-spinner></mat-spinner>
  `,
  styles: `
    :host {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      width: 100%;
      z-index: 1000;
      background-color: rgba(0, 0, 0, 0.2);
  }

  mat-spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1001;
  }
  `,
  host: {
    '[style.display]': 'loadingService.isLoading() ? "block" : "none"'
  }
})
export class LoadingComponent {

  loadingService = inject(LoadingService);
}
