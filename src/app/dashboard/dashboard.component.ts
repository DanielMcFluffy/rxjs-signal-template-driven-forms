import { Component, inject } from '@angular/core';
import { TodosCardComponent } from './todos-card/todos-card.component';
import { DataService } from '../services/data.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { AddAdminComponent } from '../forms/add-admin/add-admin.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TodosCardComponent, MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  private readonly _dataService = inject(DataService);
  private readonly dialog = inject(MatDialog);
  dataService = this._dataService;

  todos = toSignal(this.dataService.getTodos());

  addAdmin() {
    const dialogRef = this.dialog.open(AddAdminComponent)
  }

}
