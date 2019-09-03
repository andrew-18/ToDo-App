import { Action } from '@ngrx/store';
import { Todo } from '../../models/todo.model';

// Loading actions
export const LOAD_TODOS = '[Todos] Load Todos';
export const LOAD_TODOS_FAIL = '[Todos] Load Todos Fail';
export const LOAD_TODOS_SUCCESS = '[Todos] Load Todos Success';

// Adding actions
export const ADD_TODO = '[Todo] Add Todo';
export const ADD_TODO_SUCCESS = '[Todo] Add Todo Success';
export const ADD_TODO_FAIL = '[Todo] Add Todo Fail';

// Removing actions
export const REMOVE_TODO = '[Todo] Remove Todo';
export const REMOVE_TODO_SUCCESS = '[Todo] Remove Todo Success';
export const REMOVE_TODO_FAIL = '[Todo] Remove Todo Fail';

// Updating actions
export const UPDATE_TODO = '[Todo] Update Todo';
export const UPDATE_TODO_SUCCESS = '[Todo] Update Todo Success';
export const UPDATE_TODO_FAIL = '[Todo] Update Todo Fail';


export class LoadTodos implements Action {
    readonly type = LOAD_TODOS;
}

export class LoadTodosFail implements Action {
    readonly type = LOAD_TODOS_FAIL;
    constructor(public payload: any) {}
}

export class LoadTodosSuccess implements Action {
    readonly type = LOAD_TODOS_SUCCESS;
    constructor(public payload: Todo[]) {}
}

export class AddTodo implements Action {
    readonly type = ADD_TODO;
    constructor(public payload: Todo) {}
}

export class AddTodoSuccess implements Action {
    readonly type = ADD_TODO_SUCCESS;
    constructor(public payload: Todo) {}
}

export class AddTodoFail implements Action {
    readonly type = ADD_TODO_FAIL;
    constructor(public payload: any) {}
}

export class RemoveTodo implements Action {
    readonly type = REMOVE_TODO;
    constructor(public payload: Todo) {}
}

export class RemoveTodoSuccess implements Action {
    readonly type = REMOVE_TODO_SUCCESS;
    constructor(public payload: Todo) {}
}

export class RemoveTodoFail implements Action {
    readonly type = REMOVE_TODO_FAIL;
    constructor(public payload: any) {}
}

export class UpdateTodo implements Action {
    readonly type = UPDATE_TODO;
    constructor(public payload: { todoId: string, newLabel: string }) {}
}

export class UpdateTodoSuccess implements Action {
    readonly type = UPDATE_TODO_SUCCESS;
    constructor(public payload: Todo) {}
}

export class UpdateTodoFail implements Action {
    readonly type = UPDATE_TODO_FAIL;
    constructor(public payload: any) {}
}


export type TodosAction =
    LoadTodos |
    LoadTodosFail |
    LoadTodosSuccess |
    AddTodo |
    AddTodoSuccess |
    AddTodoFail |
    RemoveTodo |
    RemoveTodoSuccess |
    RemoveTodoFail |
    UpdateTodo |
    UpdateTodoSuccess |
    UpdateTodoFail
;
