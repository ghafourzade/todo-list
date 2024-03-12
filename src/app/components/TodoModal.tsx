"use client";
import { type ChangeEvent, useCallback, useState, useEffect } from "react";
import { Card, Container, Modal, Typography, TextField, FormControlLabel, Checkbox, Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { todoActions } from "@/lib/features/todoSlice";

const initialFormData = {
  desc: {
    value: "",
    valid: false,
    touchecd: false,
  },
  compeleted: false,
};

const descValidation = (value: string) => value.trim() !== "";

export default function TodoModal() {
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.todoReducer.todoModal.open);
  const todo = useAppSelector((state) => state.todoReducer.todoModal.todo);
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (!todo) return;
    setFormData((c) => ({ compeleted: todo.done, desc: { ...c.desc, value: todo.text, valid: descValidation(todo.text) } }));
  }, [todo]);

  const closeHandler = useCallback(() => {
    setFormData(initialFormData);
    dispatch(todoActions.closeTodoModal());
  }, [dispatch]);

  const addTodo = useCallback(() => {
    const date = Date.now();
    dispatch(todoActions.addTodo({ id: date, text: formData.desc.value, done: formData.compeleted, date }));
  }, [dispatch, formData.compeleted, formData.desc.value]);

  const editTodo = useCallback(() => {
    if (!todo) return;
    dispatch(todoActions.editTodo({ id: todo.id, text: formData.desc.value, done: formData.compeleted, date: todo.date }));
  }, [dispatch, formData.compeleted, formData.desc.value, todo]);

  const saveClickHandler = useCallback(() => {
    if (!formData.desc.valid) return setFormData((c) => ({ ...c, desc: { ...c.desc, touchecd: true } }));
    if (!todo) {
      addTodo();
    } else {
      editTodo();
    }
    closeHandler();
  }, [addTodo, closeHandler, editTodo, formData.desc.valid, todo]);

  const completedCheckChangeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setFormData((c) => ({ ...c, compeleted: event.target.checked })),
    []
  );

  const descriptionChangeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      setFormData((c) => ({ ...c, desc: { ...c.desc, value: event.target.value, valid: descValidation(event.target.value) } })),
    []
  );

  return (
    <Modal open={open} onClose={closeHandler}>
      <Container sx={{ pt: 3 }}>
        <Card variant="outlined" sx={{ display: "flex", flexDirection: "column", gap: 1, p: 2 }}>
          <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
            {todo ? "Edit Task" : "New Task"}
          </Typography>
          <TextField
            label="Task Description"
            multiline
            value={formData.desc.value}
            onChange={descriptionChangeHandler}
            error={!formData.desc.valid && formData.desc.touchecd}
          />
          <FormControlLabel
            control={<Checkbox checked={formData.compeleted} onChange={completedCheckChangeHandler} />}
            label="Compeleted"
          />
          <Button variant="contained" startIcon={<SaveIcon />} sx={{ textTransform: "none", alignSelf: "end" }} onClick={saveClickHandler}>
            Save
          </Button>
        </Card>
      </Container>
    </Modal>
  );
}
