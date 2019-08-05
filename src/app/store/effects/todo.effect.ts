import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, concatMap } from 'rxjs/operators';
import * as todoActions from '../actions/todo.action';
import { TodoService } from 'src/app/todo/todo.service';
import { of } from 'rxjs/internal/observable/of';
import { Todo } from 'src/app/models/todo.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TodoEffects {
    constructor(
        private actions$: Actions,
        private todosService: TodoService
    ) {}

    @Effect()
    loadTodos$ = this.actions$.pipe(
        ofType(todoActions.LOAD_TODOS),
        switchMap(() => {
            return this.todosService.getTodos().pipe(
                map(todos => new todoActions.LoadTodosSuccess(todos)),
                catchError(error => of(new todoActions.LoadTodosFail(error)))
            );
        })
    );

    @Effect()
    addTodo$ = this.actions$.pipe(
        ofType(todoActions.ADD_TODO),
        map((newTodo: todoActions.AddTodo) => newTodo.payload),
        switchMap((newTodo) => {
            return this.todosService.addTodo(newTodo).pipe(
                map((todo) => new todoActions.AddTodoSuccess(todo)),
                catchError(error => of(new todoActions.AddTodoFail(error)))
            );
        })
    );

    @Effect()
    removeTodo$ = this.actions$.pipe(
        ofType(todoActions.REMOVE_TODO),
        map((todoToRemove: todoActions.RemoveTodo) => todoToRemove.payload),
        switchMap(todoToRemove => {
            return this.todosService.removeTodo(todoToRemove).pipe(
                map((todo) => new todoActions.RemoveTodoSuccess(todo)),
                catchError(error => of(new todoActions.RemoveTodoFail(error)))
            );
        })
    );

    @Effect()
    updateTodo$ = this.actions$.pipe(
        ofType(todoActions.UPDATE_TODO),
        map((data: todoActions.UpdateTodo) => data.payload),
        switchMap(data => {
            return this.todosService.updateTodo(data.todoId, data.newLabel).pipe(
                map((todo) => new todoActions.UpdateTodoSuccess(todo)),
                catchError(error => of(new todoActions.UpdateTodoFail(error)))
            );
        })
    );
}
