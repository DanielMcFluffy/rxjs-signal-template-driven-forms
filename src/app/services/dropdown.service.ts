import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor() { }

  private readonly _currentOpenDropdown = signal<number | null>(null);
  currentOpenDropdown = this._currentOpenDropdown.asReadonly();

  setDropdown(id: number | null) {
      this._currentOpenDropdown.set(id);
  }

}
