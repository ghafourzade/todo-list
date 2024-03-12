"use client";
import { Grid, TextField } from "@mui/material";

import { useAppSelector } from "@/lib/hooks";

import TodoCard from "./TodoCard";

export default function TodoList() {
  const todos = useAppSelector((state) => state.todoReducer.todos);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sx={{ mb: 2 }}>
        <TextField id="search-input" label="Search" variant="outlined" sx={{ width: "100%" }} />
      </Grid>
      {todos.map((c) => (
        <Grid item xs={12} key={c.id}>
          <TodoCard todo={c} />
        </Grid>
      ))}
    </Grid>
  );
}
