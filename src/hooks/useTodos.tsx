import { useState, useEffect, useCallback } from "react";
import type { Todo } from "../TodoApp";
import { defaultTodos } from "../data/defaultTodos";

export function useTodos() {

  const [todos, setTodos] = useState<Todo[]>(() => {
    const stored = localStorage.getItem("todos");
    return stored ? JSON.parse(stored) : defaultTodos;
  });

  useEffect(() => {
    const stored = localStorage.getItem("todos");
    if (stored) {
      setTodos(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = useCallback((title: string, description: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      title,
      description,
      done: false,
    };
    setTodos((prev) => [newTodo, ...prev]);
  }, []);

  const deleteTodo = useCallback((id: number) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toggleDone = useCallback((id: number) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }, []);

  return { todos, addTodo, deleteTodo, toggleDone };
}
