import { Component, inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { TodosCardComponent } from './todos-card/todos-card.component';
import { DataService } from '../services/data.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { AddTodoComponent } from '../forms/add-todo/add-todo.component';
import { DropdownService } from '../services/dropdown.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TodosCardComponent, MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {

  private readonly _dataService = inject(DataService);
  dataService = this._dataService;
  todos = toSignal(this.dataService.getTodos());
  
  private readonly dialog = inject(MatDialog);
  private readonly dropdownService = inject(DropdownService);
  private readonly renderer = inject(Renderer2);

  listener!: () => void;

  ngOnInit(): void {
    this.listener = this.renderer.listen('document', 'click', () => {
      console.log('clicked');
      if (this.dropdownService.currentOpenDropdown() !== null) {
        this.dropdownService.setDropdown(null);
      }
    });
  }

  addAdmin() {
    const dialogRef = this.dialog.open(AddTodoComponent, {
      minWidth: '400px',
      height: 'auto'
    })
  }

  ngOnDestroy(): void {
    this.listener();
  }

}
