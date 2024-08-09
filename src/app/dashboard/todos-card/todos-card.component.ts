import { ChangeDetectionStrategy, Component, computed, inject, input} from '@angular/core';
import { Todo } from '../../models/todo';
import { FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { DropdownService } from '../../services/dropdown.service';
import { DataService } from '../../services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { EditTodoComponent } from '../../forms/edit-todo/edit-todo.component';

@Component({
  selector: 'app-todos-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, MatIconModule, CommonModule],
  templateUrl: './todos-card.component.html',
  styleUrl: './todos-card.component.scss',
})
export class TodosCardComponent {

  todo = input.required<Todo>();
  dataService = inject(DataService);
  dropdownService = inject(DropdownService);
  dialog = inject(MatDialog)

  dropdownOpen = computed(() => 
    this.dropdownService.currentOpenDropdown() === this.todo().id ?
    true :
    false)

  toggleDropdown($event : Event) {
    $event.stopPropagation();

    this.dropdownOpen() ? 
    this.dropdownService.setDropdown(null) :
    this.dropdownService.setDropdown(this.todo().id);
  }

  editTodo(id: number) {
    this.dialog.open(EditTodoComponent, {
      minWidth: '600px',
      height: 'auto',
      data: id
    })
  }

  deleteTodo(id: number) {
    this.dataService.deleteTodo(id);
  }

}
