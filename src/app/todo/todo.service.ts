import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

interface TodoData {
  label: string;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private _todos = new BehaviorSubject<Todo[]>([]);

  get todos() {
    return this._todos.asObservable();
  };

  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'myY5jxStQRZUCQRiE6g8phmbo1G2'
    })
  };

  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<{ [key: string]: TodoData }>('https://todoapp-de478.firebaseio.com/todos.json', this.httpOptions)
    .pipe(
      map(resData => {
        const resTodos = [];
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            resTodos.push(
              new Todo (
                key,
                resData[key].label
              )
            );
          }
        }

        return resTodos;
      }),
      tap(resTodos => {
        this._todos.next(resTodos);
        return of(resTodos);
      })
    );
  }

  addTodo(newTodo: Todo): Observable<Todo> {
    let generatedId: string = Math.random().toString();
    newTodo.id = generatedId;
    return this.http.post<{ name: string }>('https://todoapp-de478.firebaseio.com/todos.json', {...newTodo, id: null})
    .pipe(
      map(resData => {
        generatedId = resData.name;
        return newTodo;
      }),
      tap(() => {
        newTodo.id = generatedId;
        const currentTodos = this._todos.value;
        const updatedTodos = [...currentTodos, newTodo];
        this._todos.next(updatedTodos);
        return of(newTodo);
      })
    );
  }

  removeTodo(todoToRemove: Todo): Observable<Todo> {
    return this.http.delete(`https://todoapp-de478.firebaseio.com/todos/${todoToRemove.id}.json`)
    .pipe(
      map(resData => {
        return todoToRemove;
      }),
      tap(() => {
        const currentTodos = this._todos.value;
        const updatedTodos = currentTodos.filter(todo => { todo.id !== todoToRemove.id });
        this._todos.next(updatedTodos);
        return of(todoToRemove);
      })
    )
  }

  updateTodo(todoId: string, label: string): Observable<Todo> {
    return this.http.put(`https://todoapp-de478.firebaseio.com/todos/${todoId}.json`, { label })
    .pipe(
      map(resData => {
        const newTodo: Todo = new Todo(todoId, label);
        return newTodo;
      }),
      tap(newTodo => {
        const currentTodos = this._todos.value;
        currentTodos.forEach(todo => {
          if (todo.id === todoId) {
            todo.label = label;
          }
        });

        this._todos.next(currentTodos);
        return of(newTodo);
      })
    );
  }
}
