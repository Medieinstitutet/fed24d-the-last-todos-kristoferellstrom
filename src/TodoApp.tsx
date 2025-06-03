import { useState } from "react";

export default function TodoApp() {
  const [todos, setTodos] = useState([
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
      description: "3:00 pace på asfalt",
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
  ]);

  const deleteTodo = (id: number) => {
  setTodos(todos.filter(todo => todo.id !== id));
   };  

  const toggleDone = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ));
  };

  return (
    <div>
      <h1>Todo</h1>
     <ul>
  {todos.map(todo => (
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
