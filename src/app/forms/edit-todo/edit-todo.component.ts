import { AfterViewInit, Component, EnvironmentInjector, inject, OnInit, Signal, viewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Todo } from '../../models/todo';
import { FormsModule, NgForm } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { map } from 'rxjs';
import { TEditForm, todoFormValidation } from '../../validation';
import { SafeParseReturnType } from 'zod';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-edit-todo',
  standalone: true,
  imports: [FormsModule, MatDialogModule],
  templateUrl: './edit-todo.component.html',
  styleUrl: './edit-todo.component.scss'
})
export class EditTodoComponent implements OnInit, AfterViewInit {

  todo!: Todo;
  form: Signal<NgForm> = viewChild.required('f');
  private readonly environmentInjector = inject(EnvironmentInjector);
  private readonly dialog = inject(MatDialogRef<EditTodoComponent>);
  private readonly data = inject<number>(MAT_DIALOG_DATA);
  private readonly dataService = inject(DataService);

  validation!: Signal<SafeParseReturnType<TEditForm, TEditForm> | undefined>

  ngOnInit(): void {
    this.dataService.getTodo(this.data).subscribe(todo => this.todo = todo!);
  }

  ngAfterViewInit(): void {
    this.validation = toSignal(this.form().valueChanges!.pipe(
      map((val) => todoFormValidation.safeParse(val))
    ), {injector: this.environmentInjector});
  }
  updateTodo() {
    this.dataService.updateTodo(this.todo.id, this.form().value);
    this.dialog.close();
  }

}
