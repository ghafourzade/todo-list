"use client";
import { useCallback } from "react";

import { Box, Button, Divider, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

import { useAppDispatch } from "@/lib/hooks";
import { todoActions } from "@/lib/features/todoSlice";

export default function TodoHeader() {
  const dispatch = useAppDispatch();
  const newTaskClickHandler = useCallback(() => dispatch(todoActions.openTodoModal(null)), [dispatch]);
  const filterTaskClickHandler = useCallback(() => {
    alert("coming soon ;)");
  }, []);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Typography variant="h4" component="h1">
        Todo List
      </Typography>
      <Divider />
      <Box sx={{ display: "flex", gap: 1 }}>
        <Button variant="contained" startIcon={<AddIcon />} sx={{ textTransform: "none" }} onClick={newTaskClickHandler}>
          New Task
        </Button>
        <Button variant="outlined" startIcon={<FilterAltIcon />} sx={{ textTransform: "none" }} onClick={filterTaskClickHandler}>
          Filter
        </Button>
      </Box>
    </Box>
  );
}
