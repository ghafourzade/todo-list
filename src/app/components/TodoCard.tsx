"use client";
import { type ChangeEvent, useCallback, useMemo } from "react";

import { Box, Card, Checkbox, IconButton, Typography, useTheme } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { todoActions, type TodoItem } from "@/lib/features/todoSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

export default function TodoCard(props: { todo: TodoItem }) {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const search = useAppSelector((state) => state.todoReducer.search);

  const doneChangeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => dispatch(todoActions.editTodo({ ...props.todo, done: event.target.checked })),
    [dispatch, props.todo]
  );
  const deleteClickHandler = useCallback(() => dispatch(todoActions.deleteTodo(props.todo.id)), [dispatch, props.todo.id]);
  const editClickHandler = useCallback(() => dispatch(todoActions.openTodoModal(props.todo)), [dispatch, props.todo]);

  const searchParts = useMemo(() => props.todo.text.split(new RegExp(`(${search})`, "gi")), [props.todo.text, search]);

  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        alignItems: "start",
        gap: 1,
        p: 1,
        transition: "200ms ease",
        background: props.todo.done ? theme.palette.grey[100] : theme.palette.common.white,
      }}
    >
      <Checkbox checked={props.todo.done} onChange={doneChangeHandler} />
      <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
        <Typography variant="body1" py={1} color={props.todo.done ? theme.palette.grey[600] : theme.palette.text.primary}>
          {searchParts.map((c, i) =>
            c.toLowerCase() === search.toLowerCase() ? (
              <Typography key={i} color="primary" component="span">
                {c}
              </Typography>
            ) : (
              c
            )
          )}
        </Typography>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, marginInlineEnd: "auto" }}>
            <CalendarTodayIcon sx={{ fontSize: 20, color: props.todo.done ? theme.palette.grey[600] : theme.palette.primary.main }} />
            <Typography variant="body2" color={props.todo.done ? theme.palette.grey[600] : theme.palette.primary.main} py={1}>
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
