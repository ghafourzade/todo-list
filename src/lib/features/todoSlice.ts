import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

export type TodoItem = {
  id: number;
  text: string;
  done: boolean;
  date: number;
};

type InitialState = { todos: TodoItem[]; viewTodos: TodoItem[]; search: string; todoModal: { open: boolean; todo: TodoItem | null } };

const initialState: InitialState = {
  todos: [],
  viewTodos: [],
  search: "",
  todoModal: { open: false, todo: null },
};

const sortByDate = (a: TodoItem, b: TodoItem) => b.date - a.date;

const todo = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<TodoItem>) => ({ ...state, todos: [...state.todos, action.payload].sort(sortByDate) }),
    editTodo: (state, action: PayloadAction<TodoItem>) => ({
      ...state,
      todos: [...state.todos.filter((c) => c.id !== action.payload.id), action.payload].sort(sortByDate),
    }),
    deleteTodo: (state, action: PayloadAction<number>) => ({
      ...state,
      todos: state.todos.filter((c) => c.id !== action.payload).sort(sortByDate),
    }),
    openTodoModal: (state, action: PayloadAction<TodoItem | null>) => ({ ...state, todoModal: { open: true, todo: action.payload } }),
    closeTodoModal: (state) => ({ ...state, todoModal: initialState.todoModal }),
    searchTodo: (state, action: PayloadAction<string>) => ({
      ...state,
      search: action.payload,
    }),
    setViewTodos: (state, action: PayloadAction<TodoItem[]>) => ({
      ...state,
      viewTodos: action.payload,
    }),
    setTodos: (state, action: PayloadAction<TodoItem[]>) => ({
      ...state,
      todos: action.payload,
    }),
  },
});

export const todoActions = todo.actions;
export const todoReducer = todo.reducer;
