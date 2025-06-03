type Props = {
  sortOrder: "newest" | "oldest" | "done" | "notDone";
  setSortOrder: (order: "newest" | "oldest" | "done" | "notDone") => void;
};

export default function SortTodos({ sortOrder, setSortOrder }: Props) {
  return (
    <div>
      <label>Sortera: </label>
      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value as Props["sortOrder"])}
      >
        <option value="newest">Nyast</option>
        <option value="oldest">Äldst</option>
        <option value="done">Avklarade</option>
        <option value="notDone">Att göra</option>
      </select>
    </div>
  );
}

