import { FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";

type Props = {
  sortOrder: "newest" | "oldest" | "done" | "notDone";
  setSortOrder: (order: "newest" | "oldest" | "done" | "notDone") => void;
};

export default function SortTodos({ sortOrder, setSortOrder }: Props) {
  return (
    <Box sx={{ mb: 3, width: "100%" }}>
      <FormControl fullWidth size="small">
        <InputLabel
          id="sort-label"
          sx={{ color: "primary.main" }}
        >
          Sortera
        </InputLabel>
        <Select
          labelId="sort-label"
          value={sortOrder}
          label="Sortera"
          onChange={(e) => setSortOrder(e.target.value as Props["sortOrder"])}
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
