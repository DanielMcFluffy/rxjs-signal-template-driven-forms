import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor() { }

  private readonly _isLoading = signal<boolean>(false);
  isLoading = this._isLoading.asReadonly();

  showLoading() {
    this._isLoading.set(true);
  };

  hideLoading() {
    this._isLoading.set(false);
  };
}
