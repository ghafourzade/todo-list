"use client";
import { Grid, TextField } from "@mui/material";

import TodoCard from "./TodoCard";
import useTodoSearch from "../hooks/useTodoSearch";
import useTodoLocalStorage from "../hooks/useTodoLocalStorage";

export default function TodoList() {
  useTodoLocalStorage();
  const { viewTodos, searchChangeHandler } = useTodoSearch();
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sx={{ mb: 2 }}>
        <TextField id="search-input" label="Search" variant="outlined" sx={{ width: "100%" }} onChange={searchChangeHandler} />
      </Grid>
      {viewTodos.map((c) => (
        <Grid item xs={12} key={c.id}>
          <TodoCard todo={c} />
        </Grid>
      ))}
    </Grid>
  );
}
