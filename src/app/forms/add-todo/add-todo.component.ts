import { AfterViewInit, Component, EnvironmentInjector, inject, Signal, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { DataService } from '../../services/data.service';
import { Todo } from '../../models/todo';
import { map } from 'rxjs';
import { TEditForm, todoFormValidation } from '../../validation';
import { SafeParseReturnType } from 'zod';
import { toSignal } from '@angular/core/rxjs-interop';
import { DialogRef } from '@angular/cdk/dialog';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [FormsModule, MatDialogModule],
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.scss'
})
export class AddTodoComponent implements AfterViewInit {
  
  form = viewChild.required<NgForm>('f');
  validation!: Signal<SafeParseReturnType<TEditForm, TEditForm> | undefined>;
  
  private readonly environmentInjector = inject(EnvironmentInjector);
  private readonly dataService = inject(DataService);
  private readonly dialogRef = inject(DialogRef<AddTodoComponent>);
  private readonly toastService = inject(ToastService);

  ngAfterViewInit(): void {
    this.validation = toSignal(this.form().valueChanges!.pipe(
      map((val) => todoFormValidation.safeParse(val))
    ), {injector: this.environmentInjector})
  }

  resetForm() {
    this.form().reset();
  }

  addAdmin() {
    const { title, description, completed } = this.form().value;
    console.log(this.form().value);
    const todo: Todo = {
      title,
      description,
      completed,
      created_at: new Date().toISOString(),
      updated_at: '',
      id: -1
    }

    this.dataService.getTodos().subscribe((x) => {
      const currentId = x.reduce((c, p) => {
        if (p.id > c) {
          return p.id;
        }
        return c;
      }, 0);

      todo.id = currentId + 1;

      this.dataService.addTodo(todo);
      this.dialogRef.close();
    })


  }

}
