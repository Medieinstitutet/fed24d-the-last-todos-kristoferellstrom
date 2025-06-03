// src/components/TodoItem.tsx
import type { Todo } from "../TodoApp";
import {
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
};

export default function TodoItem({ todo, onToggle, onDelete }: Props) {
  return (
    <ListItem
      divider
      sx={{
        mb: 1,
        borderRadius: 1,
        bgcolor: "grey.50",
        transition: "background-color 0.2s ease-in-out",
        "&:hover": {
          bgcolor: "grey.100",
        },
      }}
      secondaryAction={
        <IconButton edge="end" onClick={onDelete}>
          <DeleteIcon fontSize="small" color="error" />
        </IconButton>
      }
    >
      <Checkbox
        checked={todo.done}
        onChange={onToggle}
        color="primary"
        sx={{ mr: 1 }}
      />

      <ListItemText
        primary={
          <Typography
            sx={{
              textDecoration: todo.done ? "line-through" : "none",
              fontStyle: todo.done ? "italic" : "normal",
              opacity: todo.done ? 0.5 : 1,
              color: todo.done ? "text.secondary" : "text.primary",
              fontWeight: 500,
            }}
          >
            {todo.title}
          </Typography>
        }
        secondary={
          <Typography
            variant="body2"
            sx={{
              textDecoration: todo.done ? "line-through" : "none",
              fontStyle: todo.done ? "italic" : "normal",
              opacity: todo.done ? 0.5 : 1,
              color: todo.done ? "text.secondary" : "text.secondary",
            }}
          >
            {todo.description}
          </Typography>
        }
      />
    </ListItem>
  );
}
