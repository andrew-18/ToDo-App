import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';
import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todos: Todo[] = [
    {
      id: 0,
      label: 'Do this'
    }
  ];

  constructor() { }

  getTodos(): Observable<Todo[]> {
    return of(this.todos);
  }

  addTodo(newTodo: Todo): Observable<Todo> {
    this.todos.push(newTodo);
    return of(newTodo);
  }

  removeTodo(todoToRemove: Todo): Observable<Todo> {
    this.todos.filter(todo => todo.id !== todoToRemove.id);
    return of(todoToRemove);
  }

  updateTodo(todoId: number, newLabel: string): Observable<Todo> {
    const newTodo: Todo = { id: todoId, label: newLabel };
    this.todos.forEach(todo => {
      if (todo.id === todoId) {
        todo = newTodo;
      }
    });

    return of(newTodo);
  }
}
