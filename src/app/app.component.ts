import { Component, inject } from '@angular/core';
import { GuardsCheckEnd, GuardsCheckStart, NavigationEnd, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ToastComponent } from './components/toast.component';
import { LoadingComponent } from './components/loading.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, ToastComponent, LoadingComponent],
  template: `
  <app-header></app-header>
  <div class="content">
      <router-outlet></router-outlet>
  </div>
    <app-toast></app-toast>
    <app-loading></app-loading>
  `,
  styles: `

    :host {
      display: flex;
      flex-direction: column;
      height: 100vh;
      background-color: var(--color-bg-primary);
    }
    .content {
      position: relative;
      display: flex;
      flex-direction: column;
      flex: 1;
      margin: 1rem;
      padding: 1rem;
      overflow: hidden;
      border-radius: 6px;
      background-color: var(--color-bg-content);
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    }
  `,
})
export class AppComponent {

  private readonly router = inject(Router);
  private readonly loadingService = inject(LoadingService);

  constructor() {
    this.router.events.pipe(takeUntilDestroyed()).subscribe((event) => {
      if (event instanceof NavigationStart ||
          event instanceof GuardsCheckStart) {
          this.loadingService.showLoading();
      }
      if (event instanceof GuardsCheckEnd ||
          event instanceof NavigationEnd) {
          setTimeout(() => {
            this.loadingService.hideLoading();
          }, 1000);
      }
    });
  }
}
