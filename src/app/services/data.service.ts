import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Todo } from '../models/todo';

const Todos: Todo[] = [
  { id: 1, title: 'Todo 1',
    description: 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    completed: true, created_at: '2021-01-01', updated_at: '2021-01-01' },
  { id: 2, title: 'Todo 2',
    description: 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    completed: false, created_at: '2021-01-01', updated_at: '2021-01-01' },
  { id: 3, title: 'Todo 3',
    description:'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    completed: false, created_at: '2021-01-01', updated_at: '2021-01-01' },
  { id: 4, title: 'Todo 4',
    description: 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    completed: false, created_at: '2021-01-01', updated_at: '2021-01-01' },
]

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }
  
  getTodos(): Observable<Todo[]> {
    return of<Todo[]>(Todos)
  }

  addTodo(todo: Todo): void {
    Todos.push(todo);
  }

  updateTodo(id: number, todo: Partial<Todo>) {
    const index = Todos.findIndex(todo => todo.id === id);
    Todos[index] = { ...Todos[index], ...todo };
  }

  deleteTodo(id: number) {
    const index = Todos.findIndex(todo => todo.id === id);
    Todos.splice(index, 1);
  }
}
