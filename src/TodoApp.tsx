import { useState } from "react";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import SortTodos from "./components/SortTodos";
import VisuallyHidden from "./components/VisuallyHidden";
import Layout from "./components/Layout";
import { useTodos } from "./hooks/useTodos";
import { Box, Typography } from "@mui/material";

export type Todo = {
  id: number;
  title: string;
  description: string;
  done: boolean;
};

export default function TodoApp() {
  const { todos, addTodo, deleteTodo, toggleDone } = useTodos();
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest" | "done" | "notDone">("newest");

  const sortedTodos = [...todos].sort((a, b) => {
    if (sortOrder === "newest") {
      return b.id - a.id;
    }
    if (sortOrder === "oldest") {
      return a.id - b.id;
    }
    if (sortOrder === "done") {
      return (b.done ? 1 : 0) - (a.done ? 1 : 0);
    }
    if (sortOrder === "notDone") {
      return (a.done ? 1 : 0) - (b.done ? 1 : 0);
    }
    return 0;
  });

  return (
    <Layout>
      <Box component="header" sx={{ mb: 3 }}>
        <Typography
          variant="h4"
          component="h1"
          align="center"
          gutterBottom
          sx={{ color: "primary.main", fontWeight: 700 }}
        >
          Löpning
        </Typography>
      </Box>

      <Box component="section" aria-labelledby="add-todo-heading" sx={{ mb: 3 }}>
        <VisuallyHidden id="add-todo-heading">Lägg till ny uppgift</VisuallyHidden>
        <AddTodo onAdd={addTodo} />
      </Box>

      <Box component="section" aria-labelledby="sort-todo-heading" sx={{ mb: 3 }}>
        <VisuallyHidden id="sort-todo-heading">Sortera uppgifter</VisuallyHidden>
        <SortTodos sortOrder={sortOrder} setSortOrder={setSortOrder} />
      </Box>

      <Box component="section" aria-labelledby="todo-list-heading">
        <VisuallyHidden id="todo-list-heading">Lista över uppgifter</VisuallyHidden>
        <TodoList
          todos={sortedTodos}
          toggleDone={toggleDone}
          deleteTodo={deleteTodo}
        />
      </Box>
    </Layout>
  );
}
