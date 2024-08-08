import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  private readonly toastService = inject(ToastService);
  isLogin = false;


}
