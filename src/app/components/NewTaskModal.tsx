"use client";
import { type ChangeEvent, useCallback, useState } from "react";
import { Card, Container, Modal, Typography, TextField, FormControlLabel, Checkbox, Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

import { useAppDispatch } from "@/lib/hooks";
import { todoActions } from "@/lib/features/todoSlice";

const initialFormData = {
  desc: {
    value: "",
    valid: false,
    touchecd: false,
  },
  compeleted: false,
};

export default function NewTaskModal(props: { open: boolean; onClose: () => void }) {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState(initialFormData);

  const closeHandler = useCallback(() => {
    setFormData(initialFormData);
    if (!props.onClose) return;
    props.onClose();
  }, [props]);

  const saveClickHandler = useCallback(() => {
    if (!formData.desc.valid) return setFormData((c) => ({ ...c, desc: { ...c.desc, touchecd: true } }));
    const date = Date.now();
    dispatch(todoActions.addTodo({ id: date, text: formData.desc.value, done: formData.compeleted, date }));
    closeHandler();
  }, [closeHandler, dispatch, formData.compeleted, formData.desc.valid, formData.desc.value]);

  const completedCheckChangeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setFormData((c) => ({ ...c, compeleted: event.target.checked })),
    []
  );

  const descriptionChangeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      setFormData((c) => ({ ...c, desc: { ...c.desc, value: event.target.value, valid: event.target.value.trim() !== "" } })),
    []
  );
  return (
    <Modal open={props.open} onClose={closeHandler}>
      <Container sx={{ pt: 3 }}>
        <Card variant="outlined" sx={{ display: "flex", flexDirection: "column", gap: 1, p: 2 }}>
          <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
            New Task
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
