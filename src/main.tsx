import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FF9800", 
      contrastText: "#fff",
    },
    secondary: {
      main: "#4CAF50",   
      contrastText: "#fff",
    },
    background: {
      default: "#FFFDF7",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {}
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
