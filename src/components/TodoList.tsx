import TodoItem from "./TodoItem";
import type { Todo } from "../TodoApp";

type Props = {
  todos: Todo[];
  toggleDone: (id: number) => void;
  deleteTodo: (id: number) => void;
};

export default function TodoList({ todos, toggleDone, deleteTodo }: Props) {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={() => toggleDone(todo.id)}
          onDelete={() => deleteTodo(todo.id)}
        />
      ))}
    </ul>
  );
}
