import * as fromTodos from '../actions/todo.action';
import { Todo } from '../../models/todo.model';

export interface TodoState {
    data: Todo[];
    loaded: boolean;
    loading: boolean;
}

export const initialState: TodoState = {
    data: [],
    loaded: false,
    loading: false
};

export function reducer(state = initialState, action: fromTodos.TodosAction): TodoState {
    switch (action.type) {
        case fromTodos.LOAD_TODOS: {
            return {
                ...state,
                loading: true
            };
        }

        case fromTodos.LOAD_TODOS_FAIL: {
            return {
                ...state,
                loaded: false,
                loading: false
            };
        }

        case fromTodos.LOAD_TODOS_SUCCESS: {
            const data = [...action.payload];
            return {
                ...state,
                loading: false,
                loaded: true,
                data
            };
        }

        case fromTodos.ADD_TODO: {
            return {
                ...state,
                loading: true
            };
        }

        case fromTodos.ADD_TODO_SUCCESS: {
            const data = [...state.data, action.payload];
            return {
                ...state,
                loaded: true,
                loading: false,
                data
            };
        }

        case fromTodos.ADD_TODO_FAIL: {
            return {
                ...state,
                loading: false,
                loaded: false,
            };
        }

        case fromTodos.REMOVE_TODO: {
            return {
                ...state,
                loading: true
            };
        }

        case fromTodos.REMOVE_TODO_SUCCESS: {
            const data = state.data.filter(todo => todo.id !== action.payload.id);
            return {
                ...state,
                loading: false,
                loaded: true,
                data
            };
        }

        case fromTodos.REMOVE_TODO_FAIL: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case fromTodos.UPDATE_TODO: {
            return {
                ...state,
                loading: true
            };
        }

        case fromTodos.UPDATE_TODO_SUCCESS: {
            const newStateData: Todo[] = [];
            state.data.forEach(todo => {
                if (todo.id === action.payload.id) {
                    todo = action.payload;
                    newStateData.push(todo);
                } else {
                    newStateData.push(todo);
                }
            });

            const data = state.data = newStateData;

            return {
                ...state,
                loading: false,
                loaded: true,
                data
            };
        }

        case fromTodos.UPDATE_TODO_FAIL: {
            return {
                ...state,
                loaded: false,
                loading: false
            };
        }
    }

    return state;
}

export const getTodosLoading = (state: TodoState) => state.loading;
export const getTodosLoaded = (state: TodoState) => state.loaded;
export const getTodos = (state: TodoState) => state.data;
