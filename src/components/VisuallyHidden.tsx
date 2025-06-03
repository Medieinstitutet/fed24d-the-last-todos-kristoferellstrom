import { Typography } from "@mui/material";

const visuallyHiddenSx = {
  position: "absolute",
  width: 1,
  height: 1,
  p: 0,
  m: -1,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
};

type Props = {
  id: string;
  children: React.ReactNode;
};

export default function VisuallyHidden({ id, children }: Props) {
  return (
    <Typography
      id={id}
      variant="h6"
      component="h2"
      sx={visuallyHiddenSx}
    >
      {children}
    </Typography>
  );
}
