// src/components/TodoList.tsx
import TodoItem from "./TodoItem";
import type { Todo } from "../TodoApp";
import { List, Typography, Box } from "@mui/material";

type Props = {
  todos: Todo[];
  toggleDone: (id: number) => void;
  deleteTodo: (id: number) => void;
};

export default function TodoList({ todos, toggleDone, deleteTodo }: Props) {
  if (todos.length === 0) {
    return (
      <Box sx={{ mt: 2 }}>
        <Typography variant="body1" align="center" color="text.secondary">
          Inga uppgifter att visa.
        </Typography>
      </Box>
    );
  }

  return (
    <List sx={{ width: "100%", p: 0 }}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={() => toggleDone(todo.id)}
          onDelete={() => deleteTodo(todo.id)}
        />
      ))}
    </List>
  );
}
