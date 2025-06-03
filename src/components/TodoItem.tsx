import type { Todo } from "../TodoApp";

type Props = {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
};

export default function TodoItem({ todo, onToggle, onDelete }: Props) {
  return (
    <li
      style={{
        textDecoration: todo.done ? "line-through" : "none",
        fontStyle: todo.done ? "italic" : "normal",
        opacity: todo.done ? 0.5 : 1,
      }}
    >
      <strong>{todo.title}</strong> – {todo.description}
      <button onClick={onToggle}>{todo.done ? "ångra" : "klar"}</button>
      <button onClick={onDelete}>radera</button>
    </li>
  );
}
