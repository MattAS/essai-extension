import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import Content from "./Content";
import { ThemeProvider } from "@mui/material";
import theme from "../theme";

const root = document.createElement("div");
root.id = "essai-overlay-root";
document.body.append(root);

ReactDOM.createRoot(root as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Content />
    </ThemeProvider>
  </React.StrictMode>
);
