import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

export type TodoItem = {
  id: number;
  text: string;
  done: boolean;
  date: number;
};

const initialState: { todos: TodoItem[]; todoModal: { open: boolean; todo: TodoItem | null } } = {
  todos: [],
  todoModal: { open: false, todo: null },
};

const sortByDate = (a: TodoItem, b: TodoItem) => b.date - a.date;

const todo = createSlice({
  name: "todo",
  initialState,
  reducers: {
    openTodoModal: (state, action: PayloadAction<TodoItem | null>) => ({ ...state, todoModal: { open: true, todo: action.payload } }),
    closeTodoModal: (state) => ({ ...state, todoModal: initialState.todoModal }),
    addTodo: (state, action: PayloadAction<TodoItem>) => ({ ...state, todos: [...state.todos, action.payload].sort(sortByDate) }),
    editTodo: (state, action: PayloadAction<TodoItem>) => ({
      ...state,
      todos: [...state.todos.filter((c) => c.id !== action.payload.id), action.payload].sort(sortByDate),
    }),
    deleteTodo: (state, action: PayloadAction<number>) => ({
      ...state,
      todos: state.todos.filter((c) => c.id !== action.payload).sort(sortByDate),
    }),
  },
});

export const todoActions = todo.actions;
export const todoReducer = todo.reducer;
