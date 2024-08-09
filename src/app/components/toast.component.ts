import { Component, inject } from '@angular/core';
import { ToastService } from '../services/toast.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [],
  template: `
    {{toastService.toastMessage()}}
  `,
  styles: `
    :host {
    position: absolute;
    top: 10%;
    right: 45%;
    transform: translate(-50%, -50%);
    z-index: 9999;
    border-style: solid;
    border-width: 1px;
    border-radius: 6px;
    border-left-color: red;
    border-left-width: 0.5rem;
    padding: 2rem;
    background-color: var(--color-bg-content);
}

:host.info {
    border-left-color: var(--color-info);
}

:host.success {
    border-left-color: var(--color-success);
}

:host.warning {
    border-left-color: var(--color-warning);
}

:host.danger {
    border-left-color: var(--color-error);
}
  `,
  host: {
    '[class.success]': 'toastService.toastStatus() === "success"',
    '[class.error]': 'toastService.toastStatus() === "error"',
    '[class.warning]': 'toastService.toastStatus() === "warning"',
    '[class.info]': 'toastService.toastStatus() === "info"',
    '[@toastTrigger]': "toastService.toastShow() ? 'open' : 'close'"
  },
  animations: [
    trigger('toastTrigger', [
      state('open', style({transform: 'translateY(0)', opacity: 1})), 
      state('close', style({transform: 'translateY(-500%)', opacity: 0})), 
      transition('open <=> close', [
        animate('1s cubic-bezier(.68,-0.55,.27,1.55)')
      ])
    ])
  ]
})
export class ToastComponent {

  toastService = inject(ToastService);

}
