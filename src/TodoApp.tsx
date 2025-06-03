import { useEffect, useState } from "react";
import AddTodo from "./AddTodo";

type Todo = {
  id: number;
  title: string;
  description: string;
  done: boolean;
};

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const stored = localStorage.getItem("todos");
    return stored
      ? JSON.parse(stored)
      : [
          {
            id: 1,
            title: "Springa 10km",
            description: "5:00 pace i skogsmiljö",
            done: false,
          },
          {
            id: 2,
            title: "Springa 5km",
            description: "4:00 pace i skogsmiljö",
            done: false,
          },
          {
            id: 3,
            title: "Springa 5km",
            description: "3:30 pace på asfalt",
            done: false,
          },
          {
            id: 4,
            title: "Springa 30km",
            description: "5:30 pace i skogsmiljö",
            done: false,
          },
          {
            id: 5,
            title: "Springa 1km",
            description: "Det snabbaste du kan",
            done: false,
          },
        ];
  });

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

  return (
    <div>
      <h1>Löpning</h1>
      <AddTodo onAdd={addTodo} />
      <ul>
        {todos.map((todo: Todo) => (
          <li
            key={todo.id}
            style={{
              textDecoration: todo.done ? "line-through" : "none",
              fontStyle: todo.done ? "italic" : "normal",
              opacity: todo.done ? 0.5 : 1,
            }}
          >
            <strong>{todo.title}</strong> – {todo.description}
            <button onClick={() => toggleDone(todo.id)}>
              {todo.done ? "ångra" : "klar"}
            </button>
            <button onClick={() => deleteTodo(todo.id)}>radera</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
