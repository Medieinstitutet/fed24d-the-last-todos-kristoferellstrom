import { useState } from "react";

export default function TodoApp() {
  const [todos, setTodos] = useState([
    { id: 1, title: "Springa 10 km", 
        description: "5:00 pace i skogsmiljö", 
        done: false 
    }
  ]);

  return (
    <div>
      <h1>Todo</h1>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}
