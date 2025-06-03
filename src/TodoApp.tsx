import { useEffect, useState } from "react";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import SortTodos from "./components/SortTodos";
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

  const [sortOrder, setSortOrder] = useState<
    "newest" | "oldest" | "done" | "notDone"
  >("newest");

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
    setTodos(todos.filter((todo: Todo) => todo.id !== id));
  };

  const toggleDone = (id: number) => {
    setTodos(
      todos.map((todo: Todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const sortedTodos = [...todos].sort((a, b) => {
    if (sortOrder === "newest") return b.id - a.id;
    if (sortOrder === "oldest") return a.id - b.id;
    if (sortOrder === "done") return Number(!a.done) - Number(!b.done);
    if (sortOrder === "notDone") return Number(a.done) - Number(b.done);
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
          <AddTodo onAdd={addTodo} />
        </Box>

        <Box component="section" aria-labelledby="sort-todo-heading" sx={{ mb: 3 }}>
          <Typography
            id="sort-todo-heading"
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
            Sortera uppgifter
          </Typography>
          <SortTodos sortOrder={sortOrder} setSortOrder={setSortOrder} />
        </Box>

        <Box component="section" aria-labelledby="todo-list-heading">
          <Typography
            id="todo-list-heading"
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
            Lista över uppgifter
          </Typography>
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
