import { AfterViewInit, Component, EnvironmentInjector, inject, OnDestroy, Signal, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { map} from 'rxjs';
import { SafeParseReturnType } from 'zod';
import { AsyncPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { loginFormValidation, TLoginForm } from '../../validation';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, AsyncPipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements AfterViewInit{

  private readonly environmentInjector = inject(EnvironmentInjector);
  private readonly router = inject(Router);

  form = viewChild.required<NgForm>('f');

  validation!: Signal<SafeParseReturnType<TLoginForm, TLoginForm> | undefined>;
  
  ngAfterViewInit(): void {
    this.validation = toSignal(this.form().valueChanges!.pipe(
      map((val) => loginFormValidation.safeParse(val))
     ), {injector: this.environmentInjector} )
  }

  login() {
    if (this.validation()?.error) {return ;}
    
    if (this.form().value.username === 'admin' && this.form().value.password === 'Admin1!') {
      alert('Login successful');
      this.router.navigate(['/dashboard']);
    }
  }

  clear() {
    this.form().reset();
  }

}
