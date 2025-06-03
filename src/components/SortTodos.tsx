import { FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";

export type SortOrder = "newest" | "oldest" | "done" | "notDone";

type Props = {
  sortOrder: SortOrder;
  setSortOrder: (order: SortOrder) => void;
};

export function sortTodos<T extends { id: number; done: boolean }>(
  todos: T[],
  sortOrder: SortOrder
): T[] {
  return [...todos].sort((a, b) => {
    if (sortOrder === "newest") {
      return b.id - a.id;
    }
    if (sortOrder === "oldest") {
      return a.id - b.id;
    }
    if (sortOrder === "done") {
 
      return (b.done ? 1 : 0) - (a.done ? 1 : 0);
    }
    if (sortOrder === "notDone") {
  
      return (a.done ? 1 : 0) - (b.done ? 1 : 0);
    }
    return 0;
  });
}

export default function SortTodos({ sortOrder, setSortOrder }: Props) {
  return (
    <Box sx={{ mb: 3, width: "100%" }}>
      <FormControl fullWidth size="small">
        <InputLabel id="sort-label" sx={{ color: "primary.main" }}>
          Sortera
        </InputLabel>
        <Select
          labelId="sort-label"
          value={sortOrder}
          label="Sortera"
          onChange={(e) => setSortOrder(e.target.value as SortOrder)}
          sx={{
            "& .MuiSelect-select": { color: "text.primary" },
            "& .MuiSvgIcon-root": { color: "primary.main" },
          }}
        >
          <MenuItem value="newest">Nyast</MenuItem>
          <MenuItem value="oldest">Äldst</MenuItem>
          <MenuItem value="done">Avklarade</MenuItem>
          <MenuItem value="notDone">Att göra</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
