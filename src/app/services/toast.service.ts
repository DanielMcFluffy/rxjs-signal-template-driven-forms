import { Injectable, signal } from '@angular/core';

type TOAST_STATUS = "success" | "error" | "warning" | "info";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }

  private readonly _toastStatus = signal<TOAST_STATUS>('info');
  toastStatus = this._toastStatus.asReadonly();
  
  private readonly _toastMessage = signal<string>('This is a toast message');
  toastMessage = this._toastMessage.asReadonly();

  private readonly _toastShow = signal<boolean>(false);
  toastShow = this._toastShow.asReadonly();

  setToast(status: TOAST_STATUS, message: string) {
    this._toastStatus.set(status);
    this._toastMessage.set(message);
  }

  showToast() {
    this._toastShow.set(true);
  }

  hideToast() {
    this._toastShow.set(false);
  }

}
