import { useEffect, useState } from "react";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import SortTodos from "./components/SortTodos";
import { defaultTodos } from "./data/defaultTodos";

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
    <div>
      <h1>Löpning</h1>
      <AddTodo onAdd={addTodo} />
      <SortTodos sortOrder={sortOrder} setSortOrder={setSortOrder} />
      <TodoList
        todos={sortedTodos}
        toggleDone={toggleDone}
        deleteTodo={deleteTodo}
      />
    </div>
  );
}
