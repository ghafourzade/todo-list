"use client";
import { useCallback, useState } from "react";
import { Box, Button, Container, Divider, Grid, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

import { useAppSelector } from "@/lib/hooks";
import TodoCard from "./components/TodoCard";
import NewTaskModal from "./components/NewTaskModal";

export default function Home() {
  const todos = useAppSelector((state) => state.todoReducer);

  const [newTaskModalOpen, setNewTaskModalOpen] = useState(false);

  const newClickHandler = useCallback(() => setNewTaskModalOpen(true), []);
  const newTaskModalCloseHandler = useCallback(() => setNewTaskModalOpen(false), []);

  return (
    <Container sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 3 }}>
      <NewTaskModal open={newTaskModalOpen} onClose={newTaskModalCloseHandler} />
      <Typography variant="h4" component="h1">
        Todo List
      </Typography>
      <Divider />
      <Box sx={{ display: "flex", gap: 1 }}>
        <Button variant="contained" startIcon={<AddIcon />} sx={{ textTransform: "none" }} onClick={newClickHandler}>
          New Task
        </Button>
        <Button variant="outlined" startIcon={<FilterAltIcon />} sx={{ textTransform: "none" }}>
          Filter
        </Button>
      </Box>
      <TextField id="search-input" label="Search" variant="outlined" sx={{ width: "100%" }} />
      <Grid container spacing={2} sx={{ mt: 1 }}>
        {todos.map((c) => (
          <Grid item xs={12} key={c.id}>
            <TodoCard todo={c} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
