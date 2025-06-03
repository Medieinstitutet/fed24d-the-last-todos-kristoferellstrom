import { Container, Box } from "@mui/material";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <Container
      component="main"
      maxWidth="lg"
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 4,
      }}
    >
      <Box
        component="article"
        sx={{
          width: "100%",
          maxWidth: 600,
          bgcolor: "background.paper",
          border: 2,
          borderColor: "primary.main",
          borderRadius: 2,
          p: 4,
          boxShadow: 3,
        }}
      >
        {children}
      </Box>
    </Container>
  );
}
