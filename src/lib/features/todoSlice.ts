import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type TodoItem = {
  id: number;
  text: string;
  done: boolean;
  date: number;
};

const initialState: TodoItem[] = [];

const todo = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<TodoItem>) => [...state, action.payload],
    editTodo: (state, action: PayloadAction<TodoItem>) => [...state.filter((c) => c.id !== action.payload.id), action.payload],
    deleteTodo: (state, action: PayloadAction<number>) => state.filter((c) => c.id !== action.payload),
  },
});

export const todoActions = todo.actions;
export const todoReducer = todo.reducer;
