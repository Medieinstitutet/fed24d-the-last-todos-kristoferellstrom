import { useState, type FormEvent } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

type Props = {
  onAdd: (title: string, description: string) => void;
};

export default function AddTodo({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (title.trim() && description.trim()) {
      onAdd(title.trim(), description.trim());
      setTitle("");
      setDescription("");
    }
  };

  return (
    <Box component="section" aria-labelledby="add-todo-heading" sx={{ mb: 3 }}>
      <Typography
        id="add-todo-heading"
        variant="h6"
        component="h2"
        sx={{
          position: "absolute",
          width: 1,
          height: 1,
          p: 0,
          m: -1,
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          border: 0,
        }}
      >
        Lägg till ny uppgift
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <TextField
          id="todo-title"
          label="Titel"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          fullWidth
          size="small"
        />
        <TextField
          id="todo-description"
          label="Beskrivning"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          fullWidth
          size="small"
          multiline
          rows={2}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ alignSelf: "flex-end" }}
        >
          Lägg till
        </Button>
      </Box>
    </Box>
  );
}
