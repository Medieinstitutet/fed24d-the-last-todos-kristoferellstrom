import { useEffect, useState } from "react";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import SortTodos from "./components/SortTodos";
import VisuallyHidden from "./components/VisuallyHidden";
import { defaultTodos } from "./data/defaultTodos";
import { Container, Box, Typography } from "@mui/material";

export type Todo = {
  id: number;
  title: string;
  description: string;
  done: boolean;
};

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const stored = localStorage.getItem("todos");
    return stored ? JSON.parse(stored) : defaultTodos;
  });
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest" | "done" | "notDone">("newest");

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title: string, description: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      title,
      description,
      done: false,
    };
    setTodos([newTodo, ...todos]);
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const sortedTodos = [...todos].sort((a, b) => {
    if (sortOrder === "newest") return b.id - a.id;
    if (sortOrder === "oldest") return a.id - b.id;
    if (sortOrder === "done") return Number(!a.done) - Number(!b.done);
    if (sortOrder === "notDone") return Number(a.done) - Number(a.done);
    return 0;
  });

  return (
    <Container
      component="main"
      maxWidth="lg"
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 4,
      }}
    >
      <Box
        component="article"
        sx={{
          width: "100%",
          maxWidth: 600,
          bgcolor: "background.paper",
          border: 2,
          borderColor: "primary.main",
          borderRadius: 2,
          p: 4,
          boxShadow: 3,
        }}
      >
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
          <VisuallyHidden id="add-todo-heading">
            Lägg till ny uppgift
          </VisuallyHidden>
          <AddTodo onAdd={addTodo} />
        </Box>

        <Box component="section" aria-labelledby="sort-todo-heading" sx={{ mb: 3 }}>
          <VisuallyHidden id="sort-todo-heading">
            Sortera uppgifter
          </VisuallyHidden>
          <SortTodos sortOrder={sortOrder} setSortOrder={setSortOrder} />
        </Box>

        <Box component="section" aria-labelledby="todo-list-heading">
          <VisuallyHidden id="todo-list-heading">
            Lista över uppgifter
          </VisuallyHidden>
          <TodoList
            todos={sortedTodos}
            toggleDone={toggleDone}
            deleteTodo={deleteTodo}
          />
        </Box>
      </Box>
    </Container>
  );
}
