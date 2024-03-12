"use client";
import { type ChangeEvent, useCallback } from "react";

import { Box, Card, Checkbox, IconButton, Typography } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { todoActions, type TodoItem } from "@/lib/features/todoSlice";
import { useAppDispatch } from "@/lib/hooks";

export default function TodoCard(props: { todo: TodoItem }) {
  const dispatch = useAppDispatch();

  const doneChangeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => dispatch(todoActions.editTodo({ ...props.todo, done: event.target.checked })),
    [dispatch, props.todo]
  );
  const deleteClickHandler = useCallback(() => dispatch(todoActions.deleteTodo(props.todo.id)), [dispatch, props.todo.id]);
  const editClickHandler = useCallback(() => dispatch(todoActions.openTodoModal(props.todo)), [dispatch, props.todo]);

  return (
    <Card variant="outlined" sx={{ display: "flex", alignItems: "start", gap: 1, p: 1 }}>
      <Checkbox checked={props.todo.done} onChange={doneChangeHandler} />
      <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
        <Typography variant="body1" py={1}>
          {props.todo.text}
        </Typography>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, marginInlineEnd: "auto" }}>
            <CalendarTodayIcon color="primary" sx={{ fontSize: 20 }} />
            <Typography variant="body2" color="primary" py={1}>
              {new Date(props.todo.date).toDateString()}
            </Typography>
          </Box>
          <Box>
            <IconButton onClick={deleteClickHandler}>
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={editClickHandler}>
              <EditIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}
