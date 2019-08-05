import * as fromTodos from './todo.reducer';
import { createFeatureSelector, ActionReducerMap, createSelector } from '@ngrx/store';

export interface AppState {
    todos: fromTodos.TodoState;
}

export const reducers: ActionReducerMap<AppState> = {
    todos: fromTodos.reducer
};

export const getAppState = createFeatureSelector<AppState>('app');

export const getTodoState = createSelector(
    getAppState,
    (state: AppState) => state.todos
);

export const getAllTodos = createSelector(getTodoState, fromTodos.getTodos);
export const getTodosLoaded = createSelector(getTodoState, fromTodos.getTodosLoaded);
export const getTodosLoading = createSelector(getTodoState, fromTodos.getTodosLoading);

