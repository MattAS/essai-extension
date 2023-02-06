import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import Content from "./Content";
import { ThemeProvider } from "@mui/material";
import theme from "../theme";

const root = document.createElement("div");
root.id = "essai-overlay-root";
document.body.append(root);

let selecting = false;
let selection: Selection | null = null;

document.addEventListener("selectstart", () => {
  selecting = true;
});

document.addEventListener("mouseup", () => {
  if (selection && selection.toString() !== "") {
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();

    root.style.position = "absolute";
    root.style.display = "block";
    root.style.top = `${rect.bottom + window.scrollY}px`;
    root.style.left = `${rect.right + window.scrollX}px`;
    root.style.width = `${rect.width}px`;
    root.style.height = `${rect.height}px`;

    console.log(rect);
  }
});

document.addEventListener("selectionchange", () => {
  const s = window.getSelection();
  selection = s;

  if (s == null || s.toString() === "") {
    root.style.display = "none";
  }
});

ReactDOM.createRoot(root as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Content />
    </ThemeProvider>
  </React.StrictMode>
);
